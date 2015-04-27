Ext.define('Buzzor.view.resource.AppMenuTreePanel', {
	extend : 'Ext.tree.Panel',
    xtype: 'appMenuTreePanel',
    itemId: 'appMenuTreePanel',
    
    requires: ['Buzzor.view.resource.AppMenuTreePanelController'],
    
    controller: 'appMenuTreePanelController',
    rootVisible:false,
    useArrows:true,
    width:'100%',
    latout:'fit',
	listeners: {
         itemclick : function( currentObject, record, item, index, e, eOpts){
        	 this.getController().renderFormPanel(currentObject, record, item, index, e, eOpts);
         }
   	}    
   
    	
});
