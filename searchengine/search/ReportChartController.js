Ext.define('Buzzor.view.searchengine.search.ReportChartController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.reportChartController',

	onAfterrender : function() {
		debugger;
		this.view.setHeight(this.view.chartJson.height * 1);
		resultPanel=this.view.up().up();
		var Value = this.view.up().header.items.items[1].value;
		newColumns = parseInt(Value);
		totalWidth = (this.view.up().getWidth());
		
		this.view.chartJson.width=(totalWidth -15)/ newColumns;
		
		var fusionchart = new FusionCharts(this.view.chartJson);
		fusionchart.render(this.view.body.id);
		
		
	/*	fusionchart
		.resizeTo((totalWidth -15)/ newColumns);
		*/
		
		//this.view.doLayout();
	}
});