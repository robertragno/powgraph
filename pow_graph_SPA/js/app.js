var resortListTemplate;


//compile the list of resorts on documnet ready
(function() {
	var resortListTemplateSource = $("#resort-list-template").html();
	resortListTemplate = Handlebars.compile(bookListTemplateSource);
})();

//Set up books collection

var Resorts = Backbone.Collection.extend({
	url: "api.powgraph.dev"
});

var resorts = new Resorts();

// set up book list view

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