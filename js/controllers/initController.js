console.log("iniController");

function IdGenerator() {
	var seed = 100000;
	return {generate : function() {return seed++;}};
}

idGenerator = new IdGenerator();

function start() {
	console.log("start");
	loadViews(["views/characterView.html", "views/spellBookView.html"]);
	$("#characterView").show();
	createSpells();
	
	createTargalad();
}


function loadViews(views) {
	for (var i = 0; i< views.length; i++) {
		//var response = request(views[i]);
		//createView(response);
		var jqxhr = $.ajax({
			url:views[i],
			success: createView, 
			error: console.log,
			async:false
		});
	}
}

function createView(viewHtml){
	if (typeof viewHtml === 'string' || viewHtml instanceof String) {
		//var view = $($(viewHtml)[1]).html().trim();
		$("#viewHolder").append(viewHtml);
		return;
	}
	
	var view = $(viewHtml).find(".view");
	var wrap = $("<div></div>").append($(view));
	$("#viewHolder").append(wrap.html());
	return;
}


function createSpells() {
	var jqxhr = $.ajax({
		url:"views/spellTemplate.html",
		success: function(templateHtml) {
			console.log("spellTemplates");
			var spellsList = $("#spellsListId");
			var templateString = "";
			if (typeof templateHtml === 'string' || templateHtml instanceof String) {
				templateString = templateHtml;
			} else {
				var element = $(templateHtml).find(".spell-row");
				templateString = element.clone().wrap('<div/>').parent().html();
				templateString = templateString.replace('xmlns="http://www.w3.org/1999/xhtml"', '');
			}
			for (var i=0; i<allSpells.length; i++) {
				spellsList.append(spellHtml(templateString, allSpells[i]));
			}
		},
		error: function(error) {
			console.log(error);
			alert( "could not read template" );
		},
		async:false
	});
}


function spellHtml(template, spell) {
	
	var spellString = template
		.replace(/{spellId}/g, spell.id)
		.replace(/{spellName}/g, spell.name)
		.replace(/{spellLevel}/g, spell.level);
	var spellHtmlElement = $(spellString);
	
	return spellHtmlElement;
}


function addModelListener(id, listenerOrCallback, callback ) {
	var modelElement = $("#model");
	var listener = "changed";
	if (listenerOrCallback instanceof Function) {
		callback = listenerOrCallback;
	} else {
		listener = listenerOrCallback;
	}
	if(callback) {
		var listenOn = "model:" +id + ":" + listener;
		modelElement.on(listenOn, callback);
	}
}


function removeModelListener(id, listener ) {
	var modelElement = $("#model");
	if (!listener) {
		listener = "changed";
	}
	var listenOn = "model:" +id + ":" + listener;
	modelElement.off(listenOn, parameterList);	

}

function triggerModelChange(id, parameters, listener ){
	var modelElement = $("#model");
	if (!listener) {
		listener = "changed";
	}
	var parameterList = parameters;
	if (parameters !== undefined && !Array.isArray(parameters)) {
		parameterList = [parameters];
	}
	var listenOn = "model:" +id + ":" + listener;
	modelElement.trigger(listenOn, parameterList);	
}

function addViewListener(id, listenerOrCallback, callback ) {
	var modelElement = $("#model");
	var listener = "changed";
	if (listenerOrCallback instanceof Function) {
		callback = listenerOrCallback;
	} else {
		listener = listenerOrCallback;
	}
	if(callback) {
		var listenOn = "view:" +id + ":" + listener;
		modelElement.on(listenOn, callback);
	}
}

function removeViewListener(id, listener ) {
	var modelElement = $("#model");
	if (!listener) {
		listener = "changed";
	}
	var listenOn = "view:" +id + ":" + listener;
	modelElement.off(listenOn, parameterList);	

}

function triggerViewChange(id, parameters, listener ){
	var modelElement = $("#model");
	if (!listener) {
		listener = "changed";
	}
	var parameterList = parameters;
	if (parameters !== undefined && !Array.isArray(parameters)) {
		parameterList = [parameters];
	}
	var listenOn = "view:" +id + ":" + listener;
	modelElement.trigger(listenOn, parameterList);	
}


function isFunction(functionToCheck) {
	var getType = {};
	return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}


start();


