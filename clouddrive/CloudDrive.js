Ext.define("Buzzor.view.clouddrive.CloudDrive", {
	extend : 'Ext.panel.Panel',
	xtype : 'clouddrive',
	requires : [ 'Buzzor.view.clouddrive.CloudDriveController',
	             'Buzzor.view.clouddrive.documentview.DocumentsView',
	             'Buzzor.view.clouddrive.drivedetails.DriveDetails',
	             //'Buzzor.view.clouddrive.documentview.DocumentListView'
	             ],
	controller : 'clouddrive',
	itemId:'clouddrive',
	title : '',
	border : 10,
	layout : {
		type : 'border',
	},
	items : [ {
		xtype : 'drivedetails',
		region : 'west',
		margin : '5 0 5 5'
		
	}, 
	{
		xtype:'panel',
		layout:'fit',
		region :'center',
		itemId: 'documentViewId',
		margin : '5 5 5 0',
		items:[{
			xtype : 'documentsview'
		}],
		dockedItems : {
			xtype : 'toolbar',
			itemId : 'docnavigation',
			margin : '0 0 0 0',
			cls : 'mytoolbar',
			style : 'opacity: .7;',
			items : []
		}			
	}],
	dockedItems : {
		xtype : 'toolbar',
		margin : '0 0 0 0',
		width : 620,
		items : [ 'Drive', {
			xtype : 'tbspacer',
			width :'12%'
		}, {
			text : '',
			itemId : 'currentPath'
		}, {
			xtype : 'tbfill'
		}, {
			xtype : 'button',
			icon:"images/cloud/ic_list_bullets.png",
			tooltip : "Switch to List",
			toggleGroup:'myToggleGrp',
			listeners:{
				click:'onListViewClick'
			}
		}, {
			xtype : 'button',
			icon:"images/cloud/ic_grid_view.png",
			tooltip : "Switch to Grid",
			pressed:true,
			toggleGroup:'myToggleGrp',
			listeners:{
				click:'onGridViewClick'
			}
		}]
	},
	listeners : {
		afterrender : 'loadData',
		scope : 'controller'
	}

});
