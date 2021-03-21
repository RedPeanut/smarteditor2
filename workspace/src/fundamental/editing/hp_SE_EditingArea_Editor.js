/**
 * @desc 
 */
nhn.husky.SE_EditingArea_Editor = jindo.$Class({

	name: "SE_EditingArea_Editor",
	
	$init: function(appContainer) {

		var editingAreaContainer = appContainer.querySelector(".editing_area_container"),
			document = editingAreaContainer.querySelector(".document"),
			element = editingArea = document.querySelector(".editing_area");
		
		// We need the host element to be a container:
		if (carota.dom.effectiveStyle(element, "position") !== "absolute") {
			element.style.position = "relative";
		}

		var paperCanvas = element.querySelector("#paperCanvas"),
			canvas = editCanvas = element.querySelector("#editCanvas");
		this.doc = carota.doc();
		
		console.log("doc.width() = " + this.doc.width());
		console.log("doc.frame.bounds().h = " + this.doc.frame.bounds().h);
		var docHeight = this.doc.frame.bounds().h;

		// TODO: find default document size or default canvas size
		//canvas.style.left = 20+"px";
		//canvas.style.top = 20+"px";
		//canvas.style.width = 400+"px";
		//canvas.style.height = 300+"px";

		console.log("element.clientWidth = " + element.clientWidth);
		var availableWidth = element.clientWidth * 1; // adjust to 0.5 to see if we draw in the wrong places!
		console.log("availableWidth = " + availableWidth);

		var dpr = Math.max(1, window.devicePixelRatio || 1);
		
		var logicalWidth = Math.max(this.doc.frame.actualWidth(), element.clientWidth),
			logicalHeight = element.clientHeight;

		console.log("this.doc.frame.actualWidth() = " + this.doc.frame.actualWidth());

		var paint = function() {
			var dpr = Math.max(1, window.devicePixelRatio || 1);
			//console.log("dpr = " + dpr);
			var ctx = canvas.getContext("2d");
			ctx.scale(dpr, dpr);
		};

		// position in center when window resized
		var position = function() {

		};

		carota.dom.handleEvent(element, 'scroll', paint);
	},

	$BEFORE_MSG_APP_READY: function() {
	},

	$ON_MSG_APP_READY: function() {
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