var args = arguments[0] || {};

exports.rightNavButtons = [$.idSave, $.idRemove];

if(!args.recordToEdit)
{
	$.descrField.backgroundColor = "#fff";
	$.date.value = (new Date()).toString();
}
else {
	$.descrField.value = args.recordToEdit.get('description');
	$.descrField.backgroundColor = args.recordToEdit.get('color');
	$.date.value = args.recordToEdit.get('date');
	$.type.title = args.recordToEdit.get('type');
	$.status.title = args.recordToEdit.get('status');
	if(args.recordToEdit.get('type') == "Bug")
		$.selectStatus.setOptions(['New', 'Fixed']);
	else
		$.selectStatus.setOptions(['New', 'Implemented']);
}

function showTypeOptionDialog (e) {
	$.selectType.show();
}

function showStatusOptionDialog (e) {
	$.selectStatus.show();
}

function setType (e) {
	var index = $.selectStatus.selectedIndex;
	if(e.index == 0)
		$.selectStatus.setOptions(['New', 'Fixed']);
	else
		$.selectStatus.setOptions(['New', 'Implemented']);
	$.status.title = $.selectStatus.options[0];
	$.type.title = $.selectType.options[e.index];
}

function setStatus (e) {
	$.status.title = $.selectStatus.options[e.index];
}

function saveRecord (e) {
	if(args.recordToEdit) {
		/*args.recordToEdit.on('error', function(model, error) {
			console.log("error");
		});
		args.recordToEdit.on('valid', function(model, error) {
			console.log("success");
		});*/
		args.recordToEdit.set({
			description: $.descrField.value,
			type: $.type.title,
			status: $.status.title,
			color: ($.status.title == "Fixed" || $.status.title == "Implemented") ? '#90ee90' : $.descrField.backgroundColor
		});
		if(!args.recordToEdit.isValid())
			Ti.UI.createAlertDialog({message: args.recordToEdit.validationError}).show();
		else {
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
		if(!model.isValid())
			Ti.UI.createAlertDialog({message: model.error}).show();
		else {
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
	switch(e.source.id)
	{
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
