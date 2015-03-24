var platformWidth = (Ti.Platform.osname == "android") ? Ti.Platform.DisplayCaps().displayCaps.platformWidth : Ti.Platform.displayCaps.platformWidth;

var backButtonHandler = function(e) {
	if(stack[stack.length - 1] && stack[stack.length - 2])
	{
		var hidingView = stack[stack.length - 1].component;
		var openingView = stack[stack.length - 2].component;
	
		var openingViewMatrix = Ti.UI.create2DMatrix();
		openingViewMatrix = openingViewMatrix.scale(1, 1);
		
		
		
		var hidingViewMatrix = Ti.UI.create2DMatrix();
		hidingViewMatrix = hidingViewMatrix.translate(platformWidth * 0.8, 0);
		
		var openAnimation = Ti.UI.createAnimation({
			transform: openingViewMatrix,
			duration: 300
		});
			
		var hideAnimation = Ti.UI.createAnimation({
			transform: hidingViewMatrix,
			duration: 300
		});
		
		hideAnimation.addEventListener("start", function() {
			isInAction = true;
		});
		hideAnimation.addEventListener("complete", function() {
			stack.pop();
			$.currentWindowTitle.text = stack[stack.length - 1].windowTitle;
			$.content.remove(hidingView);
			$.actionBarContainer.removeAllChildren();
			
			for(var index in stack[stack.length - 1].actionBarElements)
				$.actionBarContainer.add(stack[stack.length - 1].actionBarElements[index]);
			if(stack.length < 2)
				$.icon.visible = false;
			isInAction = false;
		});
		
		openingView.show();
		openingView.animate(openAnimation);
		hidingView.animate(hideAnimation);
	}
};

var stack = [];
var isInAction = false;

function backButtonClick (e) {
	if(typeof(backButtonHandler) === "function")
		backButtonHandler(e);
}

exports.onBackButtonClick = function(handler) {
	backButtonHandler = handler;
};

exports.back = function() {
	if(typeof(backButtonHandler) === "function")
		backButtonHandler();	
};

exports.openPage = function (title, view) {
	if(!isInAction)
	{
		var elements = [];
		
		var hidingView = stack[stack.length - 1].component;
		
		for(var index in view.children)
			if(view.children[index].id == "controls")
			{
				elements = view.children[index].children;
				view.remove(view.children[index]);
				break;
			}
	
		var openingViewMatrix = Ti.UI.create2DMatrix();
		openingViewMatrix = openingViewMatrix.translate(-platformWidth * 0.8, 0);
		
		var hidingViewMatrix = Ti.UI.create2DMatrix();
		hidingViewMatrix = hidingViewMatrix.scale(0.5, 0.5);
		
		var openAnimation = Ti.UI.createAnimation({
			transform: openingViewMatrix,
			duration: 300
		});
		openAnimation.addEventListener("start", function(){
			isInAction = true;
		});
		openAnimation.addEventListener("complete", function() {
			stack.push({component: view, 
					windowTitle: title, 
					actionBarElements: elements});
			view.setLeft(leftPos);
			view.setRight(rightPos);
			$.currentWindowTitle.text = title;
			$.actionBarContainer.removeAllChildren();
			for(var index in elements)
				$.actionBarContainer.add(elements[index]);
			if(!$.icon.visible)
				$.icon.visible = true;
			isInAction = false;
		});
		
		var hideAnimation = Ti.UI.createAnimation({
			transform: hidingViewMatrix,
			duration: 300
		});
		hideAnimation.addEventListener("complete", function() {
			hidingView.visible = false;
		});
		
		$.content.add(view);
		
		var leftPos = view.getLeft();
		var rightPos = view.getRight();
		
		view.setLeft(platformWidth * 0.4);
		view.setRight(-platformWidth * 0.4);
		hidingView.animate(hideAnimation);
		view.animate(openAnimation);
	}
};

exports.setFirstPage = function(title, view) {
	title = title || "";
	elements = [];
	for(var index in view.children)
		if(view.children[index].id == "controls")
		{
			elements = view.children[index].children;
			view.remove(view.children[index]);
			break;
		}

	$.icon.visible = false;
	$.currentWindowTitle.text = title;
	stack.push({component: view, 
		windowTitle: title, 
		actionBarElements: elements});	
	$.content.add(view);
	for(var index in elements)
		$.actionBarContainer.add(elements[index]);
};
