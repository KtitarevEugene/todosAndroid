var tabgroup = $.tabGroup;
tabgroup.open();
var projects = Alloy.Collections.Project;
projects.fetchSorted();

function onOpen(e) {
	var activity = $.tabGroup.getActivity();
    activity.onCreateOptionsMenu = function(e) {
        var menuItem = e.menu.add({
            title : "Add",
            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
        });
        menuItem.addEventListener("click", function(e) {
        	openAddDialog(e);
        });
    };
    activity.invalidateOptionsMenu();
}



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
	$.mainTab.open(Alloy.createController('todoWindow', {projectId: e.itemId, projectIndex: e.itemIndex, projectsCollection: projects, tab: $.mainTab, tabGroup: $.tabGroup}).getView());
}

function openSite (e) {
	Ti.Platform.openURL("http://" + $.site.text);
}
