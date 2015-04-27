Ext.define('Buzzor.view.reportui.datachart.chart.ChartTabView', {
	extend : 'Ext.panel.Panel',
	requires:['Buzzor.view.reportui.datachart.chart.RatingField','Buzzor.view.reportui.datachart.chart.ChartController'],
	xtype : 'chart-tabView',
	controller : 'chartController',
	bodyStyle : 'background:#D8D8D8',
	autoScroll : true,
	border : 0,
	margin : '0 0 5 0',
	layout : {
		type : 'table',
		columns : 4
	},
	tools : [ {
		xtype : 'ratingField',
		itemId:'chartcolumnlayout',
		RatingFieldTypeid : 'rating',
		numberOfStars : 6,
		tooltip : 'Choose columns',
		defaultHeightToReduce : 1,
		defaultWidthToReduce : 60,
		minLength : 1,
		value : 1,
		allowBlank : false,
		listeners : {
			change : 'resizeCharts'
		}

	} ]
});
