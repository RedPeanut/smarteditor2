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
		this.oApp.registerBrowserEvent(this.editingArea, "scroll", "EVENT_EDITING_AREA_SCROLL");
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
	},

	$AFTER_PASTE_HTML: function() {
		console.log("$AFTER_PASTE_HTML is called...");
	},
});