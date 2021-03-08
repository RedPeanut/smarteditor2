/*

*/

/**
 * @desc
 */
nhn.husky.SE2M_Menubar = jindo.$Class({
	name: "SE2M_Menubar",
	menubarArea: null,
	//menubarItems: null,

	_assignHTMLElements: function(oAppContainer) {
		oAppContainer = jindo.$(oAppContainer) || document;

	},
	$init: function(oAppContainer, htOptions) {
		this._htOptions = htOptions || {};
		this._assignHTMLElements(oAppContainer);
	},
	$ON_MSG_APP_READY: function() {
		//console.log("$ON_MSG_APP_READY() is called...");
		//console.log("this.oApp = " + this.oApp);
		
	}

});
