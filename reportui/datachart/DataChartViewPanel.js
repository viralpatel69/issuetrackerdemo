Ext.define('Buzzor.view.reportui.datachart.DataChartViewPanel', {
	extend : 'Ext.panel.Panel',
	requires : [ 'Buzzor.view.reportui.datachart.DataChartPController',
			'Buzzor.view.reportui.datachart.datagrid.DataGridView',
			'Buzzor.view.reportui.datachart.chart.ChartTabView',
			'Buzzor.view.reportui.datachart.ChartPointView' ],
	controller : 'datachartpController',
	xtype : 'datachart-panel',
	itemId : 'datachart-tabpanel',
	viewType : "panel",
	bodyStyle : 'background:#D8D8D8',

	margin : '0 0 0 0',
	autoScroll : true,
	// layout : 'fit',
	layout : {
		type : 'vbox',
		padding : 0,
		align : 'stretch'
	},
	initComponent : function() {
		
		this.callParent(arguments);
	},
	listeners : {
		scope : "controller",
		tabchange : 'tabchange'
	}

});