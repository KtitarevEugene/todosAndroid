var tabgroup = $.tabGroup;
tabgroup.open();

$.navigationView.setFirstPage("Projects", Alloy.createController("projectsWindow", {navigation: $.navigationView}).getView());

function openSite (e) {
	Ti.Platform.openURL("http://" + $.site.text);
}
