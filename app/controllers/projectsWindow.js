var args = arguments[0] || {};

var projects = Alloy.Collections.Project;
projects.fetchSorted();

var editButton = Ti.UI.createButton({
	title: "Edit"
});

exports.rightNavButtons = [$.rightNavButton];

function openAddDialog(e) {
	var platformHeight = (OS_ANDROID) ? Ti.Platform.DisplayCaps().displayCaps.platformHeight : Ti.Platform.displayCaps.platformHeight;
	var win = Ti.UI.createWindow({
		backgroundColor: 'gray',
	    fullscreen: false,
	    opacity : 0.70,
	    id: 'projectFormWindow',
	    theme: "Theme.Titanium",
	});
	var form = Ti.UI.createView({
 		backgroundColor : 'black',
  		layout: 'vertical',
  		height: (Ti.Platform.osname == "iphone") ? 150 : 200,
  		borderRadius: 10,
  		bottom: -150,
	});
	form.add(Alloy.createController('addProjectForm', {formWindow: win}).getView());
	win.add(form);
	var matrix = Ti.UI.create2DMatrix();
	matrix = matrix.translate(0, -platformHeight / 2 - form.height / 2);
	var a = Ti.UI.createAnimation({
    	transform : matrix,
    	duration : 300
	});
	form.animate(a);
	win.open();
}

function showTodoList (e) {
	var rec = projects.get(e.itemId);
	if(OS_ANDROID) {
		args.navigation.openPage("TODOs", Alloy.createController('todoWindow', {projectId: e.itemId, projectIndex: e.itemIndex, projectsCollection: projects, navigation: args.navigation}).getView());
	} else {
		var window = Ti.UI.createWindow({
			title:"TODOs"
		});
		var controller = Alloy.createController('todoWindow', {projectId: e.itemId, projectIndex: e.itemIndex, projectsCollection: projects, currentWindow: window, tab: args.tab});
		var view = controller.getView();
		var rightNavView = [];
		for(var index in controller.rightNavButtons) {
			rightNavView.push(controller.rightNavButtons[index]);
		}
		view.remove(view.children[0]);
		window.add(controller.getView());
		window.rightNavButtons = rightNavView;	
		args.tab.open(window);
	}
}
