Ext.define('Buzzor.view.reportui.datachart.DataChartTController', {
	extend : 'Ext.app.ViewController',

	alias : 'controller.datacharttController',
	requires : [ 'Buzzor.view.reportui.ModifiedProxy' ],
	queryCriteria : null,
	reportView : null,
	reportViewController : null,
	reportQCList : null,
	datagrid : null,
	chartView : null,
	reportJSON : null,
	datapoint : null,
	chartDatas : null,
	init : function() {
		this.reportView = this.getView().up();
		this.reportViewController = this.reportView.controller;

		this.getView().add([ {
			title : 'Data',
			itemId : "datapanel",
			autoScroll : true,
			style : 'background:#f6f6f6;',
			layout : 'border',
			items : [ {
				xtype : "panel",
				region : "north",
				style : 'background:#D8D8D8;',
				layout : {
					type : 'anchor',
					margin : '0 0 5 0'
				},
				items : [ {

					xtype : 'dataPointPanel',
					bodyStyle : 'background:#D8D8D8',
					margin : '0 0 5 0',
					itemId : "datapoint",
					// anchor : '100% 18%',
					layout : {
						type : 'anchor',
						align : 'center'
					},

					// shrinkWrap:3,
					defaults : {
					// anchor:'100% 14%'
					},
					dpData : []
				}, {
					xtype : "chart-point",
					margin : '0 0 5 0',
				} ]
			}, this.reportViewController.getDataGrid() ]

		}, {
			title : 'Chart',
			layout : "fit",
			items : [ {
				xtype : "chart-tabView",
				itemId : "chart-view",
			} ]

		} ]);

	},
	initObjects : function() {
		this.queryCriteria = this.reportView.down("#querycriteria");
		this.datagrid = this.getView().down("#data-grid-view");
		this.chartView = this.getView().down("#chart-view");
		this.datapoint = this.getView().down("#datapoint");
	},
	loadData : function(reportJSON) {
		this.reportJSON = reportJSON;
		this.initObjects();

		// load Query Criteria
		var queryCriteria = this.reportViewController.loadQueryCriteria();

		// load chart data
		this.reportViewController.loadDataPointChart(queryCriteria, this);

		// load Grid Data
		this.reportViewController.loadGridData(queryCriteria, this.datagrid,
				this);

		// set display Query Criteria
		this.setReportDetails();

	},
	filterData : function() {
		this.reportViewController.filterData(this.datagrid, this);
		this.getView().setActiveTab(this.getView().down("#datapanel"));
	},

	setReportDetails : function() {
		this.reportQCList = [];
	},
	tabchange : function(tabPanel, newCard, oldCard, eOpts) {
		/*
		 * resize charts if the active tab is charttab
		 */
		if (newCard.itemId != "datapanel") {
			this.chartView.controller.resizeCharts(this.chartView
					.down("#chartcolumnlayout"));
		}
	},

});