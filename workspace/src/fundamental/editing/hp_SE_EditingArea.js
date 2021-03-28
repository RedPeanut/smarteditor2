/**
 * @desc 
 */
nhn.husky.SE_EditingArea = jindo.$Class({

	name: "SE_EditingArea",
	
	$init: function(appContainer) {

		this.appContainer = appContainer;
		this.menuBar = appContainer.querySelector("#menuBar");
		this.toolBar = appContainer.querySelector("#toolBar");
		this.statusBar = appContainer.querySelector("#statusBar");

		var container = this.container = appContainer.querySelector(".container"),
			document = this.document = container.querySelector(".document"),
			ruler = this.ruler = container.querySelector(".ruler"),
			editingArea = this.editingArea = document.querySelector(".editing_area");
		
		/* // We need the host element to be a container:
		if (carota.dom.effectiveStyle(element, "position") !== "absolute") {
			element.style.position = "relative";
		} */

		this.scrollView = document.querySelector("#scrollView");
		this.scrollViewHorizontal = document.querySelector("#scrollViewHorizontal");
		this.scrollViewVertical = document.querySelector("#scrollViewVertical");

		/* console.log("screen.availWidth = " + screen.availWidth);
		console.log("screen.availHeight = " + screen.availHeight);
		scrollViewHorizontal.style.width = screen.availWidth+"px";
		scrollViewVertical.style.height = screen.availHeight+"px"; */

		// 
		var paperCanvas = editingArea.querySelector("#paperCanvas"),
			editCanvas = this.editCanvas = editingArea.querySelector("#editCanvas");
		this.doc = carota.doc();
		console.log("doc.width() = " + this.doc.width());
		console.log("doc.frame.bounds().h = " + this.doc.frame.bounds().h);
		//var docWidth = this.doc.width();
		//var docHeight = this.doc.frame.bounds().h;
		
	},

	$BEFORE_MSG_APP_READY: function() {
	},

	$ON_MSG_APP_READY: function() {
		//this.oApp.registerBrowserEvent(this.editingArea, "scroll", "EVENT_EDITING_AREA_SCROLL");
	},

	$BEFORE_EVENT_EDITING_AREA_SCROLL: function() {
		console.log("$BEFORE_EVENT_EDITING_AREA_SCROLL is called...");
	},

	$ON_EVENT_EDITING_AREA_SCROLL: function() {
		console.log("$ON_EVENT_EDITING_AREA_SCROLL is called...");
	},

	$BEFORE_PASTE_HTML: function() {
		console.log("$BEFORE_PASTE_HTML is called...");
	},
	
	$ON_PASTE_HTML: function(sHTML, oPSelection, htOption) {
		console.log("$ON_PASTE_HTML is called...");
		var runs = carota.html.parse(sHTML, {
			//carota: { color: 'orange', bold: true, size: 14 }
		});
		this.doc.load(runs);
		console.log("this.doc.frame.actualWidth() = " + this.doc.frame.actualWidth());
		this.oApp.exec("EDITING_AREA_PAINT");
	},

	$AFTER_PASTE_HTML: function() {
		console.log("$AFTER_PASTE_HTML is called...");
	},
	
	$ON_EDITING_AREA_PAINT: function() {
		//console.log("$ON_EDITING_AREA_PAINT is called...");

		this.editingArea.style.width = 100+"%";
		this.editingArea.style.height = this.appContainer.clientHeight - (this.menuBar.clientHeight + this.toolBar.clientHeight + this.ruler.clientHeight + this.statusBar.clientHeight) + "px";
		
		this.scrollView.style.width = this.editingArea.clientWidth+"px";
		this.scrollView.style.height = this.editingArea.clientHeight+"px";

		//A4=210x297(mm),Document=794x1123(px,macbook 15")
		var documentWidth = Math.floor(210*3.78);
		var documentHeight = Math.floor(297*3.78);
		var padding = 20;

		this.scrollViewHorizontal.style.width = documentWidth + padding*2 + "px";
		this.scrollViewVertical.style.height = documentHeight + padding*2 + "px";

		var availableWidth = documentWidth;
		if (this.doc.width() != availableWidth)
			this.doc.width(availableWidth);

		var logicalWidth = this.editingArea.clientWidth,
			logicalHeight = this.editingArea.clientHeight;

		var dpr = Math.max(1, window.devicePixelRatio || 1);
		
		this.editCanvas.width = dpr * logicalWidth;
		this.editCanvas.height = dpr * logicalHeight;
		this.editCanvas.style.width = logicalWidth + 'px';
		this.editCanvas.style.height = logicalHeight + 'px';
		
		//console.log("dpr = " + dpr);
		var ctx = this.editCanvas.getContext("2d");
		ctx.scale(dpr, dpr);

		ctx.clearRect(0, 0, this.editingArea.clientWidth, this.editingArea.clientHeight);
		//console.log("this.scrollView.scrollLeft = " + this.scrollView.scrollLeft);
		//console.log("this.scrollView.scrollTop = " + this.scrollView.scrollTop);
		//this.doc.draw(ctx, carota.rect(padding+this.scrollView.scrollLeft, padding+this.scrollView.scrollTop, logicalWidth-2*padding, logicalHeight-2*padding));
		this.doc.draw(ctx, carota.rect(0, 0, this.editingArea.clientWidth, this.editingArea.clientHeight));
	}
});