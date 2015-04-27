Ext
		.define(
				'Buzzor.view.searchengine.search.ResultPanel',
				{
					extend : 'Ext.panel.Panel',
					xtype : 'resultPanel',
					itemId : "resultsTab",
					plugins : 'responsive',
					requires : [ 'Buzzor.view.searchengine.search.PanelHeaderField' ,'Buzzor.view.searchengine.search.ReportGridView','Buzzor.view.searchengine.search.ReportChartView','Buzzor.view.searchengine.search.documentView'],
					height : window.innerHeight - 180,
					responsiveConfig : {
						wide : {
							layout : 'border'
						},
						'width < 720' : {
							layout : 'fit'
						},
						'width > 720' : {
							layout : 'border'
						},	
					}/*, dockedItems: [{
				        xtype: 'toolbar',
				        dock: 'bottom',
				        items: [{
				        	xtype: 'label',
				            forId: 'myFieldId',
				            text: 'My Awesome Field',
				            margin: '0 0 0 10'
				        }]
				    }]*/,
					items : [
							{	
								border : 0,
								title : 'Documents',								
								xtype : 'documentView',region : 'west',
								columnWidth : .50,bodyStyle:'background:#D8D8D8',
								collapsible : true,
								autoScroll : true,
								//height : window.innerHeight - 160,
								width : '45%',
								collapseDirection:'left',
								listeners : {
							        afterrender : function(panel) {
							            var header = panel.header;
							            header.setHeight(60);
							        }
							    },
								 
							},
							{
								border : 0,
								title : 'Graph Data',
								itemId : 'table',
								
								bodyPadding:0,region : 'center', // center region is required
								xtype : 'panel',
								width : '55%',
								
								bodyStyle:'background:#ececec',
								layout : {
									type : 'table',
									columns : 1
								},
								
							//	header : {
									//titlePosition : 0,
									tools : [
											{
												xtype : 'panelheaderfield',
												// id : 'rating',
												//hidden:true,
												
												numberOfStars : 6,
												tooltip : 'Choose columns',
												minLength : 1,
												value : 1,
												allowBlank : false,
												listeners : {
													'afterrender' : function(
															comp) {
														debugger;
														var defaultWidthToReduce = 60;
														var defaultHeightToReduce = 70;
														var Value = comp.value;
														mainPanel = comp.up()
																.up();
														mainPanel.getLayout().columns = parseInt(Value);
														totalWidth = (mainPanel
																.getWidth())
																- (defaultWidthToReduce + (2 * newColumns));
														mainPanel
														.setWidth(totalWidth);
													},
													change : function(comp,
															newValue, oldValue,
															eOpts) {
														var defaultWidthToReduce = 60;
														var defaultHeightToReduce = 70;

														var Value = comp.value;
															mainPanel = comp.up()
																	.up();
															
															debugger;
														mainPanel.getLayout().columns = parseInt(Value);
														newColumns = parseInt(Value);
														/*totalWidth = (mainPanel
																.getWidth())
																- (defaultWidthToReduce + (2 * newColumns));*/
															/*totalWidth = (mainPanel
																	.getWidth()-5)/newColumns;*/
														
														totalWidth = (mainPanel.getWidth());
														for (var i = 0; i < mainPanel.items.length; i++) {
															var currentPanel = mainPanel.items.items[i];
															currentPanel
																	.setWidth((totalWidth -15)/ newColumns);
														}
														try {
															for ( var k in FusionCharts.items) {
																fusionObj = FusionCharts.items[k];
																fusionObj
																		.resizeTo((totalWidth-15) / newColumns);
															}
														} catch (ex) {
														}
														debugger;
														/*mainPanel
																.setWidth(totalWidth);*/

													}
												}
											}, ],

								//},
								columnWidth : .50,
								//collapsible : true,
								autoScroll : true,
								height : window.innerHeight - 160,

							} ]
				});