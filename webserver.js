'use strict';

const express = require('express');
const jquery = require('jquery');
const tabmenu = require('./public/js/tabmenu');
require("./private/sqlcon.js");
const chart = require('chart.js');
const favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require("fs");
var redirectToHttps = require('express-http-to-https').redirectToHTTPS();
//DEBUG SWITCH
const debug = true;
//
require('isomorphic-fetch');
// Constants
const PORT = 3000;
const HOST = '127.0.0.1';
const http = require('http');
const https = require('https');

// App
const app = express();



function writeLog(text) {
    var date = new Date();
    var line = date.toString() + ": " + text + "\r\n";
    console.log(line);
    fs.appendFile("logs/server_log.txt", line, (err) => {
        if (err) console.log(err);
    });
}


app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({ limit: '5000mb' }));

app.use(favicon(__dirname + '/public/img/favicon.ico'));

var options = {
    key: fs.readFileSync('./private/_.ltdstats.com_private_key.key'),
    cert: fs.readFileSync('./private/ltdstats.com_ssl_certificate_chain.cer')
};
var sslPort = 443;
app.use(redirectToHttps);


//mysql
/*
mysqlcon.connect(function (err) {
    if (err) writeLog(err);
    writeLog("Connected to MySQL");
});
*/
//routes

app.get('/profile', (req, res) => {
    res.render('profile', {
        title: 'Profile'
    });
    if(debug) writeLog("/profile");
});

app.get('/index.html', (req, res) => {
    res.render('index', {
        title: 'Home'
    });
    if (debug) writeLog("/index");
});

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    });
    if (debug) writeLog("/");
});

/*
app.get('/tournaments', (req, res) => {
    res.render('tournaments', {
        title: 'Tournaments'
    })
});
*/

app.get('/stats', (req, res) => {
    res.render('stats', {
        title: 'Stats'
    });
    if (debug) writeLog("/stats");
});

app.get('/stats/player', (req, res) => {
    res.render('stats', {
        title: 'Player Stats'
    });
    if (debug) writeLog("/stats/player");
});

app.get('/stats/overall', (req, res) => {
    res.render('stats', {
        title: 'Overall Stats'
    });
    if (debug) writeLog("/stats/overall");
});

app.get('/stats/daily', (req, res) => {
    res.render('stats', {
        title: 'Daily Stats'
    });
    if (debug) writeLog("/stats/daily");
});

app.get('/stats/patch', (req, res) => {
    res.render('stats', {
        title: 'Patch Stats'
    });
    if (debug) writeLog("/stats/patch");
});

app.get('/ladder', (req, res) => {
    res.render('ladder', {
        title: 'Offical Ladder'
    });
    if (debug) writeLog("/ladder");
});

app.get('/unlucky', (req, res) => {
    res.render('unluckytop', {
        title: 'Unlucky top 20'
    });
    if (debug) writeLog("/unlucky");
});

app.get('/builder', (req, res) => {
    res.render('builder', {
        title: 'Builder'
    });
    if (debug) writeLog("/builder");
});

app.get('/units', (req, res) => {
    res.render('units', {
        title: 'Units'
    });
    if (debug) writeLog("/units");
});

app.get('/replay', (req, res) => {
    res.render('replay', {
        title: 'Replay'
    });
    if (debug) writeLog("/replay");
});

app.get('/gameview', (req, res) => {
    res.render('gameviewer', {
        title: 'View Game'
    });
    if (debug) writeLog("/gameview");
});

app.get('/compare', (req, res) => {
    res.render('compare', {
        title: 'Compare'
    });
    if (debug) writeLog("/compare");
});

app.get('/howto', (req, res) => {
    res.render('guides/general/howto', {
        title: 'Legion TD 2 - Gameplay Guide'
    });
    if (debug) writeLog("/howto");
});

//Guides

app.get('/guides', (req, res) => {
    var guide = req.query.guide;
    if (debug) writeLog("/guides "+guide+"");
    switch (guide) {
        //element
        case "elementbasics":
            res.render('guides/element/basics', {
                title: 'Element Basics Guide'
            });
            break;
        case "wadiselement":
            res.render('guides/element/wadi', {
                title: 'Wadi\'s Element Guide'
            });
            break;
        case "akitoselement":
            res.render('guides/element/akitoselement', {
                title: 'Akitos Element Guide'
            });
            break;
        case "bluejinelement":
            res.render('guides/element/bluejinele', {
                title: 'Bluejin\'s Element Guide'
            });
            break;
        case "crowleyelement":
            res.render('guides/element/crowleyelement', {
                title: 'Builds for New Players - Element'
            });
            break;
        //grove
        case "crowleygrove":
            res.render('guides/grove/crowleygrove', {
                title: 'Builds for New Players - Grove'
            });
            break;
        case "theratedrsgrove":
            res.render('guides/grove/theratedr', {
                title: 'TheRatedR´s Grove Guide'
            });
            break;
        case "isotropsgrove":
            res.render('guides/grove/isotropvideo', {
                title: 'Isotrop´s & Weilbockt´s Grove Guide'
            });
            break;
        case "hazetechgrove":
            res.render('guides/grove/hazetechgrove', {
                title: 'Haze_Tech: How to be a Grove Main'
            });
            break;
        //forsaken
        case "crowleyforsaken":
            res.render('guides/forsaken/crowleyforsaken', {
                title: 'Builds for New Players - Forsaken'
            });
            break;
        case "akitosforsaken":
            res.render('guides/forsaken/akitosforsaken', {
                title: 'Akitos Forsaken Guide'
            });
            break;
        case "blacktideforsaken":
            res.render('guides/forsaken/blacktideforsaken', {
                title: 'Blacktide´s Forsaken Guide'
            });
            break;
        case "isotropsforsaken":
            res.render('guides/forsaken/isotropforsaken', {
                title: 'Isotrop´s & Weilbockt´s Forsaken Guide'
            });
            break;
        //mech
        case "crowleymech":
            res.render('guides/mech/crowleymech', {
                title: 'Builds for New Players - Mech'
            });
            break;
        case "cornepsmech":
            res.render('guides/mech/cornep', {
                title: 'Cornep´s Mech Guide'
            });
            break;
        case "isotropsmech":
            res.render('guides/mech/isotropmech', {
                title: 'Isotrop´s & Weilbockt´s Mech Guide'
            });
            break;
        case "roshkatulsmech":
            res.render('guides/mech/roshkatulsmech', {
                title: 'OP Mech, get 2k+ elo easily, 80-90% winrate'
            });
            break;
        //atlantean
        case "sleepwiththefishes":
            res.render('guides/atlantean/sleepwiththefishes', {
                title: 'Guide build order for Classic Atlantean'
            });
            break;
        case "crowleyatlantean":
            res.render('guides/atlantean/crowleyatlantean', {
                title: 'Builds for New Players - Atlantean'
            });
            break;
        //nomad
        case "crowleynomad":
            res.render('guides/nomad/crowleynomad', {
                title: 'Builds for New Players - Nomad'
            });
            break;
        //shrine
        case "crowleyshrine":
            res.render('guides/shrine/crowleyshrine', {
                title: 'Builds for New Players - Shrine'
            });
            break;
        //mastermind
        case "bonnyopeners":
            res.render('guides/mastermind/openers', {
                title: 'Mastermind Openers'
            });
            break;
        case "zitronenrittersmm":
            res.render('guides/mastermind/zitronenritter', {
                title: 'Zitronenritter´s Mastermind Guide'
            });
            break;
        case "roshkatulmm":
            res.render('guides/mastermind/roshkatulmm', {
                title: 'Roshkatul´s Low Quality Guide: How to pick your mastermind roll'
            });
            break;
        case "bonnybutcher":
            res.render('guides/mastermind/butcher', {
                title: 'Bonny´s Aura-Guide: Butcher'
            });
            break;
        case "bonnywhitemane":
            res.render('guides/mastermind/whitemane', {
                title: 'Bonny´s Aura-Guide: Whitemane'
            });
            break;
        case "bonnyaps":
            res.render('guides/mastermind/aps', {
                title: 'Bonny´s Aura-Guide: APS'
            });
            break;
        case "bonnyhero":
            res.render('guides/mastermind/hero', {
                title: 'Bonny´s Aura-Guide: Hero'
            });
            break;
        case "bonnyleviathan":
            res.render('guides/mastermind/leviathan', {
                title: 'Bonny´s Aura-Guide: Leviathan'
            });
            break;
        case "bonnylioness":
            res.render('guides/mastermind/lioness', {
                title: 'Bonny´s Aura-Guide: Lioness'
            });
            break;
        case "bonnyoceantemplar":
            res.render('guides/mastermind/oceantemplar', {
                title: 'Bonny´s Aura-Guide: Ocean Templar'
            });
            break;
        case "bonnysorcerer":
            res.render('guides/mastermind/sorcerer', {
                title: 'Bonny´s Aura-Guide: Sorcerer'
            });
            break;
        case "bonnystarcaller":
            res.render('guides/mastermind/starcaller', {
                title: 'Bonny´s Aura-Guide: Starcaller'
            });
            break;
        case "bonnyvampire":
            res.render('guides/mastermind/vampire', {
                title: 'Bonny´s Aura-Guide: Vampire'
            });
            break;
        case "synergies":
            res.render('guides/mastermind/synergies', {
                title: 'Mastermind Synergies'
            });
            break;
        //general
        case "countersuicide":
                res.render('guides/general/countersuicide', {
                    title: 'Suicide/NoBuild Counter Guide'
                });
                break;
        case "howto":
                res.render('guides/general/howto', {
                    title: 'Legion TD 2 - Gameplay Guide'
                });
                break;
        case "bonnysplit":
            res.render('guides/general/splitting', {
                title: 'Bonny´s Basic Splitting Guide'
            });
            break;
        case "bonnyaura":
            res.render('guides/general/auras', {
                title: 'Bonny´s General Aura Guide'
            });
            break;
        case "wavecounters":
            res.render('guides/general/wavecounters', {
                title: 'Wave Counter List'
            });
            break;
        case "spelldmg":
            res.render('guides/general/spelldmg', {
                title: 'Legion TD2 mechanics: Spell Damage'
            });
            break;
        case "spelldamage":
            res.render('guides/general/spelldamage', {
                title: 'Spell Damage & Mana Gain'
            });
            break;
        case "roshkatulstips":
            res.render('guides/general/roshkatultips', {
                title: 'Roshkatul´s 7 Tips for new players'
            });
            break;
        case "roshmercs":
            res.render('guides/general/roshmercs', {
                title: 'Roshkatul´s Individual Mercenary Guides'
            });
            break;
        case "legionspells":
            res.render('guides/general/akitosspells', {
                title: 'Akitos Legion Spells Guide'
            });
            break;
        case "simplestarter":
            res.render('guides/general/simplestarter', {
                title: 'Teirdel´s Simple Starter Guide'
            });
            break;
        case "2v2":
            res.render('guides/general/2v2', {
                title: 'Cornep´s Guides: 2v2 Guide'
            });
            break;
        case "howtoimprove":
            res.render('guides/general/improve', {
                title: 'How to improve as a new Player'
            });
            break;
        case "thekraken":
            res.render('guides/general/kraken', {
                title: 'Cornep´s Guides: The Kraken'
            });
            break;
        case "lfsgameguide":
            res.render('guides/general/lfgameguide', {
                title: 'LForward´s Gameguide'
            });
            break;
        case "tilt":
            res.render('guides/general/tilt', {
                title: 'Cornep´s Guides: Taming the Tilt'
            });
            break;
        case "whattosend":
            res.render('guides/general/whattosend', {
                title: 'Cornep´s Guides: What to send'
            });
            break;
        case "sendingguide":
            res.render('guides/general/sendingguide', {
                title: 'Niklas Guide: Sending in Legion TD2'
            });
            break;
        case "sendvssave":
            res.render('guides/general/sendvssave', {
                title: 'Income sending vs Saving'
            });
            break;
        case "new":
            res.render('guides/createguide', {
                title: 'Create a guide'
            });
            break;
        case "upload":
            if (debug) writeLog("/guides UPLOAD");
            var preamble = req.query.preamble;
            var waves = req.query.waves;
            var author = req.query.author;
            var version = req.query.version;
            var section = req.query.section;
            var title = req.query.title;
            /*var url = 'http://127.0.0.1:3666/guides/upload?waves=' + waves + '&author=' + author + '&version=' + version + '&section=' + section + '&title=' + title + '&preamble=' + preamble;
            if (url.includes("<script") || url.includes("<button") || url.includes("onclick")) {
                res.send("bad url");
            }
            else {*/
                writeLog("sending request---");
            http.get('http://127.0.0.1:3666/guides/uploadGuide?waves=' + waves + '&author=' + author + '&version=' + version + '&section=' + section + '&title=' + title + '&preamble=' + preamble, (resp) => {
                    writeLog("resp");
                    let data = '';

                    // A chunk of data has been recieved.
                    resp.on('data', (chunk) => {
                        data += chunk;
                    });

                    // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    writeLog(data);
                        res.json(data);
                    });

                }).on("error", (err) => {
                    writeLog("Error: " + err.message);
                });
            //}
            break;
        default:
            writeLog("guide default: "+guide);
            res.render('guides/searchguide', {
                title: 'Guides'
            });
            if (debug) writeLog("/guides DEFAULT");
            break;
    }
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
    if (debug) writeLog("/about");
});

app.get('/cookies', (req, res) => {
    res.render('cookies', {
        title: 'Cookie Policies'
    });
    if (debug) writeLog("/cookies");
});

app.get('/faq', (req, res) => {
    res.render('faq', {
        title: 'FAQ'
    });
    if (debug) writeLog("/faq");
});

app.get('/feedback', (req, res) => {
    res.render('feedback', {
        title: 'Feddback & Bug Report'
    });
    if (debug) writeLog("/feedback");
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    });
    if (debug) writeLog("/help");
});

app.get('/help/profile', (req, res) => {
    res.render('help/helpprofile', {
        title: 'Help - Profile'
    });
    if (debug) writeLog("/help/profile");
});

app.get('/help/ladder', (req, res) => {
    res.render('help/helpladder', {
        title: 'Help - Ladder'
    });
    if (debug) writeLog("/help/ladder");
});

app.get('/help/replay', (req, res) => {
    res.render('help/helpreplay', {
        title: 'Help - Replay'
    });
    if (debug) writeLog("/help/replay");
});

app.get('/help/compare', (req, res) => {
    res.render('help/helpcompare', {
        title: 'Help - Compare'
    });
    if (debug) writeLog("/help/compare");
});

app.get('/help/builder', (req, res) => {
    res.render('help/helpbuilder', {
        title: 'Help - Builder'
    });
    if (debug) writeLog("/help/builder");
});

app.get('/help/units', (req, res) => {
    res.render('help/helpunits', {
        title: 'Help - Units'
    });
    if (debug) writeLog("/help/units");
});

app.get('/help/guides', (req, res) => {
    res.render('help/helpguides', {
        title: 'Help - Guides'
    });
    if (debug) writeLog("/help/guides");
});

app.get('/help/statistics', (req, res) => {
    res.render('help/helpstatistics', {
        title: 'Help - Statistics'
    });
    if (debug) writeLog("/help/statistics");
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact'
    });
    if (debug) writeLog("/contact");
});

app.get('/lihl', (req, res) => {
    res.render('lihl', {
        title: 'LIHL'
    });
    if (debug) writeLog("/lihl");
});

app.get('/streams', (req, res) => {
    res.render('streams', {
        title: 'Featured Streams'
    });
    if (debug) writeLog("/streams");
});

app.get('/livegame', (req, res) => {
    res.render('livegame', {
        title: 'Livegame'
    });
    if (debug) writeLog("/livegame");
});

app.get('/donate', (req, res) => {
    res.render('donate', {
        title: 'Donate'
    });
    if (debug) writeLog("/donate");
});

app.get("/quiz", (req, res) => {
    res.render('quiz', {
        title: 'Quiz'
    });
    if (debug) writeLog("/quiz");
});
//non ltd related

app.get('/ascension', (req, res) => {
    res.render('ascension/guides', {
        title: 'Project Ascension Guides'
    });
    if (debug) writeLog("/ascension");
});














/*
app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login'
    })
});

app.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register',
        mongoCon: mongoConnection
    })
});

//sql abfragen
app.get('/users/checkname', (req, res) => {
    
        dbo.collection("users").find(query).toArray(function (err, result) {
            if (err) console.log(err);
            res.json(result);
            db.close();
        });
});

*/

app.get('/sql/getGuides', (req, res) => {
    http.get('http://127.0.0.1:3666/guides?action=list', (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            res.json(data);
        });

    }).on("error", (err) => {
        writeLog("Error: " + err.message);
    });

});

app.get('/quiz/getScores', (req, res) => {
    http.get('http://127.0.0.1:3666/quiz/getScores?', (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            res.json(data);
        });

    }).on("error", (err) => {
        writeLog("Error: " + err.message);
    });

});

app.get('/sql/getLivegame', (req, res) => {
    var pname = req.query.playername;
    http.get('http://127.0.0.1:3666/db/livegames?myobj=' + pname, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            if (data) res.json(data);
            else res.send("no data");
        });

    }).on("error", (err) => {
        writeLog("Error: " + err.message);
    });

});

app.get('/api/getLivegames', (req, res) => {
    http.get('http://127.0.0.1:3666/db/livegames?t', (resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            if (data) {
                res.json(data); 
            }
            else res.send("no data");
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

});




app.get('/sql/stats/wavegamesended', (req, res) => {
    var version = req.query.version;
    if (version.substring(0, 1) === "v") version = version.substring(1);
    writeLog('http://127.0.0.1:3666/stats/patch?db=rankedGames_' + version.substring(0,3) + '&type=gameendingwave&version=' + version);
    http.get('http://127.0.0.1:3666/stats/patch?db=rankedGames_' + version.substring(0,3) + '&type=gameendingwave&version=' + version, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            if (data) res.json(data);
            else res.send("no data");
        });

    }).on("error", (err) => {
        writeLog("Error: " + err.message);
    });

});


app.get('/mongo/stats/legions/winrate', (req, res) => {
    var version = req.query.version;
    var minElo = req.query.minelo;
    if (version.substring(0, 1) === "v") version = version.substring(1);
    if(parseInt(version.substring(0, 1))<3) var queryurl = 'http://127.0.0.1:3666/stats/patch?db=rankedGames_';
    else queryurl = 'http://127.0.0.1:3666/stats/patch?db=classicGames_';
    console.log(version);
    console.log(minelo);
    writeLog( queryurl+ version.substring(0, 3) + '&type=pickwinchances&version=' + version + "&minelo=" + minElo);
    http.get( queryurl + version.substring(0, 3) + '&type=pickwinchances&version=' + version + "&minelo=" + minElo, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            if (data) res.json(data);
            else res.send("no data");
        });

    }).on("error", (err) => {
        writeLog("Error: " + err.message);
    });

});

/*

app.get('/sql/ladder', (req, res) => {
    mysqlcon.query("SELECT * FROM ltdstats.player order by elo desc;", function (err, result, fields) {
        if (err) console.log(err);
        res.json(result);
    });
});

app.get('/sql/games', (req, res) => {
    mysqlcon.query("SELECT * FROM ltdstats.games order by id desc;", function (err, result, fields) {
        if (err) console.log(err);
        res.json(result);
    });
});

app.get('/sql/lobbies', (req, res) => {
    mysqlcon.query("SELECT * FROM ltdstats.lobby order by idlobby desc;", function (err, result, fields) {
        if (err) console.log(err);
        res.json(result);
    });
});

*/
//ipstack

app.get('/getLang', (req, res) => {
    var ip = (req.headers['x-forwarded-for'] || '').split(',').pop() ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    if (ip.substring(8).includes(":")) {
        //ipv6
        writeLog("ipv6:");
        writeLog(ip);
    }
    else {
        //ipv4
        writeLog("ipv4");
        ip = ip.substring(8);
    }
    http.get('http://api.ipstack.com/' + ip + '?access_key=' + meinKey3, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            data = data.split(",");
            res.send(data[5]);
        });

    }).on("error", (err) => {
        writeLog("Error: " + err.message);
    });

});

//mongodb
app.get('/mongo/getFighterStats', (req, res) => {
    var fighterName = req.query.fightername;
    var minElo = req.query.elo;
    var targetVersion = req.query.version;
    var gamecheck ={};
    gamecheck.part1 = parseInt(targetVersion.substring(0,1));
    gamecheck.part2 = parseInt(targetVersion.substring(2,3));
    var gametype = req.query.gametype;
    if(gamecheck.part1 > 2){
        var request_url = "http://127.0.0.1:3666/stats/patch?type=fighterstats&version="+targetVersion+"&fightername="+fighterName+"&elo="+minElo+"&gametype="+gametype;
    }
    else{
        request_url = "http://127.0.0.1:3666/stats/patch?type=fighterstats&version="+targetVersion+"&fightername="+fighterName+"&elo="+minElo;
    }
    
    writeLog(request_url);
    http.get(request_url, (resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            if (data) res.json(data);
            else res.send("no data");
        });

    }).on("error", (err) => {
        writeLog("Error: " + err.message);
    });
});

app.get('/mongo/getGamesCount', (req,res) => {
    var targetDb = req.query.db;
    var request_url = "http://127.0.0.1:3666/count?targetdb="+targetDb;
    http.get(request_url, (resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            if (data) res.json(data);
            else res.send("no data");
        });

    }).on("error", (err) => {
        writeLog("Error: " + err.message);
    });
});

app.get('/mongo/getGames', (req, res) => {
    var type = req.query.type;
    var target_db = req.query.db;
    var myLimit = req.query.limit;
    var formating = req.query.formating;
    var request_url = "";
    switch (type) {
        case "id":
            var search_id = req.query.id;
            request_url = "http://127.0.0.1:3666/db/games?action=search&db=" + target_db + "&type=id&limit=" + myLimit + "&formating=" + formating + "&id=" + search_id;
            break;
        case "playername":
            var search_name = req.query.name;
            request_url = "http://127.0.0.1:3666/db/games?action=search&db=" + target_db + "&type=playername&limit=" + myLimit + "&formating=" + formating + "&name=" + search_name;
            break;
        case "version":
            var search_version = req.query.version;
            request_url = "http://127.0.0.1:3666/db/games?action=search&db=" + target_db + "&type=version&limit=" + myLimit + "&formating=" + formating + "&version=" + search_version;
            break;
        case "date":
            var search_from = req.query.from;
            var search_to = req.query.to;
            request_url = "http://127.0.0.1:3666/db/games?action=search&db=" + target_db + "&type=date&limit=" + myLimit + "&formating=" + formating + "&from=" + search_from + "&to=" + search_to;
            break;
        //http://ltdstats.com/mongo/getGames?type=all&db=rankedGames
        case "all":
            request_url = "http://127.0.0.1:3666/db/games?action=search&db=" + target_db + "&type=all&limit=0&formating=none";
            break;
        case "duoplayer":
            //http://ltdstats.com/mongo/getGames?type=duoplayer&db=rankedGames3.1&limit=0&formating=none&name1=Egekaer&name2=Haviland%20Tuf
            var name1 = req.query.name1;
            var name2 = req.query.name2;
            request_url = "http://127.0.0.1:3666/db/games?action=search&db=" + target_db + "&type=duoplayer&name1="+name1+"&name2="+name2+"&formating=none&limit=0";
            break;

    }
    if (request_url !== "") {
        http.get(request_url, (resp) => {
            let data = '';
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                if (data) res.json(data);
                else res.send("no data");
            });

        }).on("error", (err) => {
            writeLog("Error: " + err.message);
        });
    }
    
});

app.get('/api/getPlayerElo', (req, res) => {
    var playername = req.query.playername;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({
            query: '{player(name:"' + playername + '"){name,statistics}}'
        })
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else {
            var error = new Error(response.statusText);
            error.response = response;
            writeLog(error);
            console.log(error);
        }
    }).then(function (data) {
        //player object an frontend
        res.json(data.data);
    }).catch(function (err) {
        writeLog(err);
    });
});









//api abfragen

app.get('/api/playerElo', (req, res) => {
    var playername = req.query.playername;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({
            query: '{player(name:"' + playername + '"){name,statistics}}'
        })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            data.data.player.statistics = JSON.parse(data.data.player.statistics);

            http.get('http://127.0.0.1:3666/db/livegames?myobj=' + playername, (resp) => {
                let result = '';

                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    result += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    if (!result) {
                        let livegame = JSON.parse(result);
                        console.log(result);
                        res.render("elo", {
                            meineElo: data.data.player.statistics.overallElo,
                            title: "Elo",
                            playername: data.data.player.name,
                            players: livegame.players,
                            elos: livegame.elos
                        });
                    }
                    else {
                        res.render("elo", {
                            meineElo: data.data.player.statistics.overallElo,
                            title: "Elo",
                            playername: data.data.player.name,
                            players: "not ingame",
                            elos: "not ingame"
                        });
                    }
                });

            }).on("error", (err) => {
                writeLog("Error: " + err.message);
            });
        });
});

app.get('/api/playerInfo', (req, res) => {
    var playername = req.query.playername;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({
            query: '{player(name:"' + playername + '"){name,statistics}}'
        })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            data.data.player.statistics = JSON.parse(data.data.player.statistics);

            http.get('http://127.0.0.1:3666/db/livegames?myobj=' + playername, (resp) => {
                let result = '';

                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    result += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    if (!result) {
                        let livegame = JSON.parse(result);
                        console.log(result);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end("Elo: "+data.data.player.statistics.overallElo);
                    }
                    else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end("Elo: "+data.data.player.statistics.overallElo);
                    }
                });

            }).on("error", (err) => {
                writeLog("Error: " + err.message);
            });
        });
});


app.get('/api/units', (req, res) => {
    var unitname = req.query.unitname;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({
            query: '{unit(name: "' + unitname + '"){id,name,legion,description,tooltip,iconPath,abilities{name,tooltip},armorType,attackType,attackSpeed,range,upgradesTo,goldCost,totalValue,dps,hp,bounty,income}}'
        })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;

                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        }).catch(function (err) {
            writeLog(err);
        });
});

app.get('/api/replay/getGame', (req, res) => {
    var gameid = req.query.gameid;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({ query: '{ game(gameid: "' + gameid + '"){ ts, leftKingPercentHP, rightKingPercentHP, endingWave, gameDetails{ playerProfile{name},position, legion, unitsPerWave, leaksPerWave, mercsReceivedPerWave, mercsSentPerWave, workersPerWave, netWorthPerWave, incomePerWave, legionSpell } } }' })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        }).catch(function (err) {
            writeLog(err);
        });
});

app.get('/api/replay/getTopPlayer', (req, res) => {
    var legion = req.query.legion;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({ query: '{filteredPlayers(orderby: "' + legion + 'Elo", direction: DESC, limit: 10){players{name,statistics,games{id,gameResult,legion}}}}' })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        }).catch(function (err) {
            writeLog(err);
        });
});

app.get('/api/ladder', (req, res) => {
    var type = req.query.type;
    var limit = req.query.limit;
    var offset = req.query.offset;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey},
        body: JSON.stringify({ query: '{ filteredPlayers(orderby: "' + type + '", limit: ' + limit + ', direction: DESC, offset: ' + offset + ') { count, players{ name, statistics } } }' })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        }).catch(function (err) {
            writeLog(err);
        });
});

app.get('/api/streamers', (req, res) => {
    var request_url = "http://127.0.0.1:3666/streamer/list?";
    http.get(request_url, (resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            if (data){
                res.json(data);

            } 
            else res.send("no data");
        });

    }).on("error", (err) => {
        writeLog("Error: " + err.message);
    });

});

//todo: check games order
app.get('/api/profile/playerOverallGames', (req, res) => {
    var playername = req.query.playername.replace("%20", " ");
    var request_url = "http://127.0.0.1:3666/db/games?action=search&db=rankedGames_8.0&type=playername&limit=0&formating=none&name=" + playername;
    http.get(request_url, (resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            if(data) res.json(data);
            else{
                res.send("no data");
            }
        });

    }).on("error", (err) => {
        writeLog("Error: " + err.message);
    });

});

app.get('/api/profile/playerOverallGamesClassic', (req, res) => {
    var playername = req.query.playername.replace("%20", " ");
    var request_url = "http://127.0.0.1:3666/db/games?action=search&db=classicGames_8.0&type=playername&limit=0&formating=none&name=" + playername;
    http.get(request_url, (resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            if(data) res.json(data);
            else{
                res.send("no data");
            }
        });

    }).on("error", (err) => {
        writeLog("Error: " + err.message);
    });

});

// player with 100 last games
app.get('/api/profile/player100', (req, res) => {
    var playername = req.query.playername;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({
            query: '{player(name: "' + playername + '") { name,statistics,bestFriends(limit:3){player{name}gameCount},games(limit: 50, queuetype:normal) {count,games{id,ts,endingWave,gameDetails{playerProfile{name},legion,workers,income,value,isCross,gameResult,overallElo,position,leakValue,leakCaughtValue,mvpScore,legionSpell,unitsPerWave,leaksPerWave,netWorthPerWave,mercsSentPerWave,mercsReceivedPerWave,workersPerWave,partyMemberIds}}}}}'
        })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        }).catch(function (err) {
            writeLog(err);
        });
});

app.get('/api/profile/player', (req, res) => {
    var playername = req.query.playername;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({
            query: '{player(name:"' + playername + '"){id,name,statistics,avatarUrl,bestFriends(limit: 3){player{name},gameCount}}}'
        })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        }).catch(function (err) {
            writeLog(err);
        });
});
//stats
app.get('/api/stats/elo', (req, res) => {
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({ query: '{stats{eloDistribution{elo,percentile}}}' })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        }).catch(function (err) {
            writeLog(err);
        });
});

app.get('/api/stats/fighter', (req, res) => {
    var allFighters = [];
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({ query: '{filteredUnits(legion:Mech){units{name, attackType, armorType, dps, hp,totalValue,legion,goldCost,abilities{name}}}}' })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            allFighters.push(data.data.filteredUnits.units);
            fetch('https://api.legiontd2.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
                body: JSON.stringify({ query: '{filteredUnits(legion:Grove){units{name, attackType, armorType, dps, hp,totalValue,legion,goldCost,abilities{name}}}}' })
            })
                .then(function (response) {
                    if (response.ok) {
                        return response.json();
                    }
                    else {
                        var error = new Error(response.statusText);
                        error.response = response;
                        writeLog(error);
                        console.log(error);
                    }
                }).then(function (data) {
                    //player object an frontend
                    allFighters.push(data.data.filteredUnits.units);
                    fetch('https://api.legiontd2.com', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
                        body: JSON.stringify({ query: '{filteredUnits(legion:Forsaken){units{name, attackType, armorType, dps, hp,totalValue,legion,goldCost,abilities{name}}}}' })
                    })
                        .then(function (response) {
                            if (response.ok) {
                                return response.json();
                            }
                            else {
                                var error = new Error(response.statusText);
                                error.response = response;
                                writeLog(error);
                                console.log(error);
                            }
                        }).then(function (data) {
                            //player object an frontend
                            allFighters.push(data.data.filteredUnits.units);
                            fetch('https://api.legiontd2.com', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
                                body: JSON.stringify({ query: '{filteredUnits(legion:Element){units{name, attackType, armorType, dps, hp,totalValue,legion,goldCost,abilities{name}}}}' })
                            })
                                .then(function (response) {
                                    if (response.ok) {
                                        return response.json();
                                    }
                                    else {
                                        var error = new Error(response.statusText);
                                        error.response = response;
                                        writeLog(error);
                                        console.log(error);
                                    }
                                }).then(function (data) {
                                    //player object an frontend
                                    allFighters.push(data.data.filteredUnits.units);
                                    fetch('https://api.legiontd2.com', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
                                        body: JSON.stringify({ query: '{filteredUnits(legion:Atlantean){units{name, attackType, armorType, dps, hp,totalValue,legion,goldCost,abilities{name}}}}' })
                                    })
                                        .then(function (response) {
                                            if (response.ok) {
                                                return response.json();
                                            }
                                            else {
                                                var error = new Error(response.statusText);
                                                error.response = response;
                                                writeLog(error);
                                                console.log(error);
                                            }
                                        }).then(function (data) {
                                            //player object an frontend
                                            allFighters.push(data.data.filteredUnits.units);
                                            fetch('https://api.legiontd2.com', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
                                                body: JSON.stringify({ query: '{filteredUnits(legion:Divine){units{name, attackType, armorType, dps, hp,totalValue,legion,goldCost,abilities{name}}}}' })
                                            })
                                                .then(function (response) {
                                                    if (response.ok) {
                                                        return response.json();
                                                    }
                                                    else {
                                                        var error = new Error(response.statusText);
                                                        error.response = response;
                                                        writeLog(error);
                                                        console.log(error);
                                                    }
                                                }).then(function (data) {
                                                    //player object an frontend
                                                    allFighters.push(data.data.filteredUnits.units);
                                                    fetch('https://api.legiontd2.com', {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
                                                        body: JSON.stringify({ query: '{filteredUnits(legion:Shrine){units{name, attackType, armorType, dps, hp,totalValue,legion,goldCost,abilities{name}}}}' })
                                                    })
                                                        .then(function (response) {
                                                            if (response.ok) {
                                                                return response.json();
                                                            }
                                                            else {
                                                                var error = new Error(response.statusText);
                                                                error.response = response;
                                                                writeLog(error);
                                                                console.log(error);
                                                            }
                                                        }).then(function (data) {
                                                            //player object an frontend
                                                            allFighters.push(data.data.filteredUnits.units);
                                                            fetch('https://api.legiontd2.com', {
                                                                method: 'POST',
                                                                headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
                                                                body: JSON.stringify({ query: '{filteredUnits(legion:Nomad){units{name, attackType, armorType, dps, hp,totalValue,legion,goldCost,abilities{name}}}}' })
                                                            })
                                                                .then(function (response) {
                                                                    if (response.ok) {
                                                                        return response.json();
                                                                    }
                                                                    else {
                                                                        var error = new Error(response.statusText);
                                                                        error.response = response;
                                                                        writeLog(error);
                                                                        console.log(error);
                                                                    }
                                                                }).then(function (data) {
                                                                    //player object an frontend
                                                                    allFighters.push(data.data.filteredUnits.units);
                                                                    res.json(allFighters);
                                                                }).catch(function (err) {
                                                                    writeLog(err);
                                                                });
                                                        });
                                });
                });
        });
});
});
});
});
/*
app.get('/api/stats/legions/winrate', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({ query: '{ stats{ legionPickWinRate(' + type + ':"' + value + '") { legion, gamesPicked, gamesWon } } }' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                console.log(err)or
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});
*/
app.get('/api/stats/player/winrate', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    var value2 = req.query.value2;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({ query: '{ stats{ legionPickWinRate(' + type + ':"' + value + '", playerid :"' + value2 + '") { legion, gamesPicked, gamesWon } } }' })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        }).catch(function (err) {
            writeLog(err);
        });
});

app.get('/api/stats/legions/avgvalueEnd', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({ query: '{ stats{ legionAverageValueByEndingWave(' + type + ':"' + value + '") { legion, wave, value } } }' })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        }).catch(function (err) {
            writeLog(err);
        });
});

app.get('/api/stats/player/avgvalueEnd', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    var value2 = req.query.value2;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({ query: '{ stats{ legionAverageValueByEndingWave(' + type + ':"' + value + '", playerid :"' + value2 + '") { legion, wave, value } } }' })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        }).catch(function (err) {
            writeLog(err);
        });
});


app.get('/api/stats/legions/avgvincEnd', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({ query: '{ stats{ legionAverageIncomeByEndingWave(' + type + ':"' + value + '") { legion, wave, income } } }' })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        }).catch(function (err) {
            writeLog(err);
        });
});

app.get('/api/stats/player/avgvincEnd', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    var value2 = req.query.value2;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({ query: '{ stats{ legionAverageIncomeByEndingWave(' + type + ':"' + value + '", playerid :"' + value2 + '") { legion, wave, income } } }' })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        }).catch(function (err) {
            writeLog(err);
        });
});


app.get('/api/stats/legions/avgworkersEnd', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({ query: '{ stats{ legionAverageWorkersByEndingWave(' + type + ':"' + value + '") { legion, wave, workers } } }' })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        }).catch(function (err) {
            writeLog(err);
        });
});

app.get('/api/stats/player/avgworkersEnd', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    var value2 = requ.query.value2;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({ query: '{ stats{ legionAverageWorkersByEndingWave(' + type + ':"' + value + '", playerid :"' + value2 + '") { legion, wave, workers } } }' })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        }).catch(function (err) {
            writeLog(err);
        });
});

app.get('/api/stats/legions/avgleaksEnd', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({ query: '{ stats{ legionAverageLeaksByEndingWave(' + type + ':"' + value + '") { legion, wave, leakValue } } }' })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        }).catch(function (err) {
            writeLog(err);
        });
});

app.get('/api/stats/player/avgwleaksEnd', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    var value2 = req.query.value2;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({ query: '{ stats{ legionAverageLeaksByEndingWave(' + type + ':"' + value + '", playerid :"' + value2 + '") { legion, wave, leakValue } } }' })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});

app.get('/api/stats/legions/avgworkersWave', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({ query: '{ stats{ legionAverageWorkersPerWave(' + type + ':"' + value + '") { legion, wave, workers } } }' })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        }).catch(function (err) {
            writeLog(err);
        });
});

app.get('/api/stats/player/avgworkersWave', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    var value2 = req.query.value2;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({ query: '{ stats{ legionAverageWorkersPerWave(' + type + ':"' + value + '", playerid :"' + value2 + '") { legion, wave, workers } } }' })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        }).catch(function (err) {
            writeLog(err);
        });
});

app.get('/api/stats/legions/avgnetworthsWave', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({ query: '{ stats{ legionAverageNetWorthPerWave(' + type + ':"' + value + '") { legion, wave, networth } } }' })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        }).catch(function (err) {
            writeLog(err);
        });
});

app.get('/api/stats/player/avgnetworthsWave', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    var value2 = req.query.value2;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({ query: '{ stats{ legionAverageNetWorthPerWave(' + type + ':"' + value + '", playerid :"' + value2 + '") { legion, wave, networth } } }' })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        }).catch(function (err) {
            writeLog(err);
        });
});

app.get('/api/stats/playercount', (req, res) => {
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({ query: '{filteredPlayers(offset:0){count}}' })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        }).catch(function (err) {
            writeLog(err);
        });
});






app.get('/api/tour/player', (req, res) => {
    var pname = req.query.player;
    fetch('https://api.legiontd2.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({ query: '{ player(name: "' + pname + '"){name,statistics} }' })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText);
                error.response = response;
                writeLog(error);
                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        }).catch(function (err) {
            writeLog(err);
        });

});

/*
var server = app.listen(sslPort, HOST, function () {
    writeLog(`Https Server Running on https://${HOST}:${sslPort}`);
    });
var httpRelay = app.listen(PORT, function () {
    writeLog("Http relay listening on port: " + PORT);
});
*/


// Server für SSL Encryption konfigurieren
var server = https.createServer(options, app).listen(sslPort, function (err) {
    if (err) console.log(err);
    writeLog("Https Server listening on port: " + sslPort);
});

// Auch auf Port 80 lauschen, damit redirected werden kann
var httpRelay = http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    writeLog("Http Relay listening on port: " + PORT);
});

