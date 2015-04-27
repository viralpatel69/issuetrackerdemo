Ext.define('Buzzor.view.resource.ResourcePanel', {
	extend : 'Ext.panel.Panel',
    xtype : 'resourcePanel',
    itemId :'resourcePanel',
    layout: 'accordion',
    requires: ['Buzzor.view.resource.ResourcePanelController'],
    controller:'resourcePanelController',
    items: [],
    listeners:{
    	scope:'controller',
    	afterrender:'onResourcePanelAfterRender'
    }
});
