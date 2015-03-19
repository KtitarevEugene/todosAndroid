var args = arguments[0] || {};

function hideForm (e) {
	args.formWindow.close();
}

function removeProject (e) {
	args.formWindow.close();
	if(args.removeProject)
		args.removeProject();
}

function addTodo (e) {
	args.formWindow.close();
	if(args.addTodo)
		args.addTodo();		
}
