var firsttime = false;

function getGameDetails(games) {
    firsttime = true;
    try {
        meinString = games.gameDetails.filter(meinString => meinString.position === 1)[0];
        meinString.endingWave = games.endingWave;
        meinString1 = games.gameDetails.filter(meinString => meinString.position === 2)[0];
        meinString1.endingWave = games.endingWave;
        meinString2 = games.gameDetails.filter(meinString => meinString.position === 5)[0];
        meinString2.endingWave = games.endingWave;
        meinString3 = games.gameDetails.filter(meinString => meinString.position === 6)[0];
        meinString3.endingWave = games.endingWave;
        gameEvent = [meinString, meinString1, meinString2, meinString3];
        fillNames();
        waveAnzeigen();
    }
    catch (error) {
        console.log(error);
        console.log(games);
        document.getElementById("mitte").innerHTML += "<p><h3> Game not found.</h3>";
        //showLoad();
    }
}

function addPicture(y, x, unit, player) {
    //überprüfe welche unit auf feld ist
    var neuesX = x * 2;
    var neuesY = y * 2;
    //icons
    var url = "";
    url = "/img/icons/" + unit.charAt(0).toUpperCase() + unit.substring(1);
    while (url.includes("_")) {
        var index = url.indexOf("_");
        url = url.substring(0, index) + url.charAt(index + 1).toUpperCase() + url.substring(index + 2);
        url.replace("_", "");
    }
    var unit_type = url.substring(url.lastIndexOf("/") + 1);
    switch (url) {
        case "/img/icons/Aps":
            url = "/img/icons/APS";
            break;
        case "/img/icons/Mps":
            url = "/img/icons/MPS";
            break;
        case "/img/icons/HellRaiserBuffed":
            url = "/img/icons/HellRaiser";
            break;
    }
    url += ".png";
    //canvas einfügen
    //console.log("p" + player + "_" + neuesX + "." + neuesY);
    var zielspalte = document.getElementById("p" + player + "_" + neuesX + "." + neuesY);
    //console.log("p" + player + "_" + neuesX + "." + neuesY);
    zielspalte.style = "border: 0px;";
    zielspalte.title = unit_type;
    meinCanvas1 = document.createElement("canvas");
    meinCanvas1.setAttribute("id", unit_type + " 1");
    meinCanvas1.setAttribute("class", "kleinerCanvas");
    var el1 = zielspalte.appendChild(meinCanvas1);
    //var el1 = document.getElementById(unit_type+ " 1");
    zielspalte = document.getElementById("p" + player + "_" + (neuesX + 1) + "." + neuesY);
    zielspalte.title = unit_type;
    zielspalte.style = "border: 0px;";
    meinCanvas2 = document.createElement("canvas");
    meinCanvas2.setAttribute("id", unit_type + " 2");
    meinCanvas2.setAttribute("class", "kleinerCanvas");
    var el2 = zielspalte.appendChild(meinCanvas2);
    zielspalte = document.getElementById("p" + player + "_" + neuesX + "." + (neuesY + 1));
    zielspalte.style = "border: 0px;";
    zielspalte.title = unit_type;
    meinCanvas3 = document.createElement("canvas");
    meinCanvas3.setAttribute("id", unit_type + " 3");
    meinCanvas3.setAttribute("class", "kleinerCanvas");
    var el3 = zielspalte.appendChild(meinCanvas3);
    zielspalte = document.getElementById("p" + player + "_" + (neuesX + 1) + "." + (neuesY + 1));
    zielspalte.title = unit_type;
    zielspalte.style = "border: 0px;";
    meinCanvas4 = document.createElement("canvas");
    meinCanvas4.setAttribute("id", unit_type + " 4");
    meinCanvas4.setAttribute("class", "kleinerCanvas");
    var el4 = zielspalte.appendChild(meinCanvas4);

    // bild in canvas (4 teile)
    var meinBild1 = document.createElement("img");
    meinBild1.src = url;
    meinBild1.onload = function () {
        //1
        var ctx = el1.getContext('2d');
        ctx.drawImage(meinBild1, 0, 32, 32, 32, 0, 0, 300, 150);
        //2
        ctx = el2.getContext('2d');
        ctx.drawImage(meinBild1, 0, 0, 32, 32, 0, 0, 300, 150);
        //3
        ctx = el3.getContext('2d');
        ctx.drawImage(meinBild1, 32, 32, 32, 32, 0, 0, 300, 150);
        //4
        ctx = el4.getContext('2d');
        ctx.drawImage(meinBild1, 32, 0, 32, 32, 0, 0, 300, 150);
    };
}
//names, net worth and workers
function fillNames() {
    for (var i = 1; i < 5; i++) {
        var wave = parseInt(document.getElementById("slider").value);
        var worker = gameEvent[i - 1].workersPerWave[wave - 1];
        var unit_value = 0;
        //calculate value
        gameEvent[i-1].unitsPerWave[wave-1].forEach(function(ele){
            var unitname = ele.substring(0, ele.indexOf("_unit"));
            while(unitname.includes("_")){
                unitname = unitname.replace("_", "");
            }
            unit_value += unitstats.filter(meinName => meinName.name === unitname)[0].value;
        });
        var networth = unit_value;
        var player_legion = gameEvent[i - 1].legion;
        document.getElementById("p" + i + "_name").innerText = gameEvent[i - 1].playerProfile.name;
        document.getElementById("networth" + i).innerText = "(" + networth + "/";
        document.getElementById("worker" + i).innerText = worker + ")";
        document.getElementById("legion" + i).innerHTML = "<img id='img_legion' src='/img/icons/" + player_legion + ".png'>";
        //document.getElementById("p"+i+"_name").outerHTML = "<div class='player_name' id='p"+i+"_name'> "+gameEvent[i-1].player_name+" (<div title='Net Worth' style='display:inline;'>"+networth+"</div>/<div title='Worker' style='display:inline;'>"+worker+"</div>)</div>";


    }

}

function showDetails(nummer) {
    document.getElementById("player_details").style.display = "";
}

function setKingHp() {
    try {
        var wave = parseInt(document.getElementById("slider").value);
        var kinghp1 = document.getElementById("hpwest");
        var kinghp2 = document.getElementById("hpeast");
        kinghp1.style.width = game.leftKingPercentHP[wave - 1] * 100 + "%";
        kinghp2.style.width = game.rightKingPercentHP[wave - 1] * 100 + "%";
        kinghp1.textContent = (game.leftKingPercentHP[wave - 1] * 100).toFixed(2) + "%";
        kinghp2.textContent = (game.rightKingPercentHP[wave - 1] * 100).toFixed(2) + "%";
    }
    catch(error){
        console.log(error);
    }
    
}

function getPlayerBuild(player) {
    var wave = parseInt(document.getElementById("slider").value);
    meinBuild = gameEvent[player - 1].unitsPerWave[wave - 1];
    counter = 0;
    meinBuild.forEach(element => {
        counter++;
        var meinX = element.substring(element.indexOf(":") + 1, element.indexOf("|"));
        var meinY = element.substring(element.indexOf("|") + 1);
        addPicture(meinX, meinY, element.substring(0, element.indexOf("_unit")), player);
    });
}

function getPlayerLeaks(player) {
    var wave = parseInt(document.getElementById("slider").value);
    var meineLeaks = gameEvent[player - 1].leaksPerWave[wave - 1];
    if (meineLeaks.length > 0) {
        meineLeaks.forEach(element => {
            addLeak(element, player);
        });
    }
}

function getPlayerSends(player) {
    var wave = parseInt(document.getElementById("slider").value);
    switch (gameEvent[player - 1].position) {
        case 1:
            var target_player = 3;
            break;
        case 2:
            target_player = 4;
            break;
        case 5:
            target_player = 2;
            break;
        case 6:
            target_player = 1;
            break;
        default:
            console.log("could not get player sends");
            break;

    }
    var meineSends = gameEvent[target_player - 1].mercsReceivedPerWave[wave - 1];
    if (meineSends.length > 0) {
        meineSends.forEach(element => {
            addSend(element, player);
        });
    }
}

function addSend(element, player) {
    while (element.includes(" ") || element.includes("%20")) {
        element = element.replace(" ", "");
        element = element.replace("%20", "");
    }
    //red->yellow
    if(player===1) player = 3;
    else if(player===2) player=4;
    else if(player===3) player=2;
    else if(player===4) player=1;
    document.getElementById("sends_player" + player).innerHTML += "<img src='/img/icons/" + element + ".png' class='leakpic' title='" + element + "'>";
}

function addLeak(element, player) {
    while (element.includes(" ") || element.includes("%20")) {
        element = element.replace(" ", "");
        element = element.replace("%20", "");
    }
    document.getElementById("leaks_player" + player).innerHTML += "<img src='/img/icons/" + element + ".png' class='leakpic' title='" + element + "'>";
}

function clearPictures() {
    for (var h = 1; h < 5; h++) {
        for (var i = 28; i > 0; i--) {
            for (var e = 1; e < 19; e++) {
                document.getElementById("p" + h + "_" + i + "." + e).innerHTML = "";
                document.getElementById("p" + h + "_" + i + "." + e).style = "border: 1px solid black; background-color: white;";
            }
        }
    }
}

document.onkeydown = function (event) {
    if (event.keyCode === 13) {
        if (event.target.id === "playername") setPlayer();
    }
    if (event.keyCode === 107) {
        if (document.getElementById("slider").value < gameEvent[0].endingWave) {
            var waveValue = parseInt(document.getElementById("slider").value) + 1;
            document.getElementById("slider").value = waveValue;
        }
        else if (document.getElementById("slider").value === gameEvent[0].endingWave) {
            document.getElementById("slider").value = "1";
        }
        waveAnzeigen();
    }
    if (event.keyCode === 109) {
        if (document.getElementById("slider").value > 1) {
            document.getElementById("slider").value -= 1;
        }

        else if (document.getElementById("slider").value === "1") {
            document.getElementById("slider").value = gameEvent[0].endingWave;
        }
        waveAnzeigen();
    }


};

document.onmousewheel = function displaywheel(e) {
    if ($(window).height() >= 770) {
        var evt = window.event || e; //equalize event object
        var delta = evt.detail ? evt.detail * -120 : evt.wheelDelta; //check for detail first so Opera uses that instead of wheelDelta
        if (delta > 0) {
            if (document.getElementById("slider").value < gameEvent[0].endingWave) {
                var waveValue = parseInt(document.getElementById("slider").value) + 1;
                document.getElementById("slider").value = waveValue;
            }
            else if (document.getElementById("slider").value === gameEvent[0].endingWave) {
                document.getElementById("slider").value = "1";
            }
            waveAnzeigen();
        }
        else {
            if (document.getElementById("slider").value > 1) {
                document.getElementById("slider").value -= 1;
            }

            else if (document.getElementById("slider").value === "1") {
                document.getElementById("slider").value = gameEvent[0].endingWave;
            }
            waveAnzeigen();
        }
    }
};
document.getElementById("slider").onchange = function () {
    if (document.getElementById("slider").value > gameEvent[0].endingWave) {
        document.getElementById("slider").value = gameEvent[0].endingWave;
        waveAnzeigen();
    }
};

function getPlayer() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var playerurl = url.searchParams.get("gameid");
    if (playerurl === null) {
        //console.log(playerurl);
        window.location.href = window.location.href + "?gameid=" + document.getElementById("gameid").value;
    }
    else {
        window.location.href = "/replay?gameid=" + document.getElementById("gameid").value;
    }
}

function h2d(s) {
    function add(x, y) {
        var c = 0, r = [];
        x = x.split('').map(Number);
        y = y.split('').map(Number);
        while (x.length || y.length) {
            var s = (x.pop() || 0) + (y.pop() || 0) + c;
            r.unshift(s < 10 ? s : s - 10);
            c = s < 10 ? 0 : 1;
        }
        if (c) r.unshift(c);
        return r.join('');
    }
    var dec = '0';
    s.split('').forEach(function (chr) {
        var n = parseInt(chr, 16);
        for (var t = 8; t; t >>= 1) {
            dec = add(dec, dec);
            if (n & t) dec = add(dec, '1');
        }
    });
    return dec;
}

document.body.onload = function () {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var playerurl = url.searchParams.get("gameid");
    if (playerurl !== "" && playerurl !== null) {
        document.getElementById("mitte").style.display = "inherit";
        //hex to dez
        //console.log(playerurl.length)
        if (playerurl.length <= 16) {
            playerurl = h2d(playerurl);
        }
        queryGame(playerurl);
        //console.log(playerurl);
    }
    else {
        document.getElementById("wave").textContent = "Enter a valid gameid to select the replay.";
    }
};


function clearLeaks(player) {
    document.getElementById("leaks_player" + player).innerHTML = "";
}

function clearSends() {
    for (var i = 1; i < 5; i++) {
        document.getElementById("sends_player" + i).innerHTML = "";
    }
}
function waveAnzeigen() {

    var welle = document.getElementById("slider").value;
    var maxwave = gameEvent[0].endingWave;
    document.getElementById("wave").textContent = "Wave: " + welle.toString() + "/" + maxwave;
    //legion spell
    var icon_legionspell = [];
    if (welle > 10) {
        for (var i = 0; i < 4; i++) {
            if (typeof gameEvent[i].legionSpell !== 'undefined') {
                icon_legionspell[i] = gameEvent[i].legionSpell;
                while (icon_legionspell[i].includes(" ") || icon_legionspell[i].includes("%20")) {
                    icon_legionspell[i] = icon_legionspell[i].replace(" ", "");
                    icon_legionspell[i] = icon_legionspell[i].replace("%20", "");
                }
                document.getElementById("legionspell" + i).innerHTML = "<img src='/img/icons/" + icon_legionspell[i] + ".png' height='20px' width=20px' title='" + gameEvent[i].legionSpell+"'>";
            }
            else {
                console.log(gameEvent[i]);
            }
        }
    }
    else {
        for (i = 0; i < 4; i++) {
            document.getElementById("legionspell" + i).innerHTML = "";
        }
    }
    //clear view
    clearPictures();
    clearSends();
    drawSquares();
    for (i = 1; i < 5; i++) {
        clearLeaks(i);
        getPlayerBuild(i);
        getPlayerLeaks(i);
        getPlayerSends(i);
    }
    fillNames();
    setKingHp();
}

function showSelect() {
    document.getElementById("findagame").style.display = "inherit";
}

function searchPlayers() {
    var selected = document.getElementById("legion_selector").value;
    if (selected !== "") {
        //document.getElementById("mitte").style.display = "inherit";
        //queryTopPlayer(selected);
    }
}

function parseTopPlayer(players, legion) {
    var result = document.getElementById("result");
    result.innerHTML = "";
    var legion_num = 0;
    switch (legion) {
        case "element":
            legion_num = 0;
            break;
        case "grove":
            legion_num = 1;
            break;
        case "forsaken":
            legion_num = 2;
            break;
        case "mech":
            legion_num = 3;
            break;
        case "atlantean":
            legion_num = 4;
            break;
        case "mastermind":
            legion_num = 5;
            break;
        case "nomad":
            legion_num = 6;
            break;
    }
    for (var i = 0; i < players.length; i++) {
        result.innerHTML += "<br> <div id='player_" + i + "' onclick='showGames(" + i + ", " + legion_num + ")'>" + players[i].name + " Elo: " + players[i].statistics.overallElo + "</div>";
    }
    result.innerHTML += "<br>";
    result.style.display = "inherit";
}

function showGames(nummer, legion) {
    var result = document.getElementById("result");
    result.innerHTML = "";
    switch (legion) {
        case 0:
            legion = "Element";
            break;
        case 1:
            legion = "Grove";
            break;
        case 2:
            legion = "Forsaken";
            break;
        case 3:
            legion = "Mech";
            break;
        case 4:
            legion = "Atlantean";
            break;
        case 5:
            legion = "Mastermind";
            break;
        case 6:
            legion ="Nomad";
            break;
    }
    var games_results = 0;
    for (var i = 0; i < players[nummer].filteredGamesQuery.games.length; i++) {
        if (players[nummer].filteredGamesQuery.games[i].legion === legion) {
            games_results++;
            result.innerHTML += "<br> <div id='games_" + i + "' onclick='getGameId(" + i + ", " + nummer + ")'>" + players[nummer].filteredGamesQuery.games[i].id + " Legion: " + players[nummer].filteredGamesQuery.games[i].legion + ", " + players[nummer].filteredGamesQuery.games[i].gameresult + "</div>";
            if (games_results === 10) break;
        }
        
    }
    result.innerHTML += "<br>";
}

function getGameId(nummer, playernum) {
    window.location.href = "/replay?gameid=" + players[playernum].filteredGamesQuery.games[nummer].id;
}

//adds thik lines to grid
function drawSquares() {
    var smalls = document.getElementsByClassName("pictable");
    Array.prototype.forEach.call(smalls, function (element) {
        var x = element.id.substring(element.id.indexOf(".") + 1);
        var y = element.id.substring(element.id.indexOf("_")+1, element.id.indexOf("."));
        if (x % 2 === 1) {

            element.style["border-left"] = "2px solid black";
        }
        else {

            element.style["border-right"] = "2px solid black";
        }
        if (y % 2 === 1) {
            element.style["border-bottom"] = "2px solid black";
        }
        else {
            element.style["border-top"] = "2px solid black";
            
        }
    });
}


//API
function getGame(callback, gameid) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var game = JSON.parse(xhttp.response);
            console.log(game);
            callback(game);
        }
    };
    xhttp.open("GET", '/api/replay/getGame?gameid=' + gameid, true);
    xhttp.send();
}

function queryGame(gameid) {
    getGame(function (result) {
        //console.log(result);
        game = result.game;
        
        getGameDetails(game);
        document.getElementById("mitte").style.display = "none";
        return game;
    }, gameid);
}

function getTopPlayer(callback, legion) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var players = JSON.parse(xhttp.response);
            callback(players);
        }
    };
    xhttp.open("GET", '/api/replay/getTopPlayer?legion=' + legion, true);
    xhttp.send();
}

function queryTopPlayer(legion) {
    getTopPlayer(function (result) {
        console.log(result);
        for (var i = 0; i < result.filteredPlayers.players.length; i++) {
            result.filteredPlayers.players[i].statistics = JSON.parse(result.filteredPlayers.players[i].statistics);
        }
        console.log(result);
        players = result.filteredPlayers.players;
        parseTopPlayer(players, legion);
        document.getElementById("mitte").style.display = "none";
        return players;
    }, legion);
}