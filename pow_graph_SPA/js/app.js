var resortListTemplate;


//compile the list of resorts on documnet ready
(function() {
	var resortListTemplateSource = $("#resort-list-template").html();
	resortListTemplate = Handlebars.compile(resortListTemplateSource);
})();

//Set up resorts collection

var Resorts = Backbone.Collection.extend({
	url: "http://powgraph.dev/resorts.json"
});

var resorts = new Resorts();


//Set up resort model

var Resort = Backbone.Model.extend({
	urlRoot: "http://powgraph.dev/resorts.json"
});

// set up resort list view

var ResortList = Backbone.View.extend({
	el: "#container",
	render: function() {
		resorts.fetch({
			success: function() {
				var html = resortListTemplate({
					allResorts: resorts.models
				});
				$("#container").html(html);
			}
		});
	}
});

//Set up routes

var Router = Backbone.Router.extend({
	routes: {
		"":"index",
	}
});

var router = new Router();

//Define each route action

router.on("route:index", function() {
	var resortlist = new ResortList();
	resortlist.render();
});

//Start the history

Backbone.history.start();