Ext.define('Buzzor.view.login.Login', {
		extend:'Ext.panel.Panel',
		bodyPadding : 5,
		closable : false,
		cls : 'login',
		xtype : 'login',
		autoDestroy : true,
		requires : [
		            'Buzzor.view.login.LoginController',
		            'Buzzor.view.login.LoginModel', 
		            'Ext.form.Panel',
		            'Ext.button.Button', 
		            'Ext.form.field.Text',
		            'Buzzor.view.main.MainPanel'],

		viewModel : 'login',
		
		controller : 'login',
		
		layout:
		{
			type:'anchor',
			align:'center'
		},
		resizable:true,
		
		 items:[{
			 xtype:'panel',
			 layout:{
				 align: 'middle',
				 pack: 'center',
				 type:'hbox'
			 },
			 margin:'0,20,0,0',
			 items : [{
							xtype : 'form',
							width : "30%",
							itemId : 'form1',
							reference : 'form',
							title : 'Login',
							layout : {
								type : "vbox",
								pack : "center",
								align : "center"
							},
							
							margin:'10 0 0 0',
							items : [{
										value : 'admin',
										xtype : 'textfield',
										itemId : 'loginId',
										name : 'loginId',
										fieldLabel : 'Username',
										allowBlank : false,
										enableKeyEvents : true,
										listeners : {
											specialKey : 'onSpecialKey'
										}
									}, {
										value : 'admin',
										xtype : 'textfield',
										itemId : 'password',
										name : 'password',
										inputType : 'password',
										fieldLabel : 'Password',
										allowBlank : false,
										enableKeyEvents : true,
										cls : 'password',
										listeners : {
											specialKey : 'onSpecialKey'
										}
									}],
							buttons : [{
										text : 'Login',
										listeners : {
											click : 'onLoginClick'
										}
									}],
							
									
						}],
						
		 }]
});