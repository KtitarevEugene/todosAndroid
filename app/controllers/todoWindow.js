var args = arguments[0] || {};

var activity = args.tabGroup.getActivity();
activity.title = "TODOs";
activity.onCreateOptionsMenu = function(e) {
    var menuItem = e.menu.add({
        title : "Edit",
        showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
    });
    menuItem.addEventListener("click", function(e) {
    	openEditDialog(e);
    });
};
activity.invalidateOptionsMenu();


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
  		height: 100,
  		borderRadius: 10,
  		bottom: -100,
	});
	form.add(Alloy.createController('editProjectForm', {formWindow: win, removeProject: onRemoveProject, addTodo: onAddTodo}).getView());
	win.add(form);
	var matrix = Ti.UI.create2DMatrix();
	matrix = matrix.translate(0, -100);
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
	$.secondWnd.close();
}

function onAddTodo () {
	args.tab.open(Alloy.createController('editTodoForm', {projectId: args.projectId}).getView());
}

function showEditTodoForm (e) {
	var record = todos.get(e.itemId);
	args.tab.open(Alloy.createController('editTodoForm', {recordToEdit: record}).getView());
}
