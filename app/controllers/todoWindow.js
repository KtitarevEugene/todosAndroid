var args = arguments[0] || {};

var todos = Alloy.Collections.Todo;
todos.getTodoForProject(args.projectId);

function openEditDialog(e) {
	var win = Ti.UI.createWindow({
		backgroundColor: 'gray',
	    fullscreen: true,
	    navBarHidden: false,
	    opacity : 0.70
	});
	var form = Ti.UI.createView({
 		backgroundColor : 'black',
  		layout: 'vertical',
  		height: 150,
  		borderRadius: 10,
  		bottom: -150,
	});
	form.add(Alloy.createController('editProjectForm', {formWindow: win, removeProject: onRemoveProject, addTodo: onAddTodo}).getView());
	win.add(form);
	var matrix = Ti.UI.create2DMatrix();
	if(Ti.Platform.osname == "iphone")
		matrix = matrix.translate(0, -400);
	else
		matrix = matrix.translate(0, -600);
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
	args.navigation.back();
}

function onAddTodo () {
	args.navigation.openPage("", Alloy.createController('editTodoForm', {projectId: args.projectId, navigation: args.navigation}).getView());
}
function showEditTodoForm (e) {
	var record = todos.get(e.itemId);
	args.navigation.openPage("", Alloy.createController('editTodoForm', {recordToEdit: record, navigation: args.navigation}).getView());
}
