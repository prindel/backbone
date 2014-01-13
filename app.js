var express = require('express'),
    path = require('path'),
    http = require('http'),
    team = require('./routes/teams');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3001);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'public')));
});

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/teams', team.findAll);
app.get('/teams/:id', team.findById);
app.post('/teams', team.addTeam);
app.put('/teams/:id', team.updateTeam);
app.delete('/teams/:id', team.deleteTeam);

//app.get('/teams/match/:rank', team.findByRank);
app.get('/match', team.findByRank);

app.get('/players', team.findPlayers);
app.get('/players/:name', team.findByTeam);
app.post('/players', team.addPlayer);   
app.put('/players/:name', team.updatePlayer);
app.delete('/players/:name', team.deletePlayer);



var fs = require('fs');

app.post('/upload', function (req, res) {
    var tempPath = req.files.file.path,
        targetPath = path.resolve('./uploads/image.png');
    if (path.extname(req.files.file.name).toLowerCase() === '.png') {
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
            console.log("Upload completed!");
        });
    } else {
        fs.unlink(tempPath, function () {
            if (err) throw err;
            console.error("Only .png files are allowed!");
        });
    };
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
