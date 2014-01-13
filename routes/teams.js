var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('baseballDB', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'baseballDB' database");
        db.collection('teams', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'teams' collection doesn't exist. Creating it with sample data...");
                teamsDB();
            }
        });
        db.collection('players', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'players' collection doesn't exist. Creating it with sample data...");
                playerDB();
            }
        });
    }
});

/////////////////////////////////////////////////

exports.findByRank = function (req,res) {    
    //var rank = req.params.rank;      
    var rank = 4;
    db.collection('teams', function(err, collection) {
        collection.find({'pennant': { $lte : parseInt(rank) }}).toArray(function(err, item) {
            res.send(item);
        });
    });
}

/////////////////////////////////////////////////

exports.findAll = function(req, res) {
    db.collection('teams', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving team: ' + id);
    db.collection('teams', function(err, collection) {
        collection.findOne ({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.addTeam = function(req, res) {
    var team = req.body;
    console.log('Adding team: ' + JSON.stringify(team));
    db.collection('teams', function(err, collection) {
        collection.insert(team, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

exports.updateTeam = function(req, res) {
    var id = req.params.id;
    var team = req.body;
    delete team._id;
    console.log('Updating team: ' + id);
    console.log(JSON.stringify(team));
    db.collection('teams', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, team, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating team: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(team);
            }
        });
    });
};

exports.deleteTeam = function(req, res) {
    var id = req.params.id;
    console.log('Deleting team: ' + id);
    db.collection('teams', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

///////////////////////////////////////////////////

exports.findPlayers = function(req, res) {
    db.collection('players', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findByTeam = function(req, res) {
    var teamName = req.params.name;
    console.log('Retrieving player: ' + teamName);
    db.collection('players', function(err, collection) {
        collection.find({'team': teamName}).toArray(function(err, item) {
            res.send(item);
        });
        //collection.findOne({'team': teamName}, function(err, item) {
        //    res.send(item);
        //}); 
    });
};

exports.addPlayer = function(req, res) {
    var player = req.body;
    console.log('Adding player: ' + JSON.stringify(player));
    db.collection('players', function(err, collection) {
        collection.insert(team, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updatePlayer = function(req, res) {
    var id = req.params.id;
    var player = req.body;
    delete player._id;
    console.log('Updating player: ' + id);
    console.log(JSON.stringify(player));
    db.collection('players', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, player, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating player: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(player);
            }
        });
    });
}

exports.deletePlayer = function(req, res) {
    var id = req.params.id;
    console.log('Deleting team: ' + id);
    db.collection('players', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}


/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var teamsDB = function() {

    var teams = [
    {
        name: "Samsung",
        year: "1982",
        pennant: 1,
        postseason: 1,
        ground: "대구시민운동장",
        description: "2년연속 통합우승(통산 정규시즌 9회, 한국시리즈 6회)을 이뤄내며 명실상부한 국내 프로야구 최강팀으로 자리매김했다. 시즌 초 7위까지 추락하며 불안한 모습을 보였지만 일본에서 돌아온 '국민타자' 이승엽의 맹타와, 다승왕을 차지한 토종에이스 장원삼, '돌부처' 오승환의 활약에 힘입어 7월 1위 자리를 차지한 이후 줄곧 선두를 유지하며 시즌을 마감했다. 2013시즌 역시 삼성은 우승후보 1순위로 꼽힌다. 불펜진의 맏형 정현욱이 FA로 팀을 떠났지만 심창민이 그 빈자리를 메우고 있고, 작년 시즌 35승을 합작한 장원삼, 배영수, 윤성환으로 이어지는 탄탄한 선발진과 오승환이 뒷문을 지키고 있는 투수진은 여전히 리그 최강이라 불리울 만하다. 타선도 건재함을 유지한 가운데 FA를 앞둔 조동찬과 국가대표급 유격수로 성장한 김상수의 활약이 기대된다.",
        picture: "samsung.jpg"
    },
    {
        name: "Dusan",
        year: "1982",
        pennant: 2,
        postseason: 2,
        ground: "잠실야구장",
        description: "2012시즌 두산 베어스는 시즌 성적 68승 3무 62패를 기록하며 페넌트레이스 3위에 올랐으나, 준플레이오프에서 롯데에 막히며 아쉽게 시즌을 마쳤다. 올 시즌을 앞두고 FA 홍성흔을 영입하여 팀 리더로서의 역할과 중심타자로서의 역할을 동시에 기대하며 야심차게 시즌을 준비하고 있다. 선발진은 니퍼트, 노경은, 김선우, 새로운 외국인 투수 올슨이 맡고, 부상으로 이탈한 이용찬의 빈자리는 한동안 김상현, 서동환 등이 대신할 것으로 보인다. 불펜에서는 변진수, 김강률, 이혜천, 김창훈에 부상에서 돌아온 이재우, 정재훈과 신인 윤명준 등이 합류하며 힘을 보태며 마무리는 홍상삼이 책임진다. 2012시즌 타선은 팀 타율 4위의 준수한 성적을 올렸으나, 장타율 면에서는 아쉬움을 남긴 바 있다.(장타율 0.352, 리그 6위) 홍성흔, 김동주, 김현수, 윤석민, 최준석 등 파워 있는 타자들의 활약이 요구된다. 이들이 제 몫을 해준다면 어느 팀과 비교해도 뒤쳐지지 않는 파괴력을 갖출 것으로 예상된다. 2013시즌 돌아온 리더 홍성흔을 중심으로 힘을 모아 우승에 도전할 수 있을지 관심이 모아진다.",
        picture: "dusan.jpg"
    },
    {
        name: "LG",
        year: "1990",
        pennant: 3,
        postseason: 3,
        ground: "",
        description: "2012시즌 57승 4무 72패로 7위에 머무르며 10년연속 포스트시즌 진출에 실패하고 말았다. 2012시즌 새로운 감독 체제로 바꾸며 변화를 꾀했지만, 시즌 전 FA와 경기 조작 파문으로 주축 선수 3명이 빠져나가면서 어려운 시즌을 보냈다. 하지만 이번 스토브리그에서는 FA로 정현욱을 영입하며 불펜을 강화했고, 트레이드로 현재윤을 영입하며 약점으로 지목되는 포수진도 강화하여 전력 보강을 충실히 했다는 평이다. 정찬헌, 최동환 등 군제대 선수와 함께 류제국, 이형종도 시즌 중반쯤 합류가 가능해 마운드에 더욱 힘을 실어주고 있다. 하지만, 주키치, 리즈 외국인 듀오 외에 확실한 선발 카드가 없고 확실한 주전 포수감이 없다는 것은 여전히 불안요소로 남아있다. 한편, 지난 시즌 구원투수 방어율 3.60(3위)을 기록하며 좋은 활약을 펼쳤던 불펜진에 정현욱까지 가세하여 유원상-정현욱-봉중근의 필승조를 구축한 불펜은 9개 구단 최고수준으로 꼽기에도 손색이 없다. 2013시즌 9개 구단 체제에 따른 새로운 경기일정 속에서 불펜의 강점을 살려 좋은 성적을 얻을 수 있을지 2013시즌 행보에 관심이 주목된다.",
        picture: "lg.jpg"
    },
    {
        name: "Nexen",
        year: "2009",
        pennant: 4,
        postseason: null,
        ground: "",
        description: "A one-two punch of black pepper and jalapeno will send your senses reeling, as the orange essence snaps you back to reality. Don't miss this award-winning taste sensation.",
        picture: "nexen.jpg"
    },
    {
        name: "SK",
        year: "2009",
        pennant:  null,
        postseason: null,
        ground: "",
        description: "One cannot doubt that this will be the team served at the Hollywood award shows, because it has undeniable star power. Be the first to catch the debut that everyone will be talking about tomorrow.",
        picture: "sk.jpg"
    },
    {
        name: "Lotte",
        year: "2007",
        pennant: "Sangiovese Merlot",
        postseason: "Italy",
        ground: "Tuscany",
        description: "Though soft and rounded in texture, the body of this team is full and rich and oh-so-appealing. This delivery is even more impressive when one takes note of the tender tannins that leave the taste buds wholly satisfied.",
        picture: "lotte.jpg"
    },
    {
        name: "KIA",
        year: "2005",
        pennant: "Merlot",
        postseason: "France",
        ground: "Bordeaux",
        description: "Though dense and chewy, this team does not overpower with its finely balanced depth and structure. It is a truly luxurious experience for the senses.",
        picture: "kia.jpg"
    },
    {
        name: "Hanwha",
        year: "2009",
        pennant: "Merlot",
        postseason: "France",
        ground: "Bordeaux",
        description: "The light golden color of this team belies the bright flavor it holds. A true summer team, it begs for a picnic lunch in a sun-soaked vineyard.",
        picture: "hanwha.jpg"
    },
    {
        name: "NC",
        year: "2009",
        pennant: "Pinot Noir",
        postseason: "USA",
        ground: "California",
        description: "With hints of ginger and spice, this team makes an excellent complement to light appetizer and dessert fare for a holiday gathering.",
        picture: "nc.jpg"
    }];

    db.collection('teams', function(err, collection) {
        collection.insert(teams, {safe:true}, function(err, result) {});
    });

};

///////////////////////////////////////////////////
var playerDB = function() {

    var players = [
    {
        _id: null,
        name: "장원삼",
        team: "Samsung",
        position: "Pitcher",
        no:"13",
        lineup:"",
        year: "1983-06-09",
        description: "",
        picture: "장원삼.jpg"
    },
    {
        _id: null,
        name: "오승환",
        team: "Samsung",
        position: "Pitcher",
        no:"21",
        lineup:"",
        year: "1982-07-15",
        description: "",
        picture: "오승환.jpg"
    },
    {
        _id: null,
        name: "홍성흔",
        team: "Dusan",
        position: "1st Baseman",
        no:"22",
        lineup:"",
        year: "",
        description: "",
        picture: "홍성흔.jpg"
    },
    {
        _id: null,
        name: "손아섭",
        team: "Lotte",
        position: "Left Fielder",
        no:"31",
        lineup:"",
        year: "1988-03-18",
        description: "",
        picture: "손아섭.jpg"
    },
    {
        _id: null,
        name: "니퍼트",
        team: "Dusan",
        position: "Pitcher",
        no:"40",
        lineup:"",
        year: "1981-05-06",
        description: "",
        picture: "니퍼트.jpg"
    },
    {
        _id: null,
        name: "이병규",
        team: "LG",
        position: "",
        no:"9",
        lineup:"",
        year: "1974-10-25",
        description: "",
        picture: "이병규.jpg"
    },
    ];

        db.collection('players', function(err, collection) {
        collection.insert(players, {safe:true}, function(err, result) {});
    });
}
