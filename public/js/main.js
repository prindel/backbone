var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "about"             : "about",       

        "teams"	            : "list",
        "teams/page/:page"	: "list",
        "teams/add"         : "addTeam",
        "teams/:id"         : "teamDetails", 
        
        "match"             : "matchups",       

        "players"           : "listPlayers",
        "Samsung"           : "Samsung",        
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

    matchups: function (rank) {       
        var teamList = new MatchTeamCollection();         
        teamList.fetch({success: function () {                
            $('#content').html(new MatchupsListView({model: teamList}).el);
        }});        
    },


    //////////////////////////////////////
    list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var teamList = new TeamCollection();
        teamList.fetch({success: function(){
            $("#content").html(new TeamListView({model: teamList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    teamDetails: function (id) {
        var team = new Team({_id: id});
        console.log(team)
        team.fetch({success: function(){
            $("#content").html(new TeamView({model: team}).el);
        }});
        this.headerView.selectMenuItem();
    },    

    addTeam: function() {
        var team = new Team();
        $('#content').html(new TeamView({model: team}).el);
        this.headerView.selectMenuItem('add-menu');
    },

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    },

    //////////////////////////////////////

    listPlayers: function(page) {    
        var p = page ? parseInt(page, 10) : 1;
        var playerList = new PlayerCollection();
        playerList.fetch({success: function(){
            $("#content").html(new PlayerListView({model: playerList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    Samsung: function(page) {    
        var p = page ? parseInt(page, 10) : 1;
        var playerList = new PlayerCollection();
        playerList.fetch({success: function(){
            $("#content").html(new PlayerListView({model: playerList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },
});

utils.loadTemplate(
    ['HomeView', 'HeaderView', 'TeamView', 'TeamListItemView', 'AboutView',
    'PlayerView','PlayerListItemView', 'MatchupsListItemView']
    , function() {
            app = new AppRouter();
            Backbone.history.start();
});