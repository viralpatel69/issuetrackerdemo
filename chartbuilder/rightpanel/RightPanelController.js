Ext.define('Buzzor.view.chartbuilder.rightpanel.RightPanelController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.rightpanelcontroller',
    chartMainView:null,
    
    afterRender:function()
    {
    	this.chartMainView=this.getView().up();
    },
    
    onPropertyClick:function(source, recordId, value, oldValue, eOpts)
    {
		debugger;
		var centerChartPanel=this.chartMainView.down('#chartPanel');
		var a=new FusionCharts(centerChartPanel.jsonObject);
		a.render(centerChartPanel.body.id);
		centerChartPanel.doLayout();	
	},
	
	loadPanelItems:function(panel,panelItems)
	{
		debugger;
		var all=panel.query("[comboType=all]");
		for(var i=0;i<all.length;i++)
		{
			var allCombo=all[i];
			allCombo.store=this.getComboStore();
			allCombo.getStore().loadData(this.chartMainView.gridConfigStore.data.items,true);
		}
		var numericCombo=panel.query("[comboType=numeric]")[0];
		if(numericCombo != undefined)
		{
			numericCombo.store=this.getComboStore();
			numericCombo.getStore().loadData(this.chartMainView.gridConfigStore.data.items,true);
			//numericCombo.getStore().loadData(this.formatNumericData(this.chartMainView.gridConfigStore,numericCombo.getStore()),true);
		}
		var aggCombo=panel.down("#aggCombo");
		if(aggCombo!=undefined)
		{
			aggCombo.store=this.getAggregateComboStore();
		}
		var criteriaCombo=panel.down("#criteriaCombo");
		if(criteriaCombo!=undefined)
		{
			criteriaCombo.store=this.getCriteriaComboStore();
		}
	},
	
	getComboStore : function(rptBuilderActiveTab) //Store structure same as GridConfig store structure
	{
		return Ext.create('Ext.data.Store', {
			autoLoad : true,
			fields : [ {
				name : "name",
				type : "string"
			}, {
				name : "displayName",
				type : "string"
			}],
			data : []
		});
		;
	},
	
	getAggregateComboStore:function()
	{
		return Ext.create('Ext.data.Store', {
			autoLoad : true,
			fields : [ {
				name : 'aggregate_value',
				type : 'string'
			}, {
				name : 'aggregate_name',
				type : 'string'
			} ],
			data:[
			      {aggregate_value:"Sum",aggregate_name:"Sum"},
			      {aggregate_value:"Min",aggregate_name:"Min"},
			      {aggregate_value:"Max",aggregate_name:"Max"},
			      {aggregate_value:"Avg",aggregate_name:"Avg"},
			      {aggregate_value:"Count",aggregate_name:"Count"}
			]
		});
	},
	
	getCriteriaComboStore:function()
	{
		return Ext.create('Ext.data.Store', {
			autoLoad : true,
			fields : [ {
				name : 'criteria_value',
				type : 'string'
			}, {
				name : 'criteria_name',
				type : 'string'
			} ],
			data:[
			      {criteria_value:"Min",criteria_name:"Min"},
			      {criteria_value:"Max",criteria_name:"Max"}
			]
		});
	},
	
	formatNumericData: function(store, existFields) 
	{
		var data = [];
		Ext.Array.each(store.data.items,function(item) 
				{
					debugger;
					if(item.data.dataType.toUpperCase()=="INT" || item.data.dataType.toUpperCase()=="FLOAT"
						|| item.data.dataType.toUpperCase()=="DECIMAL" || item.data.dataType.toUpperCase()=="DOUBLE")
					{
							data.push(item.data);
					}
				},{
					 data : data,
					 existFields : existFields
		});
		return data;
	},
});
