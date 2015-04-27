Ext.define('Buzzor.view.main.MainPanel', {
	//extend : 'Ext.container.Viewport',
	extend:'Ext.panel.Panel',
	xtype : 'mainPanel',

	requires : [ 'Buzzor.view.resource.ResourcePanel',
	             'Buzzor.view.main.TopPanel.TopPanel',
	            //'Buzzor.view.main.TopPanel.TopMenu',
	             'Ext.layout.container.Accordion',
	             'Ext.Img',
	             'Ext.button.Split'
	           ],
	
	layout:'border',
	anchor:'100% 100%',

	items : 
	[{
		  	region:'north',
			  	xtype:'panel',
			  	items:
			  	[{
	 			  	xtype:'customHeader'
			  	},
			 /* 	{
			  		xtype: 'topMenu',
			        plugins: 'responsive',
			        responsiveConfig: {
			            tall:{
			                visible: true
			            },
			            wide:{
			                visible: false
			            }
			        } 
			  	}*/
			  	]
      },
      {	 
	  	  region:'west',
	  	  itemId:'westPanel',
    	  split : true,
    	  width : '18%',
    	  items:[{
    		  xtype:'panel',
    		  items:[
    		  {
    			    title : 'Resources',
    				xtype : 'resourcePanel',
    				
    		  }]
    	  }],
    	  listeners:{
    		  afterrender:function(panel)
    		  {
    			  panel.hide();
    		  }
    	  },
    	/*  plugins: 'responsive',
	        responsiveConfig: {
	            tall:{
	            	width : '50%',
	            },
	            wide:{
	            	width : '15%',
	            }
	        } */ 
  },
	{
		region : 'center',
		xtype : 'tabpanel',
		//width:'85%',
		itemId : 'appMainTabPanel',
		id : 'appMainTabPanel',
		/* plugins: 'responsive',
	        responsiveConfig: {
	            tall:{
	            		hidden:true
	            },
	            wide:{
	            		hidden:false
	            }
	        }  */
	},
	{
		region : 'east',
		title : 'Help',
		split : true,
		collapsible : true,
		width : '20%',
		collapsed : true,
		plugins: 'responsive',
		responsiveConfig: 
		{
			tall: 
			{
				region : 'south',
			},
			wide: 
			{
        	  region : 'east',
			}
		},
		items:[{
			
			html:'The page is under construction.....'
				
		}]
  }]
});

