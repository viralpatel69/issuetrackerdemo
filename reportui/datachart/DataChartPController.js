Ext
		.define(
				'Buzzor.view.reportui.datachart.DataChartPController',
				{
					extend : 'Ext.app.ViewController',

					alias : 'controller.datachartpController',
					requires : [ 'Buzzor.view.reportui.ModifiedProxy' ],
					queryCriteria : null,
					reportView : null,
					reportViewController : null,
					reportQCList : null,
					datagrid : null,
					chartView : null,
					reportJSON : null,
					datapoint : null,
					init : function() {
						
						this.reportView = this.getView().up();
						this.reportViewController = this.reportView.controller;
						
						this.getView().add([ {
							xtype : 'dataPointPanel',
							bodyStyle : 'background:#D8D8D8',
							margin : '0 0 3 0',
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
						}, {
							xtype : "chart-tabView",
							itemId : "chart-view",
							autoScroll : false,
							value : 1
						}, this.reportViewController.getDataGrid() ]);
					},
					initObjects : function() {
						this.queryCriteria = this.reportView
								.down("#querycriteria");
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
						this.reportViewController.loadDataPointChart(queryCriteria,this);
						

						// load Grid Data
						this.reportViewController.loadGridData(queryCriteria,this.datagrid,this);

						// set display Query Criteria
						this.setReportDetails();

					},
					filterData : function() {
						this.reportViewController.filterData(this.datagrid,this);
					},
					setReportDetails : function() {
						this.reportQCList = [];
					},
					
				});