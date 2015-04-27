Ext.define('Buzzor.view.searchengine.search.SearchEngineMainPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.solrsearchcontroller',
  
    onSolrSearchClick : function(me) 
    {

		debugger;
	 	var myView = this.view;
	   	var searchText = myView.down('#searchs').value;
	   	var oprationType = myView.down('#Lang').value;
	   	var statusPanel = myView.down('#stat');
	   	
	    
	  	Ext.MessageBox.show({
    		msg : 'Retrieving data...',
    		progressText : 'Retrieving...',
    		width : 300,
    		wait : true,
    		waitConfig : {
    			interval : 200
    		}
    	});
		
	   	Ext.Ajax.request
	   	({

			url : 'secure/SearchEngineController/getSearchResult?searchString='
					+ encodeURIComponent(searchText) + "&oprationType="
					+ oprationType,
			method : 'GET',
			waitMsg : 'Retriving data...',
							
			success : function(response) 
			{
							debugger;
							/*
				 * jsonResult = myView.down("#results");
				 * jsonResult.update("Result tab");
				 */
				graphView = myView.down("#table");
				documentGrid = myView
						.down("#documentView");
				graphView.removeAll(true);
				result = Ext.JSON
						.decode(response.responseText);
				if (result.hasOwnProperty("graphData")&&result.graphData.length > 0) {
					graphView.add(result.graphData);
					graphView.doLayout();
				}
				if (result.hasOwnProperty("documents")&&result.documents.length > 0) {
					/*documentGrid.store
							.loadData(result.documents);*/
					
					documentGrid.store.getProxy().setData(result.documents);
					documentGrid.store.read();
					documentGrid.ALLDATA=result.documents;
					/*pager=documentGrid.query('pagingtoolbar')[0];
					pager.bindStore(documentGrid.store);
					documentGrid.reconfigure(documentGrid.store);
					documentGrid.store.loadPage(1);*/
					/*pagging.store = documentGrid.store;
					
					*/
				} else {
					var k = [];
					documentGrid.store.loadData(k);
				}
				/*resultPanel=myView.down("#resultsTab");
				resultPanel.dockedItems.items[0].query("label")[0].setText(result.status);*/
				
				statusPanel.body
						.update("<font size ='2' color='#808080'>"
								+ result.status
								+ "</font>");
				Ext.MessageBox.hide();
			},
			failure : function() 
			{
				Ext.Msg.alert("Request Failed", "Request Failed");
			}

		});
	},
	
	onVoiceSearch : function recognizeVoice(me)
	{
		currentScope = me;

		if (recognizing) 
		{
			recognition.stop();
			return;
		}

		recognition.start();
		ignore_onend = false;

		me.up().up().up().up().down("#voice").setIcon('images/mic-slash.gif');

		showButtons('none');
		start_timestamp = event.timeStamp;

		function showInfo(s) 
		{
			if (s) 
			{
				for (var child = info.firstChild; child; child = child.nextSibling) {
					if (child.style) {
						child = child.id == s ? 'inline' : 'none';
					}
				}
				info = 'visible';
			} 
			else {
				info = 'hidden';
			}
		}

		var current_style;
		function showButtons(style) {
			if (style == current_style) {
				return;
			}
				current_style = style;
			}
	}
    
    
     
});
