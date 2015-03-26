var args = arguments[0] || {};

function hideForm (e) {
	args.formWindow.close();
}

function addProject (e) {
	var projectNameText = $.projectNameField.getValue();
	if(!projectNameText) {
		Ti.UI.createAlertDialog({message: 'Please enter new project name.',
								ok: "OK",
								okid: 1,
								}).show();
		return;
	}
	Alloy.createModel('Project', {
		projectName: projectNameText
	}).save();
	Alloy.Collections.Project.fetchSorted();
	args.formWindow.close();
}
