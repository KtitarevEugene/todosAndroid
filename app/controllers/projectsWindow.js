var args = arguments[0] || {};

var projects = Alloy.Collections.Project;
projects.fetchSorted();

var editButton = Ti.UI.createButton({
	title: "Edit"
});

function openAddDialog(e) {
	var win = Ti.UI.createWindow({
		backgroundColor: 'gray',
	    fullscreen: true,
	    navBarHidden: false,
	    opacity : 0.70,
	    id: 'projectFormWindow'
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
	if(Ti.Platform.osname == "iphone")
		matrix = matrix.translate(0, -400);
	else
		matrix = matrix.translate(0, -600);
	var a = Ti.UI.createAnimation({
    	transform : matrix,
    	duration : 300
	});
	form.animate(a);
	win.open();
}

function showTodoList (e) {
	var rec = projects.get(e.itemId);
	args.navigation.openPage("TODOs", Alloy.createController('todoWindow', {projectId: e.itemId, projectIndex: e.itemIndex, projectsCollection: projects, navigation: args.navigation}).getView());
}
