Ext.define('Buzzor.view.searchengine.search.SearchEngineMainPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.solrsearchcontroller',
  
    onSolrSearchClick : function(me) 
    {

		debugger;
	 	var myView = this.view;
	   	var searchText = myView.down('#searchs').value;
	   	var oprationType = myView.down('#Lang').value;
	    
	  	Ext.MessageBox.show({
    		msg : 'Retriving data...',
    		progressText : 'Retriving...',
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
				jsonResult = myView.down("#results");
				jsonResult.update("Result tab");
				myView.down("#document").body.update("Final Text is render here");
				
				result = Ext.JSON.decode(response.responseText);
				rsp = Ext.JSON.decode(result.actualResult);
				data = rsp.response.docs;

				var finalHtmlText = "<table style='margin:10px 0px 0px 20px;font-family:'tahoma,arial,verdana,sans-serif;' border='0' width='90%' cellspacing ='0'><tr  valign='middle'> ";
				var finalHtmlTable = "<table style= 'margin:0px 0px 0px 20px; align='center' border='0' width='95%'><tr><td valign='middle' width='90%'> ";
				var statusPanel = "";

				statusPanel += "<font size ='2' color='#808080'>"
						+ result.status + "</font><br>";

				var totalrecords = [];
				var chartTotalRecord = [];
				var mainChartTotalRecord = [];
				var docFound = false;
				for (result = 0; result < data.length; result++) {

					if (result != 0) {
						finalHtmlText += "";
						finalHtmlTable += "";
					}

					if (data[result].content == undefined) {

						i = data[result].content;
						if (data[result].hasOwnProperty('table_name')
								&& !data[result].hasOwnProperty('result_type')) {
							if (totalrecords
									.hasOwnProperty(data[result].table_name)) {
								totalrecords[data[result].table_name]
										.push(data[result]);
							} else {
								var record = [];
								record.push(data[result]);
								totalrecords[data[result].table_name] = record;
							}
						} else if (data[result].hasOwnProperty('result_type')) {

							if (chartTotalRecord
									.hasOwnProperty(data[result].table_name)) {
								chartTotalRecord[data[result].table_name].data
										.push(data[result]);
							} else {
								var chartlocalJson = {};
								chartlocalJson["result_type"] = data[result].result_type[0];
								chartlocalJson["data"] = [];
								chartlocalJson["data"].push(data[result]);
								chartTotalRecord[data[result].table_name] = chartlocalJson;
							}
						}

					}
					else if (data[result].stream_name == undefined) {
						docFound = true;
						finalHtmlText += "<a href="
								+ data[result].id
								+ "> <font size ='2'>"
								+ data[result].id
								+ "</font><font size ='2'  color='#000000'></a></font>";

						if (data[result].author != undefined) {

							finalHtmlText += "<br>"
									+ "<b><font size ='2' >Author: "
									+ data[result].author + "</b></font>"
									+ "</font>"
									+ "<br><b><font size ='2' >Subject: "
									+ data[result].subject + "</b></font><br>";
						} else {
							finalHtmlText += "";
						}
						finalHtmlText += "<br> <font size ='2'>"
								+ data[result].content[0].trim().substring(0,
										70);
						finalHtmlText += "...</font><br><br>";

					}

					else {
				
						docFound = true;
						debugger;
						
						count = getTotalspan(data[result]);
						
						var Filename = data[result].stream_name[0]
								.substr(data[result].stream_name[0]
										.indexOf('.') + 1);
							
							finalHtmlText += "<tr>";
				
							finalHtmlText += "<td width ='20%' style=\"background-image: url('images/" + Filename
									+ ".png'); background-repeat:no-repeat; background-size: 70px 70px; align:center; \"><rowspan ="+count+"></td>";
							
							finalHtmlText += "<td width ='80%'>";
							
							finalHtmlText += "<a href=" + encodeURI(data[result].stream_name)
									+ " ><font size ='2'>"
									+ data[result].stream_name + "</font></a>";

							if (data[result].subject != undefined) {

								finalHtmlText += "<br><b><font size ='2' >Subject: "
										+ data[result].subject + "</b></font>";
							}

							else {
								finalHtmlText += "";
							}
							if (data[result].author != undefined) {
								finalHtmlText += "<br><b><font size ='2' >Author: "
										+ data[result].author + "</b></font>";
							} else {
								finalHtmlText += "";
							}
							if (data[result].created != undefined) {
								finalHtmlText += "<br><b><font size ='2' >Date: "
										+ data[result].created
										+ "</b></font>";

							} else {
								finalHtmlText += "";
							}

							finalHtmlText += "<br><font size ='2'>"
									+ data[result].content[0].trim().substring(0,
											70);
							finalHtmlText += "...</font><br>";
							finalHtmlText += "<hr></td>";
							finalHtmlText += "</tr>";
						

					}
				}
				if (!docFound) 
				{
					myView.down("#document").collapse();
				} 
				else 
				{
					myView.down("#document").expand();
				}
				for ( var tablename in totalrecords) {
					try {
						Ext.Element.get(tablename.replace(" ", "_"))
								.destroy();
					} catch (e) {
					}
					finalHtmlTable += "<div style= align='center' id='"
							+ tablename.replace(" ", "_")
							+ "' width='95%'></div><br>";
				}

				finalHtmlText += '</tr></table>';
				finalHtmlTable += '</td></tr></table>';
				
				for ( var chart in chartTotalRecord) {
					try {
						Ext.Element.get(chart.replace(" ", "_")).destroy();
					} catch (e) {
					}
					finalHtmlTable += "<br><div style='margin:0px 0px 0px 40px; align='center' width:95%' id="
							+ chart.replace(" ", "_")
							+ ">  "
							+ chart.replace(" ", "_") + "</div><br>";
				}
				
				myView.down("#document").body.update(finalHtmlText);
				myView.down("#table").body.update(finalHtmlTable);
				myView.down("#stat").body.update(statusPanel);

				for ( var tablename in totalrecords) 
				{
					drawGrid(tablename, totalrecords[tablename]);
				}
				
				for ( var chart in chartTotalRecord) 
				{
					if ("maharashtrachart" == chartTotalRecord[chart].result_type) {

						drawMaharashtrachart(chartTotalRecord[chart].data);

					} else if ("heatchart" == chartTotalRecord[chart].result_type) {

						drawHeatChart(chartTotalRecord[chart].data);

					} else if ("radarchart" == chartTotalRecord[chart].result_type) {

						drawRadarChart(chartTotalRecord[chart].data);

					}
				}

				Ext.MessageBox.hide();

				function getTotalspan(result)
				{
					var count = 1;
					if (result.subject != undefined) {

						count ++;
					}
					if(result.author != undefined)
					{
						count++;
					}
					if(result.content != undefined)
					{
						count++;
					}
					if(result.created != undefined)
					{
						count++;
					}
				}
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
