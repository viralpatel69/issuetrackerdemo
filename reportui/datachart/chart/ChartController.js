Ext.define('Buzzor.view.reportui.datachart.chart.ChartController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.chartController',
	reportView : null,
	reportViewController : null,
	reportJSON : null,
	init : function() {

	},
	initObject : function() {
		this.reportView = this.getView().up().up();
		this.reportViewController = this.reportView.controller;
		this.reportJSON = this.reportView.reportJSON;
		var clayout=this.getView().down("#chartcolumnlayout");
		if(this.reportJSON != undefined && this.reportJSON.defaultCColumn!=undefined){
			clayout.value=this.reportJSON.defaultCColumn;
			clayout.minLength=this.reportJSON.defaultCColumn;
		}
	},
	loadCharts : function(charts) {
		this.initObject();
		this.getView().removeAll();
		var fusionchart;
		// var charts= this.chartDatas
		for (var x = 0; x < charts.length; x++) {
			panel = this.getView().add({
				xtype : "panel",
				height : charts[x].height * 1,
				margin : '5 5 0 0',
				chartJSON : charts[x],
				listeners : {
					afterrender : 'loadfusionchart'
				}
			});
			
		}
		this.getView().doLayout();
		//this.resizeCharts(this.getView().down("#chartcolumnlayout"));
	},
	loadfusionchart : function(panel) {
		var clayout=this.getView().down("#chartcolumnlayout");
		var newColumns = parseInt(clayout.value);
		var chartwidth=this.getView().getWidth()/newColumns;
		panel.chartJSON.width=chartwidth;
		var fusionchart = new FusionCharts(panel.chartJSON);
		fusionchart.render(panel.body.id);
		panel.doLayout();
		this.resizeCharts(this.getView().down("#chartcolumnlayout"));
	},
	resizeCharts : function(comp, newValue, oldValue, eOpts) {
		var Value = comp.value;
		mainPanel = comp.up().up();
		mainPanel.getLayout().columns = parseInt(Value);
		newColumns = parseInt(Value);
		totalWidth = (mainPanel.getWidth())
		for (var i = 0; i < mainPanel.items.length; i++) {
			var currentPanel = mainPanel.items.items[i];
			currentPanel.setWidth(((totalWidth - 2) / newColumns));
		}
		for ( var k in FusionCharts.items) {
			fusionObj = FusionCharts.items[k];
			var panelbodyId = fusionObj.options.containerElementId;
			if (this.getView().down(
					'#'
							+ panelbodyId.substring(0, panelbodyId
									.indexOf('-body'))) != null) {
				fusionObj.resizeTo(((totalWidth) / newColumns));
			}
		}
		mainPanel.setWidth(totalWidth);

	}
});