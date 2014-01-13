window.MatchupsListView = Backbone.View.extend({    
    initialize: function () {
        this.render();
    },
    render: function () {
        _.each(this.model.models, function (team) {        
            $(this.el).append(new MatchupsListItemView({ model: team }).render().el);
        }, this);
        return this;
    }
});

window.MatchupsListItemView = Backbone.View.extend({
    initialize: function () {
        this.render();
    },
    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

// //////////////////////////////////////////////////////

// window.MatchupsListView = Backbone.View.extend({    
//     initialize: function () {
//         this.render();
//     },
//     render: function () {
//         var teams = this.model.models;
//         //teams.query({pennant:{$lte:4}})
//         //teams.find({pennant:{$lte:4}})
//         teams.filter({pennant:{$lte:4}})
//         console.log(teams)
//         _.each(this.model.models, function (team) {        
//             $(this.el).append(new MatchupsListItemView({ model: team }).render().el);
//         }, this);
//         return this;
//     }
// });

// window.MatchupsListItemView = Backbone.View.extend({
//     initialize: function () {
//         this.render();
//     },
//     render: function () {
//         $(this.el).html(this.template(this.model.toJSON()));
//         return this;
//     }
// });

// //////////////////////////////////////////////////////

// <script type="text/javascript">
//     SearchView = Backbone.View.extend({
//         initialize: function(){
//             this.render();
//         },
//         render: function(){
//             // Compile the template using underscore
//             var template = _.template( $("#search_template").html(), {} );
//             // Load the compiled HTML into the Backbone "el"
//             this.el.html( template );
//         }
//     });
    
//     var search_view = new SearchView({ el: $("#search_container") });
// </script>

// <script type="text/template" id="search_template">
//     <label>Search</label>
//     <input type="text" id="search_input" />
//     <input type="button" id="search_button" value="Search" />
// </script>