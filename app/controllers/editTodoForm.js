var args = arguments[0] || {};

exports.rightNavButtons = [$.idSave, $.idRemove];

if(!args.recordToEdit) {
	$.descrField.backgroundColor = "#fff";
	$.date.value = (new Date()).toString();
}
else {
	$.descrField.value = args.recordToEdit.get('description');
	$.descrField.backgroundColor = args.recordToEdit.get('color');
	$.date.value = args.recordToEdit.get('date');
	$.type.title = args.recordToEdit.get('type');
	$.status.title = args.recordToEdit.get('status');
}

function showTypeOptionDialog (e) {
	var dialog = Ti.UI.createOptionDialog({
			title: "Select type",
			options: ['Bug', 'Feature'],
			buttonNames: ['OK'],
			selectedIndex: ($.type.title == "Bug") ? 0 : 1
		});
	dialog.addEventListener("click", setType);
	dialog.show();
}

function showStatusOptionDialog (e) {
	var dialog = Ti.UI.createOptionDialog({
			title: "Select status",
			options: ['New', (($.type.title == "Bug") ? 'Fixed': 'Implemented')],
			buttonNames: ['OK'],
			selectedIndex: ($.status.title == "New") ? 0 : 1
		});
	dialog.addEventListener("click", setStatus);
	dialog.show();
}

function setType (e) {
	if(!e.button) {
		$.type.title = e.source.options[e.index];
		$.status.title = "New";
	}
}

function setStatus (e) {
	if(!e.button) {
		$.status.title = e.source.options[e.index];
	}
}

function saveRecord (e) {
	var isValid = true;
	if(args.recordToEdit) {
		args.recordToEdit.on('error', function(model, error) {
			console.log("error");
		});
		args.recordToEdit.set({
			description: $.descrField.value,
			type: $.type.title,
			status: $.status.title,
			color: ($.status.title == "Fixed" || $.status.title == "Implemented") ? '#90ee90' : $.descrField.backgroundColor
		}, {
			error: function(model, error) {
				isValid = false;
				Ti.UI.createAlertDialog({message: error, ok: "OK", okid: 1}).show();
			}
		});
		if(isValid) {
			args.recordToEdit.save();
			Alloy.Collections.Todo.getTodoForProject(args.recordToEdit.get("projectId"));
			if(OS_ANDROID) {
				args.navigation.back();
			} else {
				args.currentWindow.close();				
			}
		}
	} else {
		var model = Alloy.createModel('Todo', {
			projectId: args.projectId,
			description: $.descrField.value,
			date: $.date.value,
			type: $.type.title,
			status: $.status.title,
			color: ($.status.title == "Fixed" || $.status.title == "Implemented") ? '#90ee90' : $.descrField.backgroundColor
		});
		if(!model.isValid()) {
			Ti.UI.createAlertDialog({message: "Please, enter description.",
									ok: "OK",
									okid: 1,
									}).show();
		} else {
			model.save();
			Alloy.Collections.Todo.getTodoForProject(args.projectId);
			if(OS_ANDROID) {
				args.navigation.back();
			} else {
				args.currentWindow.close();				
			}
		}
	}
}

function removeRecord (e) {
	if(args.recordToEdit) {
		args.recordToEdit.destroy();
		if(OS_ANDROID) {
			args.navigation.back();
		} else {
			args.currentWindow.close();				
		}
	}
}

function setTodoColor (e) {
	switch(e.source.id)	{
		case 'whiteColor': {
			$.descrField.backgroundColor = "#fff";
			break;
		}
		case 'yellowColor': {
			$.descrField.backgroundColor = "#fdfcb5";			
			break;
		}
		case 'redColor': {
			$.descrField.backgroundColor = "#ffc3a3";			
			break;
		}
		case 'blueColor': {
			$.descrField.backgroundColor = "#a6cefc";
			break;
		}
	}
}
