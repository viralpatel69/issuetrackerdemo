Ext.define('Buzzor.view.login.LoginController', {
			extend : 'Ext.app.ViewController',
			alias : 'controller.login',
			views : ["Login"],
			require : ['view.main.Main'],
			onSpecialKey : function(field, e) {
				if (e.getKey() === e.ENTER) {
					this.doLogin();
				}
			},
			onLoginClick : function() {
				this.doLogin();
			},
			doLogin : function() {
				var form = this.view.down('#form1');
				//var container = this.view.container;
				var container = this.getView();
				var currentObject = this;
				
				if (form.isValid()) {
					Ext.Ajax.request({
								url : "secure/Authentication/authenticate",
								method : 'POST',
								container :container,
								jsonData : {
									"loginId" : form.getValues().loginId,
									"password" : form.getValues().password
								},
								success : function(response, scope) {
									debugger;
									var jsonRespone = Ext.JSON.decode(response.responseText);
									if (jsonRespone.response.success) {
										scope.container.removeAll();
										scope.container.add(Ext.create('Buzzor.view.main.MainPanel'));
									} else {
										Ext.Msg.alert('Authentication failed', jsonRespone.response.message);
									}
								},
								failure : function() {
									Ext.Msg.alert('Error', 'Cannot connect to server');
								}
							});
				}
			},

			onSessionLoginClick : function() {
				var form = this.lookupReference('form');
				var container = this.view.container;

				var currentObject = this;
				if (form.isValid()) {
					debugger;
					Ext.Ajax.request({
								url : "secure/buzzorapp/sessionLogin",
								method : 'POST',
								jsonData : {
									"loginId" : form.items.items[0].text,
									"password" : form.getValues().password
								},
								success : function(response) {
									debugger;
									var jsonRespone = Ext.JSON
											.decode(response.responseText);
									if (jsonRespone.response.success == 'true') {
										debugger;
										form.up().close();
									} else {
										Ext.Msg.alert('Authentication failed',
												jsonRespone.response.message);
									}
								},
								failure : function() {
									Ext.Msg.alert('Error',
											'Cannot connect to server');
								}
							});
				}
			}
		});