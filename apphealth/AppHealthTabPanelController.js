/**
 * 
 */
Ext.define('Buzzor.view.apphealth.AppHealthTabPanelController',{
	extend : 'Ext.app.ViewController',
	alias : 'controller.appHealthTabPanelController',
	requires : ['Buzzor.view.apphealth.AppHealthConnector'],
	
	statusJson : null,
	init : function()
	{
		debugger;
		var currentObject = this;
		Ext.Ajax.request({
			timeout: 6000000,
			url : 'secure/HealthSchedulerService/findAll',
			method : 'GET',
			jsonData : {},
			success : function(response, opts){
				debugger;
				var responseJson = Ext.JSON.decode(response.responseText);
				if (responseJson.response.success) {
					var appHealthSchedulerData = responseJson.response.data;
					
					Ext.Ajax.request({
						timeout: 6000000,
						url : 'secure/HealthStatusService/findAll',
						method : 'GET',
						jsonData : {},
						success : function(response, opts){
							debugger;
							var responseJson = Ext.JSON.decode(response.responseText);
							if (responseJson.response.success) {
								var appHealthStatusData = responseJson.response.data;
								
								for(var i = 0; i < appHealthSchedulerData.length; i++)
								{
									var appHealthScheduler = appHealthSchedulerData[i];
									var connectorPanel = Ext.create("Buzzor.view.apphealth.AppHealthConnector", {
										title : appHealthScheduler.schedulerKey,
									});
									connectorPanel.getController().setFormData(appHealthScheduler, appHealthStatusData[0],i);
									currentObject.onAddTabClick(connectorPanel,i);
								}
							} else {
								Ext.Msg.alert("Error.", responseJson.message);
							}
						},
						failure : function(response, opts){
							debugger;
							var responseJson = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert("Error...", responseJson.response.message);
						}
					});
				} else {
					Ext.Msg.alert("Error.", responseJson.message);
				}
			},
			failure : function(response, opts){
				debugger;
				var responseJson = Ext.JSON.decode(response.responseText);
				Ext.Msg.alert("Error...", responseJson.response.message);
			}
		});
			
		
		
	},
	
	onAddTabClick: function(connectorPanel,index) 
	{
		debugger;
		var tabPanel = this.getView().down('#appHealthTab'),
        tab = tabPanel.add({
           xtype : connectorPanel
         });
		if(index == 0)
			tabPanel.setActiveTab(tab);
    },
	
	onResetClick : function(but, evt) 
	{
		debugger;
		var appHealthForm = but.up('form').getForm();
		appHealthForm.reset();
	},
	
	getConnectorJSON : function()
	{
		var tabPanel = this.getView().down('#appHealthTab');
		var tabs = tabPanel.items;
		
		var connectorJSON = '[';
		for(var i = 0; i < tabs.length; i++)
		{
			var appHealthConnectorController = tabs.get(i).getController();
			var appHealthConnectorJson = appHealthConnectorController.toJson();
			
			if(i == 0 || appHealthConnectorJson.schedulerKey == 'Status')
			{
				var statusJson = appHealthConnectorController.getStatusJson();
				this.statusJson = statusJson;
			}
			
			connectorJSON = connectorJSON.concat(appHealthConnectorJson);
			connectorJSON = connectorJSON.concat(",");
		}
		connectorJSON = connectorJSON.concat("]");
		return connectorJSON;
	},
	
	updateHealthStatus : function()
	{
		var currentObject = this;
		Ext.Ajax.request({
			timeout: 6000000,
			url : 'secure/HealthStatusService/update',
			jsonData : Ext.decode(currentObject.statusJson),

			method : 'PUT',
			success : function(response, opts) {
				debugger;
				var responseJson = Ext.JSON.decode(response.responseText);
				if (responseJson.response.success) {
				} 
				else 
				{
					Ext.Msg.alert("Error...",responseJson.response.message);
				}
			},
			failure : function(response,opts) 
			{
				var responseJson = Ext.JSON.decode(response.responseText);	
				Ext.Msg.alert("Error...",responseJson.response.message); 
			},
		}, this);
	},
	
	onSubmitClick : function(but, evt) {
		debugger;
		var currentObject = this;
		var form = but.up('form').getForm();
		
		var connectorJson = this.getConnectorJSON();
		
		if (form.isValid()) {
			this.waitWindow = Ext.MessageBox.wait('Please wait, request in process');
			Ext.Ajax.request({
						timeout: 6000000,
						url : 'secure/HealthSchedulerService/update',
						jsonData : Ext.decode(connectorJson),

						method : 'PUT',
						success : function(response, opts) {
							debugger;
							var responseJson = Ext.JSON.decode(response.responseText);
							if (responseJson.response.success) {
								currentObject.updateHealthStatus();
								Ext.Msg.alert("Info",responseJson.response.message);
							} 
							else 
							{
								Ext.Msg.alert("Error...",responseJson.response.message);
							}
						},
						failure : function(response,opts) 
						{
							var responseJson = Ext.JSON.decode(response.responseText);	
							Ext.Msg.alert("Error...",responseJson.response.message); 
						},
					}, this);
		} else {
			Ext.Msg.alert('Form Validation', "Form is not valid");
		}
		
		
	},
});