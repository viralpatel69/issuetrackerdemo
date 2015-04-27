/**
 * 
 */
Ext.define('Buzzor.view.apphealth.AppHealthConnectorController',{
	extend : 'Ext.app.ViewController',
	alias : 'controller.appHealthConnectorController',
	
	connectorId : null,
	connectorName : null,
	isEnabled : null,
	connectorClass : null,
	dataModel : null,
	
	batchSize : null,
	refreshTime : null,
	refreshUnit : null,
	threadPoolSize : null,
	
	statusConfigId : null,
	diskPath : null,
	diskThreshold : null,
	executeSql : null,
	
	
	init : function()
	{
		debugger;
		var currentObject = this;
		currentObject.connectorId = currentObject.view.down('#connectorId');
		currentObject.connectorName = currentObject.view.down('#connectorName');
		currentObject.isEnabled = currentObject.view.down('#isEnabled');
		currentObject.connectorClass = currentObject.view.down('#connectorClass');
		currentObject.dataModel = currentObject.view.down('#dataModel');
		
		currentObject.batchSize = currentObject.view.down('#batchSize');
		currentObject.refreshTime = currentObject.view.down('#refreshTime');
		currentObject.refreshUnit = currentObject.view.down('#refreshUnit');
		currentObject.threadPoolSize = currentObject.view.down('#threadPoolSize');
		
		currentObject.statusConfigId = currentObject.view.down('#statusConfigId');
		currentObject.diskPath = currentObject.view.down('#diskPath');
		currentObject.diskThreshold = currentObject.view.down('#diskThreshold');
		currentObject.executeSql = currentObject.view.down('#executeSql');
	},
	
	setFormData : function(appHealthScheduler, appHealthStatusData, statusPanelIndex)
	{
		debugger;
		var currentObject = this;
		currentObject.connectorId.setValue(appHealthScheduler.schedulerId);
		currentObject.connectorName.setValue(appHealthScheduler.schedulerName);
		currentObject.isEnabled.select(appHealthScheduler.enabled);
		currentObject.connectorClass.setValue(appHealthScheduler.connectorClass);
		currentObject.dataModel.setValue(appHealthScheduler.dataModel);
		
		currentObject.batchSize.setValue(appHealthScheduler.batchSize);
		currentObject.threadPoolSize.setValue(appHealthScheduler.threadPoolSize);
		currentObject.refreshTime.setValue(appHealthScheduler.refreshTime);
		currentObject.refreshUnit.setValue(appHealthScheduler.refreshUnit);
		
		currentObject.statusConfigId.setValue(appHealthStatusData.statusConfigId);
		currentObject.diskPath.setValue(appHealthStatusData.diskPath);
		currentObject.diskThreshold.setValue(appHealthStatusData.diskThreshold);
		currentObject.executeSql.setValue(appHealthStatusData.executeSql);
		if(statusPanelIndex != 0)
		{
			currentObject.statusConfigId.hide();
			currentObject.diskPath.hide();
			currentObject.diskThreshold.hide();
			currentObject.executeSql.hide();
		}
	},
	
	setConfigurationFields : function(configuration)
	{
		debugger;
		var form = this.view.getForm();
		var dbSQL = Ext.create("Ext.form.field.Text", 
					{
						fieldLabel:"First Name",
						value : configuration.dbSQL
					});
		this.view.add(dbSQL);
	},
	
	getStatusJson : function()
	{
		debugger;
		var currentObject = this;
		var connectorStatusJson = '{';		
		connectorStatusJson = connectorStatusJson.concat("'statusConfigId': '"+ currentObject.statusConfigId.getValue() + "',");
		connectorStatusJson = connectorStatusJson.concat("'diskPath': '"+ currentObject.diskPath.getValue() + "',");
		connectorStatusJson = connectorStatusJson.concat("'diskThreshold': '"+ currentObject.diskThreshold.getValue() + "',");
		connectorStatusJson = connectorStatusJson.concat("'executeSql': '"+ currentObject.executeSql.getRawValue() + "'}");
		return connectorStatusJson;
	},
	
	toJson : function() {
		debugger;
		var currentObject = this;
		var connectorJson = '{';		
		
		connectorJson = connectorJson.concat("'schedulerId': '"+ currentObject.connectorId.getValue() + "',");
		
		connectorJson = connectorJson.concat("'schedulerKey': '"+ currentObject.getView().getTitle() + "',");
		connectorJson = connectorJson.concat("'schedulerName': '"+ currentObject.connectorName.getValue() + "',");
		connectorJson = connectorJson.concat("'enabled': '"+ currentObject.isEnabled.getRawValue() + "',");
		connectorJson = connectorJson.concat("'connectorClass': '"+ currentObject.connectorClass.getValue() + "',");
		connectorJson = connectorJson.concat("'dataModel': '"+ currentObject.dataModel.getValue() + "',");
		
		connectorJson = connectorJson.concat("'batchSize': '"+ currentObject.batchSize.getValue() + "',");
		connectorJson = connectorJson.concat("'threadPoolSize': '"+ currentObject.threadPoolSize.getValue() + "',");
		
		connectorJson = connectorJson.concat("'refreshTime': '"+ currentObject.refreshTime.getValue() + "',");
		connectorJson = connectorJson.concat("'refreshUnit': '"+ currentObject.refreshUnit.getValue() + "'}");
		
		return connectorJson;
},
	
});