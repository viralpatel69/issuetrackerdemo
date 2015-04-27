Ext
		.define(
				'Buzzor.view.searchengine.search.NorthPanel',
				{
					extend : 'Ext.container.Container',
					xtype : 'northcontainer',

					layout : {
						region : 'north',
						type : 'table',
						columns : 1,
					},

					items : [ {
						xtype : 'container',
						layout : 'column',
						margin : '11 5 5 10',

						items : [
								{
									xtype : 'container',
									layout : 'column',
									columnWidth : .60,
									margin : '11 0 5 0',

									items : [
											{
												name : 'Search',
												itemId : 'searchs',
												xtype : 'textfield',
												value : '*:*',
												columnWidth : .75,
												listeners : {

													specialkey : function(f, e) {
														if (e.getKey() == e.ENTER) {

															searchButtonCommand(this);
														}
													}
												}
											},
											{
												name : 'img',
												itemId : 'voice',
												xtype : 'button',
												icon : 'images/mic.gif',
												height : 25,
												scale : 'small',
												columnWidth : .03,
												style : '{background:#fff;border-left:0px solid #fff;border-bottom:0px solid #fff;border-top:0px solid #fff;border-right:0px solid #fff;border-radius:0px;}',
												handler : 'onVoiceSearch',
											},
											{

												xtype : 'button',
												icon : 'images/searchimg.png',
												style : {
													cursor : 'hand',
												},
												height : 25,
												columnWidth : .03,
												style : '{background:#157fccs;border-radius:0px;border-left:0px solid #fff;border-bottom:0px solid #fff;border-top:0px solid #fff;border-right:0px solid #fff;border-radius:0px;}',
												handler : 'onSolrSearchClick',
											} ]
								},
								{

									valueField : 'value',
									itemId : 'Lang',
									xtype : 'combobox',
									fieldLabel : 'Language',
									displayField : 'name',
									labelWidth : 90,
									minWidth : 200,
									columnWidth : .35,
									region : 'north',
									margin : '11 25 5 10',
									store : Ext
											.create(
													'Ext.data.ArrayStore',
													{
														fields : [ {
															name : 'name',
															type : 'string'
														}, {
															name : 'value',
															type : 'string',
														} ],
														proxy : {
															type : 'ajax',
															url : 'secure/SearchEngineController/getAvailableLanguages',
															reader : {
																type : 'json'
															}
														}
													}),
									/*
									 * store : { fields : [ { name : 'name',
									 * type : 'string' }, { name : 'value', type :
									 * 'string', }
									 *  ], autoLoad : true, proxy : { type :
									 * 'ajax', url :
									 * 'secure/SearchEngineController/getAvailableLanguages',
									 * reader : { type : 'json' } } },
									 */
									/*
									 * minChars : 0, queryParam : 'q', queryMode :
									 * 'remote',
									 */
									listeners : {
										'afterrender' : function(combo) {
											combo.store.load({
												scope : this,
												callback : function(records,
														operation, success) {

													 this.setValue(records[0].data.value);
												}
											});
										}
									}
								}, {
									region : 'west',
									name : 'status',
									columnWidth : .90,
									height : 30,
									itemId : 'stat',
									html : ""
								} ]
					} ]

				});