var tabgroup = $.tabGroup;

if(OS_ANDROID) {
	tabgroup.addEventListener('androidback', function(e) {
		switch(tabgroup.activeTab.id) {
			case "mainTab": {
				$.navigationView.back();
				break;
			}
			case "aboutTab": {
				tabgroup.close();
			}
		}
	});
		
	$.navigationView.addEventListener('back', function(e) {
		if(!e.pageNumber)
			tabgroup.close();
	});
	
	$.navigationView.addEventListener('swipe', function(e) {
		if(e.direction == 'right')
			$.navigationView.back();
	});
}

if(OS_ANDROID) {
	$.navigationView.setTitleBarGradient({
        type: 'linear',
        startPoint: { x: '50%', y: '0%' },
        endPoint: { x: '50%', y: '100%' },
        colors: [ { color: '#458bbd', offset: 0.0}, { color: '#a1cbe9', offset: 1.0 } ],
   	});
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
