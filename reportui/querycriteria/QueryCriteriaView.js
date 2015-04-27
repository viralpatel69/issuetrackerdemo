Ext
		.define(
				'Buzzor.view.reportui.querycriteria.QueryCriteriaView',
				{
					extend : 'Ext.panel.Panel',
					requires : [ 'Buzzor.view.reportui.querycriteria.QueryCriteriaController' ],
					xtype : 'querycriteria',
					controller : 'querycriteriaController',
					title : 'Query Criteria',
					split : true,
					closable : false,
					collapsible : true,
					collapsed:true,
					width : '25%',
					bodyPadding : '1 0 0 0',
					itemId : 'querycriteria',
					layout : {
						type : 'anchor'
					},
					bbar : ['->', {
						xtype : 'button',
						text : 'Clear',
						itemId:"btnClear"
						//icon : 'resources/css/images/search.png'
					}, {
						xtype : 'button',
						text : 'Search',
						itemId:"btnSearch",
						icon : 'resources/css/images/search.png',
						listeners:{
			        		 click:'filterData'
			        	 }
					} ]
				});