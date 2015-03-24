var tabgroup = $.tabGroup;

if(OS_ANDROID) {
	$.navigationView.setFirstPage("Projects", Alloy.createController("projectsWindow", {navigation: $.navigationView}).getView());
} else {
	var window = Ti.UI.createWindow({
			title:"Projects"
		});
	var controller = Alloy.createController("projectsWindow", {tab: $.mainTab});
	var view = controller.getView();
	var rightNavView = [];
	console.log(controller.rightNavButtons);
	for(var index in controller.rightNavButtons) {
		rightNavView.push(controller.rightNavButtons[index]);
	}
	view.remove(view.children[0]);
	window.add(controller.getView());
	window.rightNavButtons = rightNavView;	
	$.mainTab.setWindow(window);
}

tabgroup.open();

function openSite (e) {
	Ti.Platform.openURL("http://" + $.site.text);
}
