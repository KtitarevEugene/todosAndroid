var args = arguments[0] || {};

var todos = Alloy.Collections.Todo;
todos.getTodoForProject(args.projectId);

exports.rightNavButtons = [$.rightNavButton];

function openEditDialog(e) {
	var platformHeight = (OS_ANDROID) ? Ti.Platform.DisplayCaps().displayCaps.platformHeight : Ti.Platform.displayCaps.platformHeight;
	var win = Ti.UI.createWindow({
		backgroundColor: 'gray',
	    fullscreen: false,
	    opacity : 0.70,
	    theme: "Theme.Titanium",
	});
	var form = Ti.UI.createView({
 		backgroundColor : 'black',
  		layout: 'vertical',
  		height: (OS_ANDROID) ? 150 : 100,
  		borderRadius: 10,
  		bottom: (OS_ANDROID) ? -150 : -100,
	});
	form.add(Alloy.createController('editProjectForm', {formWindow: win, removeProject: onRemoveProject, addTodo: onAddTodo}).getView());
	win.add(form);
	var matrix = Ti.UI.create2DMatrix();
	matrix = matrix.translate(0, -platformHeight / 2 - form.height / 2);
	var anime = Ti.UI.createAnimation({
    	transform : matrix,
    	duration : 300
	});
	form.animate(anime);
	win.open();
}
function onRemoveProject () {
	while(todos.models.length > 0)
		todos.models[0].destroy();
	args.projectsCollection.models[args.projectIndex].destroy();
	if(OS_ANDROID) {
		args.navigation.back();
	} else {
		args.currentWindow.close();		
	}
}

function onAddTodo () {
	if(OS_ANDROID) {
		args.navigation.openPage("", Alloy.createController('editTodoForm', {projectId: args.projectId, navigation: args.navigation}).getView());
	} else {
		var window = Ti.UI.createWindow();
		var controller = Alloy.createController('editTodoForm', {projectId: args.projectId, currentWindow: window, tab: args.tab});
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
function showEditTodoForm (e) {
	var record = todos.get(e.itemId);
	if(OS_ANDROID) {
		args.navigation.openPage("", Alloy.createController('editTodoForm', {recordToEdit: record, navigation: args.navigation}).getView());
	} else {
		var window = Ti.UI.createWindow();
		var controller = Alloy.createController('editTodoForm', {recordToEdit: record, currentWindow: window, tab: args.tab});
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
