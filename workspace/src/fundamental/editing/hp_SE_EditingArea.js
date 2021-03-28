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
		this.oApp.registerBrowserEvent(this.scrollView, "scroll", "EVENT_SCROLL_VIEW_SCROLL", [], null, 100);
		this.oApp.registerBrowserEvent(window, "resize", "EVENT_WINDOW_RESIZE", [], null, 100);
		//this.oApp.registerBrowserEvent(window, "resize", "EVENT_WINDOW_RESIZE");
		//this.oApp.registerBrowserEvent(this.scrollView, "x-scroll", "EVENT_SCROLL_VIEW_X_SCROLL");
		//this.oApp.registerBrowserEvent(this.scrollView, "y-scroll", "EVENT_SCROLL_VIEW_Y_SCROLL");
	},

	$AFTER_MSG_APP_READY : function(){
		//this.oApp.exec("EDITING_AREA_PAINT");
	},

	$ON_EVENT_SCROLL_VIEW_SCROLL: function() {
		//console.log("$ON_EVENT_SCROLL_VIEW_SCROLL is called...");
		//console.log("this.scrollView.left = " + this.scrollView.left);
		//console.log("this.scrollView.top = " + this.scrollView.top);
		//console.log("this.scrollView.scrollLeft = " + this.scrollView.scrollLeft);
		//console.log("this.scrollView.scrollTop = " + this.scrollView.scrollTop);
		this.oApp.exec("EDITING_AREA_PAINT");
	},

	$ON_EVENT_WINDOW_RESIZE: function() {
		console.log("$ON_EVENT_SCROLL_VIEW_RESIZE is called...");
		this.oApp.exec("EDITING_AREA_PAINT");
	},

	$ON_PASTE_HTML: function(sHTML, oPSelection, htOption) {
		console.log("$ON_PASTE_HTML is called...");
		var runs = carota.html.parse(sHTML, {
			//carota: { color: 'orange', bold: true, size: 14 }
		});
		this.doc.load(runs);
		console.log("this.doc.width() = " + this.doc.width());
		console.log("this.doc.frame.bounds().h = " + this.doc.frame.bounds().h);
		console.log("this.doc.frame.actualWidth() = " + this.doc.frame.actualWidth());
		this.oApp.exec("EDITING_AREA_PAINT");
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
	},

	$ON_EDITING_AREA_UPDATE: function() {
		var requirePaint = false;
		/* var newFocused = document.activeElement === textArea;
		if (focused !== newFocused) {
			focused = newFocused;
			requirePaint = true;
		}

		var now = new Date().getTime();
		if (now > nextCaretToggle) {
			nextCaretToggle = now + 500;
			if (this.doc.toggleCaret()) {
				requirePaint = true;
			}
		}

		if (this.editingArea.clientWidth !== cachedWidth ||
			this.editingArea.clientHeight !== cachedHeight) {
			requirePaint = true;
			cachedWidth = this.editingArea.clientWidth;
			cachedHeight = this.editingArea.clientHeight;
		} */

		if (requirePaint) {
			paint();
		}
	}
});