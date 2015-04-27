Ext
		.define(
				'Buzzor.view.reportui.ReportViewController',
				{
					extend : 'Ext.app.ViewController',
					alias : 'controller.reportviewController',
					requires : [],
					queryCriteria : null,
					datachart : null,
					isRad : 0,
					restURL : "",
					gridurl : null,
					chartdataurl : null,
					urlPrefix : null,
					init : function() {
						this.setRestURL();
					},
					initObject : function() {
						debugger;
						this.queryCriteria = this.getView().down(
								"#querycriteria");
						this.datachart = this.getView()
								.down("#datachart-panel");

					},
					renderReport : function(panel, eOpts) {
						if (panel.isPreview == undefined) {
							debugger;
							var response = this
									.syncAjaxPOSTCall(
											this.urlPrefix
													+ '/reportViewController/getReportDetailsById?reportId='
													+ panel.refId, '');
							var rptJSon = Ext.decode(response.response.data);
							panel.reportId = rptJSon.report_id;
							panel.reportJSON = rptJSon.data_json;
							panel.reportJSON["chart_json"] = rptJSon.chart_json
						} else {
							this.isRad = 1;
							this.setRestURL();
						}
						if (panel.reportJSON.displayType == "1") {
							panel.add({
								region : 'west',
								margin : "5 0 5 5",
								xtype : 'querycriteria'
							}, {
								region : 'center',
								itemId : 'datachart-panel',
								xtype : 'datachart-panel'
							});
						} else {
							panel.add({
								region : 'west',
								margin : "5 0 5 5",
								xtype : 'querycriteria'
							}, {
								region : 'center',
								margin : "5 0 5 0",
								itemId : 'datachart-panel',
								xtype : 'datachart-tabpanel'
							});
						}
						this.initObject();
						var reportJSON = panel.reportJSON;

						// Load Query Criteria detaisl
						this.queryCriteria.controller.loadData(reportJSON);
						this.datachart.controller.loadData(reportJSON)

					},
					syncAjaxPOSTCall : function(url, data) {
						// debugger;
						// Define function to perform synchronous requests to
						// get model data
						var request = ((window.XMLHttpRequest) ? new XMLHttpRequest()
								: new ActiveXObject("Microsoft.XMLHTTP"));
						request.open("POST", url, false); // <-- false makes
															// it a synchonous
						// request!
						request.setRequestHeader("Content-type",
								"application/json", "application/xml");
						request.send(Ext.encode(data));

						// request.send(null);
						return Ext.decode(request.responseText);
					},
					syncAjaxGETCall : function(url, data) {
						// debugger;
						// Define function to perform synchronous requests to
						// get model data
						var request = ((window.XMLHttpRequest) ? new XMLHttpRequest()
								: new ActiveXObject("Microsoft.XMLHTTP"));
						request.open("GET", url, false); // <-- false makes
															// it a synchonous
						// request!
						request.setRequestHeader("Content-type",
								"application/json", "application/xml");
						try {
							request.send(data.length > 0 ? "" : Ext
									.encode(data));
						} catch (ex) {
							return null;
						}
						if (request.status == 404)
							return null;
						// request.send(null);
						return Ext.decode(request.responseText);
					},
					setRestURL : function() {
						if (this.isRad == 1) {
							this.restURL = "/secure";
							// this.restURL="secure/buzzorapp";
							this.gridurl = "secure/reportViewController/getDataInRad";
							this.chartdataurl = "secure/reportViewController/getChartDataInRad";
							this.urlPrefix = "secure";
						} else {
							this.restURL = "secure";
							this.gridurl = "secure/reportViewController/getData";
							this.chartdataurl = "secure/reportViewController/getChartData";
							this.urlPrefix = "secure";
						}
					},
					/*
					 * used to load data point in panel called from both layout
					 * panel & tab layout
					 */
					loadDataPoints : function(datapoints, datapointpanel) {
						var datapointlist = [];
						var chartpoints = [];
						this.chartpoint = this.getView().down("#chartpoint");

						for (var x = 0; x < datapoints.length; x++) {
							/*
							 * check if type of data point if the type is chart
							 * then set chatjson that used in data point widget
							 * to create chart point
							 * 
							 */
							if (datapoints[x].hasOwnProperty("type")
									&& datapoints[x].type.toLowerCase() == 'chart') {
								for(var x1=0;x1<datapoints[x].chartJson.length;x1++){
									chartpoints.push({
										chartJSON : datapoints[x].chartJson[x1]
									});
								}
							} else {
								datapointlist = datapointlist
										.concat(datapoints[x].value);
								/*
								 * datapointlist .push({ description :
								 * datapoints[x].label, statistic :
								 * datapoints[x].value, })
								 */
							}
						}

						/*
						 * calculate width of datapoint which will adjust in one
						 * row
						 */
						debugger;
						var defaulw = 100 - (datapointlist.length - 3);
						var width = 95 / datapointlist.length;
						width = width - 0.1;
						for (var x = 0; x < datapointlist.length; x++) {
							datapointlist[x]["width"] = width + "%";
						}
						datapointpanel.setData(datapointlist);
						if (chartpoints.length > 0) {
							this.chartpoint.controller
									.loadChartPoints(chartpoints);
						}
					},
					/*
					 * this method is used to prepare Grid parameter
					 */
					getGridParams : function(queryCriteria, sqlId) {
						var params = {
							sqlId : sqlId,
							queryCriteria : queryCriteria
						};
						if (this.isRad == 1) {
							params["queryInfo"] = {
								jpqlQuery : this.getView().reportJSON.jpqlQuery,
								queryJSON : this.getView().reportJSON.queryJson
							};
						}
						return params;
					},
					/*
					 * This method return grid Store
					 */
					getGridStore : function(sqlId, sorters, queryCriteria) {
						var params = this.getGridParams(queryCriteria, sqlId);
						var modelname=this.getView().id+'-gridmodel';
						Ext.define(modelname, {
						    extend: 'Ext.data.Model',
						 //   idProperty: 'requestId',
						    fields:this.getView().reportJSON.gridmodel})
						return new Ext.create(
								'Ext.data.Store',
								{
									model:modelname,
									async : false,
									autoLoad : true,
									pageSize : 10,
									queryId : sqlId,
									data : [],
									groupField : this.getView().reportJSON.summaryGroups != undefined
									&& this.getView().reportJSON.summaryGroups.length > 0 ? this
									.getView().reportJSON.summaryGroups[0]
									: "",
									sorters : sorters.length > 0 ? sorters : [],
									proxy : {
										type : 'modifiedproxy',
										url : this.gridurl,
										actionMethods : {
											create : 'POST',
											read : 'POST',
											update : 'POST',
											destroy : 'POST'
										},
										headers : {
											'Content-Type' : 'application/json;application/xml'
										},
										extraParams : params,
										reader : {
											type : 'json',
											rootProperty : 'response.data',
											totalProperty : 'response.total'
										},
										writer : {
											type : 'json'
										}
									}
								});
					},
					/*
					 * This method used to prepare chart data url parameter for
					 * both Panel/Tab Layout
					 */
					getChartDataParams : function(queryCriteria) {
						var params = {
							report_id : this.getView().reportId,
							queryCriteria : queryCriteria,
							sqlId : this.getView().reportJSON.sqlId
						};
						if (this.isRad == 1) {
							params["queryInfo"] = {
								jpqlQuery : this.getView().reportJSON.jpqlQuery,
								queryJSON : this.getView().reportJSON.queryJson
							};
							params["charts"] = this.getView().reportJSON.chart_json.length > 0 ? Ext
									.decode(this.getView().reportJSON.chart_json)
									: [];
							params["dataEndPoint"] = this.getView().reportJSON.dataEndPoint.length > 0 ? Ext
									.decode(this.getView().reportJSON.dataEndPoint)
									: [];
						}
						return params;
					},
					/*
					 * This method used to load chart data for both Panel/Tab
					 * Layout
					 * 
					 * @param queryCriteria query criteria @param
					 * panelTabConroller Conroller Object of Panel/Tab - depend
					 * which layout is calling this method
					 */
					loadDataPointChart : function(queryCriteria,
							panelTabConroller) {
						var params1 = this.getChartDataParams(queryCriteria);
						Ext.Ajax
								.request({
									url : this.chartdataurl,
									method : 'POST',
									scope : panelTabConroller,
									jsonData : Ext.encode(params1),
									params : {},
									success : function(response, currentObject,
											options) {
										debugger;
										var data = Ext
												.decode(response.responseText).response.data;
										if (data != undefined
												&& data.charts != undefined) {
											currentObject.scope.chartView.controller
													.loadCharts(data.charts);
										}
										if (data != undefined
												&& data.datapoints != undefined) {
											currentObject.scope.reportViewController
													.loadDataPoints(
															data.datapoints,
															currentObject.scope.datapoint
																	.down("#dataPointPanelId"));
										}
									},
									failure : function() {
										Ext.Msg.alert('Error',
												'Cannot connect to server');
									}
								});

					},

					/*
					 * Used to Load Grid Data 1) Create Grid Store 2) set href
					 * column logic if the drill down report is set for
					 * particular column 3) create Paginatin of grid
					 * 
					 * This method is used for Both Panel and Tab Layout
					 */
					loadGridData : function(queryCriteria, datagrid, scope) {
						var gridStore = this.getGridStore(
								scope.reportJSON.sqlId, [], queryCriteria);
						this.setHrefToColumns(scope.reportJSON.gridColumns);
						var paging = {
							xtype : 'pagingtoolbar',
							store : gridStore,
							displayInfo : true,
							dock : 'bottom',
							displayMsg : 'Displaying topics {0} - {1} of {2}',
						};
						datagrid.addDocked(paging)
						datagrid.reconfigure(gridStore,
								scope.reportJSON.gridColumns);
						datagrid.controller.reportView = scope.reportView;
						datagrid.controller.initObjects();

					},
					/*
					 * used to set href function if the drill down is set to
					 * column
					 */
					setHrefToColumns : function(columns) {
						columns.forEach(function(item) {
							if (item.href == true) {
								item.renderer = this.hrefRenderer
							}
							if (item.columns != undefined) {
								this.setHrefToColumns(item.columns);
							}
							if(item.summaryCaption != undefined && item.summaryCaption.length>0){
								item.summaryRenderer=function(value, summaryData, dataIndex){
									debugger;
									return eval(item.summaryCaption) ;
								}
						}
						}, this);
					},
					/*
					 * this method used to set column value as link in case of
					 * drill down report
					 */
					hrefRenderer : function(value, metaData, record, row, col,
							store, gridView) {
						myURL = '';
						if (value !== '') {
							myURL = '<a href="javascript:void(0);">' + value
									+ '</a>'
						}
						return myURL;
					},
					/*
					 * this method isused to disable query criteria when the
					 * report is drill down
					 */
					disableQCValues : function() {
						Ext.Array.each(this.queryCriteria.items.items,
								function(item, ind, items) {
									item.setDisabled(true);
								}, {
									scope : this
								});
						this.queryCriteria.down("#btnClear").setDisabled(true);
						this.queryCriteria.down("#btnSearch").setDisabled(true);

					},
					/*
					 * Used to Load Query Criteria Data 1) Load Widget 2)merge
					 * query criteria + drill down Parameter if the report is
					 * drilled report to execute grid with default value
					 * 
					 * This method is used for Both Panel and Tab Layout
					 * 
					 */
					loadQueryCriteria : function() {
						var queryCriteria = [];
						this.getQueryCriteria(queryCriteria);
						if (this.getView().rptHrefQC != undefined) {
							queryCriteria = Ext.Array.merge(queryCriteria, this
									.getView().rptHrefQC);
						}
						if (this.getView().drilled != undefined
								&& this.getView().drilled == true) {
							this.disableQCValues();
						}
						return queryCriteria;
					},

					getQueryCriteria : function(qc) {
						Ext.Array.each(this.queryCriteria.items.items,
								function(item, idx, items) {
									var val;
									if (item.xtype == "adatepickerfield"
											|| item.xtype == 'datefield') {
										/*
										 * val =
										 * Ext.Date.format(item.getValue(),
										 * Ext.Date.defaultFormat);
										 */
										val = item.getValue() != null ? item
												.getValue().getTime() : item
												.getValue();

									} else {
										val = item.getValue();
									}
									this.filterCondition.push({
										name : item.name,
										datatype : item.datatype,
										value : val
									});
								}, {
									filterCondition : qc
								});

					},
					/*
					 * This method is used to filter grid/chart data in click of
					 * search button
					 */
					filterData : function(datagrid, scope) {
						var queryCriteria = [];
						this.getQueryCriteria(queryCriteria);
						var store = datagrid.getStore();
						store.getProxy().extraParams = this.getGridParams(
								queryCriteria, this.getView().reportJSON.sqlId);

						// load chart data
						this.loadDataPointChart(queryCriteria, scope);
						this.setReportDetails();
						store.load();
					},
					setReportDetails : function() {
						this.reportQCList = [];
					},
					/*
					 * This method used to get Data Grid or Summary Grid Object
					 * based on settiting for both Panel and Tab Layout
					 */
					getDataGrid : function() {
						var grid = {
							margin : "0 0 0 0",
							xtype : 'data-grid-view',
							titleAlign : 'center',
							autoScroll : true,
							region : "center",
							viewConfig: {
					           /// stripeRows: true
					        }
						};
						if (this.getView().reportJSON.isSummaryGrid != undefined
								&& this.getView().reportJSON.isSummaryGrid == 1) {

							if (this.getView().reportJSON.summaryGroups != undefined
									&& this.getView().reportJSON.summaryGroups.length > 0) {
								
								grid.features= [ {
									id : 'group',
									ftype : 'groupingsummary',
									groupHeaderTpl : '{name}',
									hideGroupedHeader : true,
									enableGroupingMenu : false
								},{
								        ftype: 'summary'
								    }]; 		
									grid.split = true;
									grid. columnLines= true;
							}

						}
						return grid

					}
				});