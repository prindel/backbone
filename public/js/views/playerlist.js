window.PlayerListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var players = this.model.models;
        var len = players.length;
        var startPos = (this.options.page - 1) * 9;
        var endPos = Math.min(startPos + 9, len);

        $(this.el).html('<ul class="thumbnails"></ul>');

        for (var i = startPos; i < endPos; i++) {
            $('.thumbnails', this.el).append(new PlayerListItemView({model: players[i]}).render().el);
        }

        $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

window.PlayerListItemView = Backbone.View.extend({

    tagName: "li",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});