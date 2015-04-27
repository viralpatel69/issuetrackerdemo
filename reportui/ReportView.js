Ext.define('Buzzor.view.reportui.ReportView', {
	extend : 'Ext.panel.Panel',
	requires : [ 'Buzzor.view.reportui.querycriteria.QueryCriteriaView',
			'Buzzor.view.reportui.datachart.DataChartViewTab',
			'Buzzor.view.reportui.datachart.DataChartViewPanel',
			'Buzzor.view.reportui.ReportViewController' ,
			'Buzzor.view.fw.DataPointPanel'],
	xtype : 'reportview',
	controller : 'reportviewController',
	layout : 'border',

	//autoScroll : true,
	//margin : '3 0 5 0',

	listeners : {
		scope : 'controller',
		afterrender : 'renderReport'
	}
});
