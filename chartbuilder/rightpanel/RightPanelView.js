
Ext.define('Buzzor.view.chartbuilder.rightpanel.RightPanelView', {
	extend : 'Ext.panel.Panel',
	requires:[
	          'Ext.grid.property.Grid',
	          'Buzzor.view.chartbuilder.templates.TemplateTreePanelView',
	          'Buzzor.view.chartbuilder.rightpanel.RightPanelController',
	          'Buzzor.view.chartbuilder.templates.TemplateTreePanelController'    
	          ],
	controller: 'rightpanelcontroller',
	title : 'Chart Properties',
	region : 'east',
	xtype : 'right-panel',
	width : '25%',
	titleCollapse : true,
	split: true,
	autoScroll:true,
	collapsible: true,
	collapsed: false,
	itemId:'rightpanel',
	obj:this,
	rightPropJson:'',
	layout:
	{
		type: 'accordion',
		animate: true
	},
	listeners:{
		scope:'controller',
		afterrender:'afterRender'
	},
	items:[
	      {
	    	   title:'Data Configuration',
	    	   xtype:'panel',
	    	   itemId:'gridFieldPanel',
	    	   layout:'anchor',
	    	   bodyPadding:'8',
	    	   autoScroll:true
	      },	       
 	      {
			title : 'Basic Properties',
			xtype : "propertygrid",
			itemId : 'propertyGrid',
			source : {},
			grouping: false,
            autoFitColumns: true,
            nameColumnWidth:"50%",
            viewConfig: {
            	forceFit: true,
            	scrollOffset: 0
            },
			listeners:{
				afterRender:function(){
					this.setTitle("Basic Properties");	
				},
				propertychange:'onPropertyClick',
			}
			//sourceConfig:{dataFormat:{editor:{xtype: 'displayfield'}//readOnly }}
			//renderTo:Ext.getBody(),	
		},
		{
			title: 'Advanced Properties',
			xtype:"propertygrid",
			itemId:'advPropertyGrid',
			source: {},
		    grouping: false,
            autoFitColumns: true,
            nameColumnWidth:"60%",
		    autoScroll:true,
		    listeners:{
				afterRender:function(){
					debugger;
					this.setTitle("Advanced Properties");	
				},			
				propertychange:'onPropertyClick',			
		    },// listeners ends	   
			customRenderers: {
				bgColor: function(value,obj) 
				{
					debugger;
					var obj1=this.view.up();
					return "<input type='color' id='color-picker' value=#FFFFFF onchange='changeColor(this.value,obj1)'>";
				}
		
			}//customRenderers ends
		},// advance property ends
		{
			xtype:'templateview',
			title:'Templates'			
		}
		],//items ends
		
});

	