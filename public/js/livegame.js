/*
Author: GvR Mr Mister / Shoro2
ltdstats.com/livegame
*/
var debug = true;

//globals
var selectedPlayerName = "";
var duoWest = false, duoEast = false;
var winsFive = [], roles = [], count_highpush = [], count_lowpush = [], count_samepush = [], count_leaked = [], count_held = [];

function checkContent() {
    var requested_players = 0;
    allPlayers = [];
    document.getElementById("mitte").style.display = "";
    if (document.getElementById("playername").value.length > 0) {
        queryLivegame(document.getElementById("playername").value);
    }
    else {
        queryLivegame(document.getElementById("playername2").value);
    }
    document.getElementById("indermitte").style.display = "none";
}

function getPlayer() {
    if (document.getElementById("playername").value.length > 0) {
        window.history.pushState('livegame', 'Livegame', '?playername=' + document.getElementById("playername").value);
    }
    else if (document.getElementById("playername2").value.length > 0) {
        window.history.pushState('livegame', 'Livegame', '?playername=' + document.getElementById("playername2").value);
    }
    checkContent();


}

function checkLink() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var playerurl = url.searchParams.get("playername");
    // request per url
    if (playerurl !== null) {
        document.getElementById("playername").value = playerurl;
        checkContent();
    }
}

function parsePlayers() {
    document.getElementById("mitte").style.display = "none";
    parsedPlayer = [];
    playercount = allPlayers.length;
    if(debug) console.log(playercount);
    gametype ="";
    if(playercount==4) gametype = "normal";
    else gametype = "classic";
    if(debug) console.log(allPlayers);
    if(debug) console.log(livegame.players);
    if(debug) console.log(parsedPlayer);
    for (var i = 0; i < playercount; i++) {
        if(debug) console.log(allPlayers.filter(function (filteredPlayer) { return filteredPlayer.name === livegame.players[i];})[0]);
        parsedPlayer[i] = allPlayers.filter(function (filteredPlayer) { return filteredPlayer.name === livegame.players[i];})[0];
        if (parsedPlayer[i] === undefined) {
            parsedPlayer[i] = allPlayers.filter(function (filteredPlayer) { return filteredPlayer.name === "Bot (player not found)"; })[0];
        }
        //if(debug) console.log(parsedPlayer[i]);
    }
    var score_worker = [0, 0, 0, 0, 0, 0, 0, 0], score_value = [0, 0, 0, 0, 0, 0, 0, 0], game_count = [0, 0, 0, 0, 0, 0, 0, 0];
    if(debug) console.log(parsedPlayer);
    for (i = 0; i < playercount; i++) {
        if(playercount==4) gametype = "normal";
        else gametype = "classic";
        if(i>=2 && gametype=="normal"){
            document.getElementById("name" + (i + 3)).innerHTML = "<b onclick='showPlayerDetails(" + (i) + ");'>" + parsedPlayer[i].name + "</b>";
            document.getElementById("elo" + (i + 3)).innerHTML = parsedPlayer[i].statistics.overallElo + " (" + parsedPlayer[i].statistics.overallPeakEloThisSeason + ")";
        }
        else{
            document.getElementById("name" + (i + 1)).innerHTML = "<b onclick='showPlayerDetails(" + i + ");'>" + parsedPlayer[i].name + "</b>";
            document.getElementById("elo" + (i + 1)).innerHTML = parsedPlayer[i].statistics.overallElo + " (" + parsedPlayer[i].statistics.overallPeakEloThisSeason + ")";
        }
        
        //document.getElementById("name" + (i + 1)).innerHTML = parsedPlayer[i].playername;

        player_totalgames = parsedPlayer[i].statistics.gamesPlayed;
        player_totalwins = parsedPlayer[i].statistics.wins;
        player_totalwinchance = ((player_totalwins / player_totalgames) * 100).toFixed(2);
        if (isNaN(player_totalwinchance)) player_totalwinchance = 0;
        player_ties = parsedPlayer[i].statistics.ties;
        if (typeof parsedPlayer[i].statistics.ties == 'undefined') player_ties = 0;
        player_quits = parsedPlayer[i].statistics.quits;
        if (typeof parsedPlayer[i].statistics.quits == 'undefined') player_quits = 0;
        player_overall_elo = parsedPlayer[i].statistics.overallElo;
        //if(debug) console.log(parsedPlayer[i].statistics.overallPeakElo);
        if (typeof parsedPlayer[i].statistics.overallPeakElo == 'undefined') player_overall_peakelo = parsedPlayer[i].statistics.overallPeakEloThisSeason;
        else player_overall_peakelo = parsedPlayer[i].statistics.overallPeakElo;
        player_overall_xp = parsedPlayer[i].statistics.totalXp
        player_overall_level = getPlayerLevel(player_overall_xp);
        player_winningstreak = parsedPlayer[i].statistics.winStreak;
        if(i>=2 && gametype=="normal"){
            if (player_winningstreak > 5) document.getElementById("player" + (i+3)).style.boxShadow = "rgba(255,0,0, .5) 0px 0px 10px 10px";
        }
        else{
            if (player_winningstreak > 5) document.getElementById("player" + (i+1)).style.boxShadow = "rgba(255,0,0, .5) 0px 0px 10px 10px";
        }
        
        

        var favunit = [];
        var leaks = [];
        
        for (var x = 0; x < 60; x++) {
            favunit[x] = 0;
            if (x < 22) leaks[x] = 0;
        }
        var games_count = 0, leakedOne = 0, sendedOne = 0;
        if(i>=2 && gametype=="normal"){
            document.getElementById("favstart" + (i + 3)).innerHTML = "Favorite Starts (last 50 games):";if (player_winningstreak > 5) document.getElementById("player" + (i+3)).style.boxShadow = "rgba(255,0,0, .5) 0px 0px 10px 10px";
        }
        else{
            document.getElementById("favstart" + (i + 1)).innerHTML = "Favorite Starts (last 50 games):";if (player_winningstreak > 5) document.getElementById("player" + (i+1)).style.boxShadow = "rgba(255,0,0, .5) 0px 0px 10px 10px";
        }
        //if(!parsedPlayer[i].games)parsedPlayer[i].games.count=0;
        if (parsedPlayer[i].games) {
            
            parsedPlayer[i].games.games.forEach(function (ele) {
                if(ele.gameDetails.length == 4) gametype = "normal";
                else gametype="classic";
                game_count[i]++;
                var gameDetail = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.playerProfile.name == parsedPlayer[i].name; })[0];
                var gameDetail_position = 0;
                if (gameDetail) {
                    games_count++;
                    gameDetail_position = gameDetail.position;
                    //compare workers
                    var gameDetailSelected = [];
                    if(gametype=="normal"){
                        switch (gameDetail_position) {
                            case 1:
                                gameDetailSelected[0] = gameDetail;
                                gameDetailSelected[1] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 2; })[0];
                                gameDetailSelected[2] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 5; })[0];
                                gameDetailSelected[3] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 6; })[0];
                                break;
                            case 2:
                                gameDetailSelected[0] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 1; })[0];
                                gameDetailSelected[1] = gameDetail;
                                gameDetailSelected[2] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 5; })[0];
                                gameDetailSelected[3] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 6; })[0];
                                break;
                            case 5:
                                gameDetailSelected[0] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 1; })[0];
                                gameDetailSelected[1] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 2; })[0];
                                gameDetailSelected[2] = gameDetail;
                                gameDetailSelected[3] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 6; })[0];
                                break;
                            case 6:
                                gameDetailSelected[0] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 1; })[0];
                                gameDetailSelected[1] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 2; })[0];
                                gameDetailSelected[2] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 5; })[0];
                                gameDetailSelected[3] = gameDetail;
                                break;
                            default:
                                console.log("failed to read " + gameDetail_position);
                                break;
                        }
                    }
                    else{
                        if(debug) console.log(ele);
                        switch (gameDetail_position) {
                            case 1:
                                gameDetailSelected[0] = gameDetail;
                                gameDetailSelected[1] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 2; })[0];
                                gameDetailSelected[2] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 3; })[0];
                                gameDetailSelected[3] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 4; })[0];
                                gameDetailSelected[4] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 5; })[0];
                                gameDetailSelected[5] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 6; })[0];
                                gameDetailSelected[6] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 7; })[0];
                                gameDetailSelected[7] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 8; })[0];
                                break;
                            case 2:
                                gameDetailSelected[0] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 1; })[0];
                                gameDetailSelected[1] = gameDetail;
                                gameDetailSelected[2] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 3; })[0];
                                gameDetailSelected[3] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 4; })[0];
                                gameDetailSelected[4] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 5; })[0];
                                gameDetailSelected[5] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 6; })[0];
                                gameDetailSelected[6] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 7; })[0];
                                gameDetailSelected[7] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 8; })[0];
                                break;
                            case 3:
                                gameDetailSelected[0] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 1; })[0];
                                gameDetailSelected[1] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 2; })[0];
                                gameDetailSelected[2] = gameDetail;
                                gameDetailSelected[3] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 4; })[0];
                                gameDetailSelected[4] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 5; })[0];
                                gameDetailSelected[5] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 6; })[0];
                                gameDetailSelected[6] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 7; })[0];
                                gameDetailSelected[7] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 8; })[0];
                                break;
                            case 4:
                                gameDetailSelected[0] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 1; })[0];
                                gameDetailSelected[1] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 2; })[0];
                                gameDetailSelected[2] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 3; })[0];
                                gameDetailSelected[3] = gameDetail;
                                gameDetailSelected[4] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 5; })[0];
                                gameDetailSelected[5] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 6; })[0];
                                gameDetailSelected[6] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 7; })[0];
                                gameDetailSelected[7] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 8; })[0];
                                break;
                            case 5:
                                gameDetailSelected[0] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 1; })[0];
                                gameDetailSelected[1] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 2; })[0];
                                gameDetailSelected[2] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 3; })[0];
                                gameDetailSelected[3] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 4; })[0];
                                gameDetailSelected[4] = gameDetail;
                                gameDetailSelected[5] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 6; })[0];
                                gameDetailSelected[6] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 7; })[0];
                                gameDetailSelected[7] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 8; })[0];
                                break;
                            case 6:
                                gameDetailSelected[0] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 1; })[0];
                                gameDetailSelected[1] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 2; })[0];
                                gameDetailSelected[2] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 3; })[0];
                                gameDetailSelected[3] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 4; })[0];
                                gameDetailSelected[4] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 5; })[0];
                                gameDetailSelected[5] = gameDetail;
                                gameDetailSelected[6] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 7; })[0];
                                gameDetailSelected[7] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 8; })[0];
                                break;
                            case 7:
                                gameDetailSelected[0] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 1; })[0];
                                gameDetailSelected[1] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 2; })[0];
                                gameDetailSelected[2] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 3; })[0];
                                gameDetailSelected[3] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 4; })[0];
                                gameDetailSelected[4] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 5; })[0];
                                gameDetailSelected[5] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 6; })[0];
                                gameDetailSelected[6] = gameDetail;
                                gameDetailSelected[7] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 8; })[0];
                                break;
                            case 8:
                                gameDetailSelected[0] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 1; })[0];
                                gameDetailSelected[1] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 2; })[0];
                                gameDetailSelected[2] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 3; })[0];
                                gameDetailSelected[3] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 4; })[0];
                                gameDetailSelected[4] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 5; })[0];
                                gameDetailSelected[5] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 6; })[0];
                                gameDetailSelected[6] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 7; })[0];
                                gameDetailSelected[7] = gameDetail;
                                break;
                            default:
                                console.log("failed to read " + gameDetail_position);
                                break;
                        }
                    }
                    //WORKERS
                    if(gametype=="normal"){
                        var workersPerWave = [];
                        for (var e = 0; e < 4; e++) {
                            workersPerWave[e] = [];
                        }
                        for (e = 0; e < 4; e++) {
                            gameDetailSelected[e].workersPerWave.forEach(function (wpw) {
                                workersPerWave[e].push(wpw);
                            });
                        }
                        //if(debug) console.log(workersPerWave);
                        for (var q = 0; q < workersPerWave[0].length; q++) {
                            switch (gameDetail_position) {
                                case 1:
                                    if (workersPerWave[0][q] > workersPerWave[1][q]) score_worker[i]++;
                                    else if (workersPerWave[0][q] < workersPerWave[1][q]) score_worker[i]--;
                                    if (workersPerWave[0][q] > workersPerWave[2][q]) score_worker[i]++;
                                    else if (workersPerWave[0][q] < workersPerWave[2][q]) score_worker[i]--;
                                    if (workersPerWave[0][q] > workersPerWave[3][q]) score_worker[i]++;
                                    else if (workersPerWave[0][q] < workersPerWave[3][q]) score_worker[i]--;
                                        break;
                                case 2:
                                    if (workersPerWave[1][q] > workersPerWave[0][q]) score_worker[i]++;
                                    else if (workersPerWave[1][q] < workersPerWave[0][q]) score_worker[i]--;
                                    if (workersPerWave[1][q] > workersPerWave[2][q]) score_worker[i]++;
                                    else if (workersPerWave[1][q] < workersPerWave[2][q]) score_worker[i]--;
                                    if (workersPerWave[1][q] > workersPerWave[3][q]) score_worker[i]++;
                                    else if (workersPerWave[1][q] < workersPerWave[3][q]) score_worker[i]--;
                                    break;
                                case 5:
                                    if (workersPerWave[2][q] > workersPerWave[1][q]) score_worker[i]++;
                                    else if (workersPerWave[2][q] < workersPerWave[1][q]) score_worker[i]--;
                                    if (workersPerWave[2][q] > workersPerWave[0][q]) score_worker[i]++;
                                    else if (workersPerWave[2][q] < workersPerWave[0][q]) score_worker[i]--;
                                    if (workersPerWave[2][q] > workersPerWave[3][q]) score_worker[i]++;
                                    else if (workersPerWave[2][q] < workersPerWave[3][q]) score_worker[i]--;
                                    break;
                                case 6:
                                    if (workersPerWave[3][q] > workersPerWave[1][q]) score_worker[i]++;
                                    else if (workersPerWave[3][q] < workersPerWave[1][q]) score_worker[i]--;
                                    if (workersPerWave[3][q] > workersPerWave[2][q]) score_worker[i]++;
                                    else if (workersPerWave[3][q] < workersPerWave[2][q]) score_worker[i]--;
                                    if (workersPerWave[3][q] > workersPerWave[0][q]) score_worker[i]++;
                                    else if (workersPerWave[3][q] < workersPerWave[0][q]) score_worker[i]--;
                                    break;
                                default:
                                    console.log("failed to read " + gameDetail_position);
                                    break;
                            }
    
                        }
                        //if(debug) console.log(workersPerWave);
                        score_worker[i] = score_worker[i] / workersPerWave[0].length;
    
    
                        //VALUE
                        var valuePerWave = [];
                        for (e = 0; e < 4; e++) {
                            valuePerWave[e] = [];
                        }
                        var valuec;
                        for (e = 0; e < 4; e++) {
                            //if(debug) console.log(gameDetailSelected[e].unitsPerWave);
                            gameDetailSelected[e].unitsPerWave.forEach(function (ele) {
                                valuec = 0;
                                ele.forEach(function (ele2) {
                                    var unitname = ele2.substring(0, ele2.indexOf("_unit"));
                                    while (unitname.includes("_")) {
                                        unitname = unitname.replace("_", "");
                                    }
                                    if (unitstats.filter(meinName => meinName.name === unitname)[0] === undefined) {
                                        console.log("failed to look up " + unitname + "'s value");
                                        console.log(gameDetailSelected[e]);
                                    }
                                    else valuec += parseInt(unitstats.filter(meinName => meinName.name === unitname)[0].value);
                                });
                                valuePerWave[e].push(valuec);
                            });
                        }
                        //if(debug) console.log(valuePerWave);
                        for (q = 0; q < valuePerWave[0].length; q++) {
                            switch (gameDetail_position) {
                                case 1:
                                    if (valuePerWave[0][q] > valuePerWave[1][q]) score_value[i]++;
                                    else if (valuePerWave[0][q] < valuePerWave[1][q]) score_value[i]--;
                                    if (valuePerWave[0][q] > valuePerWave[2][q]) score_value[i]++;
                                    else if (valuePerWave[0][q] < valuePerWave[2][q]) score_value[i]--;
                                    if (valuePerWave[0][q] > valuePerWave[3][q]) score_value[i]++;
                                    else if (valuePerWave[0][q] < valuePerWave[3][q]) score_value[i]--;
                                    break;
                                case 2:
                                    if (valuePerWave[1][q] > valuePerWave[0][q]) score_value[i]++;
                                    else if (valuePerWave[1][q] < valuePerWave[0][q]) score_value[i]--;
                                    if (valuePerWave[1][q] > valuePerWave[2][q]) score_value[i]++;
                                    else if (valuePerWave[1][q] < valuePerWave[2][q]) score_value[i]--;
                                    if (valuePerWave[1][q] > valuePerWave[3][q]) score_value[i]++;
                                    else if (valuePerWave[1][q] < valuePerWave[3][q]) score_value[i]--;
                                    break;
                                case 5:
                                    if (valuePerWave[2][q] > valuePerWave[1][q]) score_value[i]++;
                                    else if (valuePerWave[2][q] < valuePerWave[1][q]) score_value[i]--;
                                    if (valuePerWave[2][q] > valuePerWave[0][q]) score_value[i]++;
                                    else if (valuePerWave[2][q] < valuePerWave[0][q]) score_value[i]--;
                                    if (valuePerWave[2][q] > valuePerWave[3][q]) score_value[i]++;
                                    else if (valuePerWave[2][q] < valuePerWave[3][q]) score_value[i]--;
                                    break;
                                case 6:
                                    if (valuePerWave[3][q] > valuePerWave[1][q]) score_value[i]++;
                                    else if (valuePerWave[3][q] < valuePerWave[1][q]) score_value[i]--;
                                    if (valuePerWave[3][q] > valuePerWave[2][q]) score_value[i]++;
                                    else if (valuePerWave[3][q] < valuePerWave[2][q]) score_value[i]--;
                                    if (valuePerWave[3][q] > valuePerWave[0][q]) score_value[i]++;
                                    else if (valuePerWave[3][q] < valuePerWave[0][q]) score_value[i]--;
                                    break;
                            }
                        }
                        score_value[i] = score_value[i] / valuePerWave[0].length;
                        //if(debug) console.log(valuePerWave);
                    }
                    else{
                        var workersPerWave = [];
                        for (var e = 0; e < 8; e++) {
                            workersPerWave[e] = [];
                        }
                        if(debug) console.log(gameDetailSelected);
                        for (e = 0; e < 8; e++) {
                            gameDetailSelected[e].workersPerWave.forEach(function (wpw) {
                                workersPerWave[e].push(wpw);
                            });
                        }
                        //if(debug) console.log(workersPerWave);
                        for (var q = 0; q < workersPerWave[0].length; q++) {
                            switch (gameDetail_position) {
                                case 1:
                                    if (workersPerWave[0][q] > workersPerWave[1][q]) score_worker[i]++;
                                    else if (workersPerWave[0][q] < workersPerWave[1][q]) score_worker[i]--;
                                    if (workersPerWave[0][q] > workersPerWave[2][q]) score_worker[i]++;
                                    else if (workersPerWave[0][q] < workersPerWave[2][q]) score_worker[i]--;
                                    if (workersPerWave[0][q] > workersPerWave[3][q]) score_worker[i]++;
                                    else if (workersPerWave[0][q] < workersPerWave[3][q]) score_worker[i]--;
                                    if (workersPerWave[0][q] > workersPerWave[4][q]) score_worker[i]++;
                                    else if (workersPerWave[0][q] < workersPerWave[4][q]) score_worker[i]--;
                                    if (workersPerWave[0][q] > workersPerWave[5][q]) score_worker[i]++;
                                    else if (workersPerWave[0][q] < workersPerWave[5][q]) score_worker[i]--;
                                    if (workersPerWave[0][q] > workersPerWave[6][q]) score_worker[i]++;
                                    else if (workersPerWave[0][q] < workersPerWave[6][q]) score_worker[i]--;
                                    if (workersPerWave[0][q] > workersPerWave[7][q]) score_worker[i]++;
                                    else if (workersPerWave[0][q] < workersPerWave[7][q]) score_worker[i]--;
                                    break;
                                case 2:
                                    if (workersPerWave[1][q] > workersPerWave[0][q]) score_worker[i]++;
                                    else if (workersPerWave[1][q] < workersPerWave[0][q]) score_worker[i]--;
                                    if (workersPerWave[1][q] > workersPerWave[2][q]) score_worker[i]++;
                                    else if (workersPerWave[1][q] < workersPerWave[2][q]) score_worker[i]--;
                                    if (workersPerWave[1][q] > workersPerWave[3][q]) score_worker[i]++;
                                    else if (workersPerWave[1][q] < workersPerWave[3][q]) score_worker[i]--;
                                    if (workersPerWave[1][q] > workersPerWave[4][q]) score_worker[i]++;
                                    else if (workersPerWave[1][q] < workersPerWave[4][q]) score_worker[i]--;
                                    if (workersPerWave[1][q] > workersPerWave[5][q]) score_worker[i]++;
                                    else if (workersPerWave[1][q] < workersPerWave[5][q]) score_worker[i]--;
                                    if (workersPerWave[1][q] > workersPerWave[6][q]) score_worker[i]++;
                                    else if (workersPerWave[1][q] < workersPerWave[6][q]) score_worker[i]--;
                                    if (workersPerWave[1][q] > workersPerWave[7][q]) score_worker[i]++;
                                    else if (workersPerWave[1][q] < workersPerWave[7][q]) score_worker[i]--;
                                    break;
                                case 3:
                                    if (workersPerWave[2][q] > workersPerWave[0][q]) score_worker[i]++;
                                    else if (workersPerWave[2][q] < workersPerWave[0][q]) score_worker[i]--;
                                    if (workersPerWave[2][q] > workersPerWave[1][q]) score_worker[i]++;
                                    else if (workersPerWave[2][q] < workersPerWave[1][q]) score_worker[i]--;
                                    if (workersPerWave[2][q] > workersPerWave[3][q]) score_worker[i]++;
                                    else if (workersPerWave[2][q] < workersPerWave[3][q]) score_worker[i]--;
                                    if (workersPerWave[2][q] > workersPerWave[4][q]) score_worker[i]++;
                                    else if (workersPerWave[2][q] < workersPerWave[4][q]) score_worker[i]--;
                                    if (workersPerWave[2][q] > workersPerWave[5][q]) score_worker[i]++;
                                    else if (workersPerWave[2][q] < workersPerWave[5][q]) score_worker[i]--;
                                    if (workersPerWave[2][q] > workersPerWave[6][q]) score_worker[i]++;
                                    else if (workersPerWave[2][q] < workersPerWave[6][q]) score_worker[i]--;
                                    if (workersPerWave[2][q] > workersPerWave[7][q]) score_worker[i]++;
                                    else if (workersPerWave[2][q] < workersPerWave[7][q]) score_worker[i]--;
                                    break;
                                case 4:
                                    if (workersPerWave[3][q] > workersPerWave[0][q]) score_worker[i]++;
                                    else if (workersPerWave[3][q] < workersPerWave[0][q]) score_worker[i]--;
                                    if (workersPerWave[3][q] > workersPerWave[1][q]) score_worker[i]++;
                                    else if (workersPerWave[3][q] < workersPerWave[1][q]) score_worker[i]--;
                                    if (workersPerWave[3][q] > workersPerWave[2][q]) score_worker[i]++;
                                    else if (workersPerWave[3][q] < workersPerWave[2][q]) score_worker[i]--;
                                    if (workersPerWave[3][q] > workersPerWave[4][q]) score_worker[i]++;
                                    else if (workersPerWave[3][q] < workersPerWave[4][q]) score_worker[i]--;
                                    if (workersPerWave[3][q] > workersPerWave[5][q]) score_worker[i]++;
                                    else if (workersPerWave[3][q] < workersPerWave[5][q]) score_worker[i]--;
                                    if (workersPerWave[3][q] > workersPerWave[6][q]) score_worker[i]++;
                                    else if (workersPerWave[3][q] < workersPerWave[6][q]) score_worker[i]--;
                                    if (workersPerWave[3][q] > workersPerWave[7][q]) score_worker[i]++;
                                    else if (workersPerWave[3][q] < workersPerWave[7][q]) score_worker[i]--;
                                    break;
                                case 5:
                                    if (workersPerWave[4][q] > workersPerWave[0][q]) score_worker[i]++;
                                    else if (workersPerWave[4][q] < workersPerWave[0][q]) score_worker[i]--;
                                    if (workersPerWave[4][q] > workersPerWave[1][q]) score_worker[i]++;
                                    else if (workersPerWave[4][q] < workersPerWave[1][q]) score_worker[i]--;
                                    if (workersPerWave[4][q] > workersPerWave[3][q]) score_worker[i]++;
                                    else if (workersPerWave[4][q] < workersPerWave[3][q]) score_worker[i]--;
                                    if (workersPerWave[4][q] > workersPerWave[2][q]) score_worker[i]++;
                                    else if (workersPerWave[4][q] < workersPerWave[2][q]) score_worker[i]--;
                                    if (workersPerWave[4][q] > workersPerWave[5][q]) score_worker[i]++;
                                    else if (workersPerWave[4][q] < workersPerWave[5][q]) score_worker[i]--;
                                    if (workersPerWave[4][q] > workersPerWave[6][q]) score_worker[i]++;
                                    else if (workersPerWave[4][q] < workersPerWave[6][q]) score_worker[i]--;
                                    if (workersPerWave[4][q] > workersPerWave[7][q]) score_worker[i]++;
                                    else if (workersPerWave[4][q] < workersPerWave[7][q]) score_worker[i]--;
                                    break;
                                case 6:
                                    if (workersPerWave[5][q] > workersPerWave[0][q]) score_worker[i]++;
                                    else if (workersPerWave[5][q] < workersPerWave[0][q]) score_worker[i]--;
                                    if (workersPerWave[5][q] > workersPerWave[1][q]) score_worker[i]++;
                                    else if (workersPerWave[5][q] < workersPerWave[1][q]) score_worker[i]--;
                                    if (workersPerWave[5][q] > workersPerWave[3][q]) score_worker[i]++;
                                    else if (workersPerWave[5][q] < workersPerWave[3][q]) score_worker[i]--;
                                    if (workersPerWave[5][q] > workersPerWave[4][q]) score_worker[i]++;
                                    else if (workersPerWave[5][q] < workersPerWave[4][q]) score_worker[i]--;
                                    if (workersPerWave[5][q] > workersPerWave[2][q]) score_worker[i]++;
                                    else if (workersPerWave[5][q] < workersPerWave[2][q]) score_worker[i]--;
                                    if (workersPerWave[5][q] > workersPerWave[6][q]) score_worker[i]++;
                                    else if (workersPerWave[5][q] < workersPerWave[6][q]) score_worker[i]--;
                                    if (workersPerWave[5][q] > workersPerWave[7][q]) score_worker[i]++;
                                    else if (workersPerWave[5][q] < workersPerWave[7][q]) score_worker[i]--;
                                    break;
                                case 7:
                                    if (workersPerWave[6][q] > workersPerWave[0][q]) score_worker[i]++;
                                    else if (workersPerWave[6][q] < workersPerWave[0][q]) score_worker[i]--;
                                    if (workersPerWave[6][q] > workersPerWave[1][q]) score_worker[i]++;
                                    else if (workersPerWave[6][q] < workersPerWave[1][q]) score_worker[i]--;
                                    if (workersPerWave[6][q] > workersPerWave[3][q]) score_worker[i]++;
                                    else if (workersPerWave[6][q] < workersPerWave[3][q]) score_worker[i]--;
                                    if (workersPerWave[6][q] > workersPerWave[4][q]) score_worker[i]++;
                                    else if (workersPerWave[6][q] < workersPerWave[4][q]) score_worker[i]--;
                                    if (workersPerWave[6][q] > workersPerWave[5][q]) score_worker[i]++;
                                    else if (workersPerWave[6][q] < workersPerWave[5][q]) score_worker[i]--;
                                    if (workersPerWave[6][q] > workersPerWave[2][q]) score_worker[i]++;
                                    else if (workersPerWave[6][q] < workersPerWave[2][q]) score_worker[i]--;
                                    if (workersPerWave[6][q] > workersPerWave[7][q]) score_worker[i]++;
                                    else if (workersPerWave[6][q] < workersPerWave[7][q]) score_worker[i]--;
                                    break;
                                case 8:
                                    if (workersPerWave[7][q] > workersPerWave[0][q]) score_worker[i]++;
                                    else if (workersPerWave[7][q] < workersPerWave[0][q]) score_worker[i]--;
                                    if (workersPerWave[7][q] > workersPerWave[1][q]) score_worker[i]++;
                                    else if (workersPerWave[7][q] < workersPerWave[1][q]) score_worker[i]--;
                                    if (workersPerWave[7][q] > workersPerWave[3][q]) score_worker[i]++;
                                    else if (workersPerWave[7][q] < workersPerWave[3][q]) score_worker[i]--;
                                    if (workersPerWave[7][q] > workersPerWave[4][q]) score_worker[i]++;
                                    else if (workersPerWave[7][q] < workersPerWave[4][q]) score_worker[i]--;
                                    if (workersPerWave[7][q] > workersPerWave[5][q]) score_worker[i]++;
                                    else if (workersPerWave[7][q] < workersPerWave[5][q]) score_worker[i]--;
                                    if (workersPerWave[7][q] > workersPerWave[6][q]) score_worker[i]++;
                                    else if (workersPerWave[7][q] < workersPerWave[6][q]) score_worker[i]--;
                                    if (workersPerWave[7][q] > workersPerWave[2][q]) score_worker[i]++;
                                    else if (workersPerWave[7][q] < workersPerWave[2][q]) score_worker[i]--;
                                    break;
                                default:
                                    console.log("failed to read " + gameDetail_position);
                                    break;
                            }
    
                        }
                        //if(debug) console.log(workersPerWave);
                        score_worker[i] = score_worker[i] / workersPerWave[0].length;
    
    
                        //VALUE
                        var valuePerWave = [];
                        for (e = 0; e < 4; e++) {
                            valuePerWave[e] = [];
                        }
                        var valuec;
                        for (e = 0; e < 4; e++) {
                            //if(debug) console.log(gameDetailSelected[e].unitsPerWave);
                            gameDetailSelected[e].unitsPerWave.forEach(function (ele) {
                                valuec = 0;
                                ele.forEach(function (ele2) {
                                    var unitname = ele2.substring(0, ele2.indexOf("_unit"));
                                    while (unitname.includes("_")) {
                                        unitname = unitname.replace("_", "");
                                    }
                                    if (unitstats.filter(meinName => meinName.name === unitname)[0] === undefined) {
                                        console.log("failed to look up " + unitname + "'s value");
                                        console.log(gameDetailSelected[e]);
                                    }
                                    else valuec += parseInt(unitstats.filter(meinName => meinName.name === unitname)[0].value);
                                });
                                valuePerWave[e].push(valuec);
                            });
                        }
                        //if(debug) console.log(valuePerWave);
                        for (q = 0; q < valuePerWave[0].length; q++) {
                            switch (gameDetail_position) {
                                case 1:
                                    if (valuePerWave[0][q] > valuePerWave[1][q]) score_value[i]++;
                                    else if (valuePerWave[0][q] < valuePerWave[1][q]) score_value[i]--;
                                    if (valuePerWave[0][q] > valuePerWave[2][q]) score_value[i]++;
                                    else if (valuePerWave[0][q] < valuePerWave[2][q]) score_value[i]--;
                                    if (valuePerWave[0][q] > valuePerWave[3][q]) score_value[i]++;
                                    else if (valuePerWave[0][q] < valuePerWave[3][q]) score_value[i]--;
                                    if (valuePerWave[0][q] > valuePerWave[4][q]) score_value[i]++;
                                    else if (valuePerWave[0][q] < valuePerWave[4][q]) score_value[i]--;
                                    if (valuePerWave[0][q] > valuePerWave[5][q]) score_value[i]++;
                                    else if (valuePerWave[0][q] < valuePerWave[5][q]) score_value[i]--;
                                    if (valuePerWave[0][q] > valuePerWave[6][q]) score_value[i]++;
                                    else if (valuePerWave[0][q] < valuePerWave[6][q]) score_value[i]--;
                                    if (valuePerWave[0][q] > valuePerWave[7][q]) score_value[i]++;
                                    else if (valuePerWave[0][q] < valuePerWave[7][q]) score_value[i]--;
                                    break;
                                case 2:
                                    if (valuePerWave[1][q] > valuePerWave[0][q]) score_value[i]++;
                                    else if (valuePerWave[1][q] < valuePerWave[0][q]) score_value[i]--;
                                    if (valuePerWave[1][q] > valuePerWave[2][q]) score_value[i]++;
                                    else if (valuePerWave[1][q] < valuePerWave[2][q]) score_value[i]--;
                                    if (valuePerWave[1][q] > valuePerWave[3][q]) score_value[i]++;
                                    else if (valuePerWave[1][q] < valuePerWave[3][q]) score_value[i]--;
                                    if (valuePerWave[1][q] > valuePerWave[4][q]) score_value[i]++;
                                    else if (valuePerWave[1][q] < valuePerWave[4][q]) score_value[i]--;
                                    if (valuePerWave[1][q] > valuePerWave[5][q]) score_value[i]++;
                                    else if (valuePerWave[1][q] < valuePerWave[5][q]) score_value[i]--;
                                    if (valuePerWave[1][q] > valuePerWave[6][q]) score_value[i]++;
                                    else if (valuePerWave[1][q] < valuePerWave[6][q]) score_value[i]--;
                                    if (valuePerWave[1][q] > valuePerWave[7][q]) score_value[i]++;
                                    else if (valuePerWave[1][q] < valuePerWave[7][q]) score_value[i]--;
                                    break;
                                case 3:
                                    if (valuePerWave[2][q] > valuePerWave[0][q]) score_value[i]++;
                                    else if (valuePerWave[2][q] < valuePerWave[0][q]) score_value[i]--;
                                    if (valuePerWave[2][q] > valuePerWave[1][q]) score_value[i]++;
                                    else if (valuePerWave[2][q] < valuePerWave[1][q]) score_value[i]--;
                                    if (valuePerWave[2][q] > valuePerWave[3][q]) score_value[i]++;
                                    else if (valuePerWave[2][q] < valuePerWave[3][q]) score_value[i]--;
                                    if (valuePerWave[2][q] > valuePerWave[4][q]) score_value[i]++;
                                    else if (valuePerWave[2][q] < valuePerWave[4][q]) score_value[i]--;
                                    if (valuePerWave[2][q] > valuePerWave[5][q]) score_value[i]++;
                                    else if (valuePerWave[2][q] < valuePerWave[5][q]) score_value[i]--;
                                    if (valuePerWave[2][q] > valuePerWave[6][q]) score_value[i]++;
                                    else if (valuePerWave[2][q] < valuePerWave[6][q]) score_value[i]--;
                                    if (valuePerWave[2][q] > valuePerWave[7][q]) score_value[i]++;
                                    else if (valuePerWave[2][q] < valuePerWave[7][q]) score_value[i]--;
                                    break;
                                case 4:
                                    if (valuePerWave[3][q] > valuePerWave[0][q]) score_value[i]++;
                                    else if (valuePerWave[3][q] < valuePerWave[0][q]) score_value[i]--;
                                    if (valuePerWave[3][q] > valuePerWave[1][q]) score_value[i]++;
                                    else if (valuePerWave[3][q] < valuePerWave[1][q]) score_value[i]--;
                                    if (valuePerWave[3][q] > valuePerWave[2][q]) score_value[i]++;
                                    else if (valuePerWave[3][q] < valuePerWave[2][q]) score_value[i]--;
                                    if (valuePerWave[3][q] > valuePerWave[4][q]) score_value[i]++;
                                    else if (valuePerWave[3][q] < valuePerWave[4][q]) score_value[i]--;
                                    if (valuePerWave[3][q] > valuePerWave[5][q]) score_value[i]++;
                                    else if (valuePerWave[3][q] < valuePerWave[5][q]) score_value[i]--;
                                    if (valuePerWave[3][q] > valuePerWave[6][q]) score_value[i]++;
                                    else if (valuePerWave[3][q] < valuePerWave[6][q]) score_value[i]--;
                                    if (valuePerWave[3][q] > valuePerWave[7][q]) score_value[i]++;
                                    else if (valuePerWave[3][q] < valuePerWave[7][q]) score_value[i]--;
                                    break;
                                case 5:
                                    if (valuePerWave[4][q] > valuePerWave[0][q]) score_value[i]++;
                                    else if (valuePerWave[4][q] < valuePerWave[0][q]) score_value[i]--;
                                    if (valuePerWave[4][q] > valuePerWave[1][q]) score_value[i]++;
                                    else if (valuePerWave[4][q] < valuePerWave[1][q]) score_value[i]--;
                                    if (valuePerWave[4][q] > valuePerWave[3][q]) score_value[i]++;
                                    else if (valuePerWave[4][q] < valuePerWave[3][q]) score_value[i]--;
                                    if (valuePerWave[4][q] > valuePerWave[2][q]) score_value[i]++;
                                    else if (valuePerWave[4][q] < valuePerWave[2][q]) score_value[i]--;
                                    if (valuePerWave[4][q] > valuePerWave[5][q]) score_value[i]++;
                                    else if (valuePerWave[4][q] < valuePerWave[5][q]) score_value[i]--;
                                    if (valuePerWave[4][q] > valuePerWave[6][q]) score_value[i]++;
                                    else if (valuePerWave[4][q] < valuePerWave[6][q]) score_value[i]--;
                                    if (valuePerWave[4][q] > valuePerWave[7][q]) score_value[i]++;
                                    else if (valuePerWave[4][q] < valuePerWave[7][q]) score_value[i]--;
                                    break;
                                case 6:
                                    if (valuePerWave[5][q] > valuePerWave[0][q]) score_value[i]++;
                                    else if (valuePerWave[5][q] < valuePerWave[0][q]) score_value[i]--;
                                    if (valuePerWave[5][q] > valuePerWave[1][q]) score_value[i]++;
                                    else if (valuePerWave[5][q] < valuePerWave[1][q]) score_value[i]--;
                                    if (valuePerWave[5][q] > valuePerWave[3][q]) score_value[i]++;
                                    else if (valuePerWave[5][q] < valuePerWave[3][q]) score_value[i]--;
                                    if (valuePerWave[5][q] > valuePerWave[4][q]) score_value[i]++;
                                    else if (valuePerWave[5][q] < valuePerWave[4][q]) score_value[i]--;
                                    if (valuePerWave[5][q] > valuePerWave[2][q]) score_value[i]++;
                                    else if (valuePerWave[5][q] < valuePerWave[2][q]) score_value[i]--;
                                    if (valuePerWave[5][q] > valuePerWave[6][q]) score_value[i]++;
                                    else if (valuePerWave[5][q] < valuePerWave[6][q]) score_value[i]--;
                                    if (valuePerWave[5][q] > valuePerWave[7][q]) score_value[i]++;
                                    else if (valuePerWave[5][q] < valuePerWave[7][q]) score_value[i]--;
                                    break;
                                case 7:
                                    if (valuePerWave[6][q] > valuePerWave[0][q]) score_value[i]++;
                                    else if (valuePerWave[6][q] < valuePerWave[0][q]) score_value[i]--;
                                    if (valuePerWave[6][q] > valuePerWave[1][q]) score_value[i]++;
                                    else if (valuePerWave[6][q] < valuePerWave[1][q]) score_value[i]--;
                                    if (valuePerWave[6][q] > valuePerWave[3][q]) score_value[i]++;
                                    else if (valuePerWave[6][q] < valuePerWave[3][q]) score_value[i]--;
                                    if (valuePerWave[6][q] > valuePerWave[4][q]) score_value[i]++;
                                    else if (valuePerWave[6][q] < valuePerWave[4][q]) score_value[i]--;
                                    if (valuePerWave[6][q] > valuePerWave[5][q]) score_value[i]++;
                                    else if (valuePerWave[6][q] < valuePerWave[5][q]) score_value[i]--;
                                    if (valuePerWave[6][q] > valuePerWave[2][q]) score_value[i]++;
                                    else if (valuePerWave[6][q] < valuePerWave[2][q]) score_value[i]--;
                                    if (valuePerWave[6][q] > valuePerWave[7][q]) score_value[i]++;
                                    else if (valuePerWave[6][q] < valuePerWave[7][q]) score_value[i]--;
                                    break;
                                case 8:
                                    if (valuePerWave[7][q] > valuePerWave[0][q]) score_value[i]++;
                                    else if (valuePerWave[7][q] < valuePerWave[0][q]) score_value[i]--;
                                    if (valuePerWave[7][q] > valuePerWave[1][q]) score_value[i]++;
                                    else if (valuePerWave[7][q] < valuePerWave[1][q]) score_value[i]--;
                                    if (valuePerWave[7][q] > valuePerWave[3][q]) score_value[i]++;
                                    else if (valuePerWave[7][q] < valuePerWave[3][q]) score_value[i]--;
                                    if (valuePerWave[7][q] > valuePerWave[4][q]) score_value[i]++;
                                    else if (valuePerWave[7][q] < valuePerWave[4][q]) score_value[i]--;
                                    if (valuePerWave[7][q] > valuePerWave[5][q]) score_value[i]++;
                                    else if (valuePerWave[7][q] < valuePerWave[5][q]) score_value[i]--;
                                    if (valuePerWave[7][q] > valuePerWave[6][q]) score_value[i]++;
                                    else if (valuePerWave[7][q] < valuePerWave[6][q]) score_value[i]--;
                                    if (valuePerWave[7][q] > valuePerWave[2][q]) score_value[i]++;
                                    else if (valuePerWave[7][q] < valuePerWave[2][q]) score_value[i]--;
                                    break;
                                default:
                                    console.log("failed to read " + gameDetail_position);
                                    break;
                                }
                            }
                        score_value[i] = score_value[i] / valuePerWave[0].length;
                        //if(debug) console.log(valuePerWave);
                    }


                    var currunit = "", lastunit = "";
                    if (gameDetail.unitsPerWave !== null) {
                        gameDetail.unitsPerWave[0].forEach(function (element) {
                            //e=wave ;x=different units
                            currunit = element.substring(0, element.indexOf("_unit"));
                            if (currunit != lastunit) {
                                var anzahl = 0;
                                for (var x = 0; x < 60; x++) {
                                    if (favunit[x] != 0) {
                                        //unit matching?
                                        if (favunit[x].includes(element.substring(0, element.indexOf("_unit")))) {
                                            anzahl = parseInt(favunit[x].substring(favunit[x].indexOf(";") + 1));
                                            //if(debug) console.log(favunit[x].substring(favunit[x].indexOf(";") + 1));
                                            anzahl++;
                                            //if(debug) console.log(element);
                                            favunit[x] = element.substring(0, element.indexOf("_unit")) + ";" + anzahl;
                                        }
                                    }
                                }
                                //no match, add it
                                if (anzahl === 0) {
                                    for (x = 0; x < 60; x++) {
                                        if (favunit[x] == 0) {
                                            favunit[x] = element.substring(0, element.indexOf("_unit")) + ";1";
                                            break;
                                        }
                                    }
                                }
                            }
                            lastunit = currunit;
                        });
                    }
                    //if (gameDetail.mercsSentPerWave[0].length > 0) sendedOne++;
                    if (gameDetail.mercsReceivedPerWave[0].length > 0 && gameDetail.leaksPerWave[0].length > 0) leakedOne++;
                }
                //check if player sent on 1
                var counterp = 0;
                if (gameDetail_position === 1) counterp = 5;
                else if (gameDetail_position === 2) counterp = 6;
                else if (gameDetail_position === 3) counterp = 7;
                else if (gameDetail_position === 4) counterp = 8;
                else if (gameDetail_position === 5) counterp = 2;
                else if (gameDetail_position === 6) counterp = 1;
                else if (gameDetail_position === 7) counterp = 4;
                else if (gameDetail_position === 8) counterp = 3;
                gameDetail = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === counterp; })[0];
                if (gameDetail.mercsReceivedPerWave[0].length > 0) sendedOne++;
            });
            if(playercount==4) gametype = "normal";
            else gametype = "classic";
            let sendChanceOne = 0, leakChanceOne = 0;
            if (sendedOne > 0) sendChanceOne = (sendedOne / games_count * 100).toFixed(0);
            if (leakedOne > 0) leakChanceOne = (leakedOne / games_count * 100).toFixed(0);
            if(i>=2 && gametype=="normal"){
                document.getElementById("best_legion" + (i + 3)).innerHTML = "Chance to send 1: " + sendChanceOne + "%, Chance to leak 1: " + leakChanceOne + "%";
            }
            else{
                document.getElementById("best_legion" + (i + 1)).innerHTML = "Chance to send 1: " + sendChanceOne + "%, Chance to leak 1: " + leakChanceOne + "%";
            }
            
        }
        else {
            console.log("player " + i + " has no games played");
            if(i>=2 && gametype=="normal"){
                document.getElementById("favstart" + (i + 3)).innerHTML = "No recorded games available.";
            }
            else{
                document.getElementById("favstart" + (i + 1)).innerHTML = "No recorded games available.";
            }
            
        }
        favunit.sort(function (a, b) {
            if (a !== 0) {
                var abstandA = a.indexOf(";") + 1;
                var lastA = a.substring(abstandA, a.length);
            }
            else lastA = 0;
            if (b !== 0) {
                var abstandB = b.indexOf(";") + 1;
                var lastB = b.substring(abstandB, b.length);
            }
            else lastB = 0;
            if (parseInt(lastA) < parseInt(lastB)) {
                return 1;
            } else if (parseInt(lastA) > parseInt(lastB)) {
                return -1;
            } else {
                return 0;
            }
        });
        //check leaks with favunits 0-2
        var gamesWithFav_count = 0;
        if (parsedPlayer[i].games === null) {
            parsedPlayer[i].games.games.forEach(function (ele) {
                var gamesWithFav_bool = false;
                var gameDetail = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.playerProfile.name == parsedPlayer[i].name })[0];
                if (gameDetail) {
                    for (var x = 0; x < gameDetail.leaksPerWave.length; x++) {
                        //if(debug) console.log(gameDetail.leaksPerWave[x]);
                        var leaked = false;
                        gameDetail.unitsPerWave[x].forEach(function (element) {
                            //if(debug) console.log(favunit);
                            try {
                                favunit.forEach(function (favele) {
                                    if (favele != 0) {
                                        if (favele.substring(0, favele.indexOf(";")) == element.substring(0, element.indexOf("_unit"))) {
                                            gamesWithFav_bool = true;
                                        }
                                    }
                                });
                            }
                            catch (error) {
                                console.log(error);
                            }
                        });
                    }
                    if (gamesWithFav_bool) {
                        gamesWithFav_count++;
                    }

                }

            });
        }
        if(i>=2 && gametype=="normal"){
            document.getElementById("leaks" + (i + 3)).innerHTML = document.getElementById("leaks" + (i + 3)).innerHTML.substring(0, document.getElementById("leaks" + (i + 3)).innerHTML.length - 2);
        }
        else{
            document.getElementById("leaks" + (i + 1)).innerHTML = document.getElementById("leaks" + (i + 1)).innerHTML.substring(0, document.getElementById("leaks" + (i + 1)).innerHTML.length - 2);
        }
        

        //if(debug) console.log(favunit);
        for (var x = 0; x < favunit.length; x++) {
            if (favunit[x] != 0) {
                try {
                    var unit = favunit[x].substring(0, favunit[x].indexOf(";"));
                    var count = favunit[x].substring(favunit[x].indexOf(";") + 1);
                    var chance = ((count / games_count) * 100).toFixed(2);
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
                    }
                    url += ".png";
                    //if(debug) console.log(unit, count);
                    //if(debug) console.log(parsedPlayer[i].playername);
                    if(i>=2 && gametype=="normal"){
                        document.getElementById("favstart" + (i + 3)).innerHTML += "<div class='favunits_div' id='favstart_li" + (i + 3) + x + "' onclick='getFighterGames(\"" + unit + "\",\"" + parsedPlayer[i].name + "\")'><img class='unitimg' src=" + url + ">" + unit_type + "(" + chance + "%)</div>";
                    }
                    else{
                        document.getElementById("favstart" + (i + 1)).innerHTML += "<div class='favunits_div' id='favstart_li" + (i + 1) + x + "' onclick='getFighterGames(\"" + unit + "\",\"" + parsedPlayer[i].name + "\")'><img class='unitimg' src=" + url + ">" + unit_type + "(" + chance + "%)</div>";
                    }
                    
                    //document.getElementById("unitselector"+i).options[x] = new Option(unit_type,unit_type);
                }
                catch (error) {
                    console.log(error);
                }
            }

        }
        //console.log(favunit);
    }

    var friends = [];
    for (i = 0; i < 4; i++) {
        friends[i] = [];
    }

    //check for duo synergy
    try {
        for (i = 0; i < 4; i++) {
            if (parsedPlayer[i].bestFriends !== undefined) {
                //if(debug) console.log(parsedPlayer[i].bestFriends);
                for (var e = 0; e < parsedPlayer[i].bestFriends.length; e++) {
                    //if(debug) console.log(parsedPlayer[i].bestFriends[e]);
                    friends[i][e] = parsedPlayer[i].bestFriends[e].player.name;
                }
            }
        }
    }
    catch (err) {
        console.log(err);
    }
    // TODO ADD CLASSIC
    var meinCounter = 0;
    friends.forEach(function (ele) {
        //if(debug) console.log(ele);
        if ((meinCounter === 0 || meinCounter === 1) && (ele.includes(parsedPlayer[0].name) || ele.includes(parsedPlayer[1].name))) {
            //west duo
            duoWest = true;
        }
        if ((meinCounter === 2 || meinCounter === 3) && (ele.includes(parsedPlayer[2].name) || ele.includes(parsedPlayer[3].name))) {
            //west duo
            duoEast = true;
        }
        meinCounter++;
    });
    if (duoWest) {
        document.getElementById("name1").innerHTML += " (friends)";
        document.getElementById("name2").innerHTML += " (friends)";
    }
    if (duoEast) {
        document.getElementById("name5").innerHTML += " (friends)";
        document.getElementById("name6").innerHTML += " (friends)";
    }
    //if(debug) console.log(duoWest + ", " + duoEast);
    //add win/loses indicator
    try {
        for (i = 0; i < parsedPlayer.length; i++) {
            winsFive[i] = 5;
            if(i>=2 && gametype=="normal"){
                document.getElementById("name" + (i + 3)).innerHTML += " <div class='gameresults' id='gameresult" + (i + 3) + "'></div>";
            }
            else{
                document.getElementById("name" + (i + 1)).innerHTML += " <div class='gameresults' id='gameresult" + (i + 1) + "'></div>";
            }
           
            for (e = 0; e < 5; e++) {
                if (parsedPlayer[i].games.games.length < 5 && e === 0) e = 5 - games.games.length;
                if (parsedPlayer[i].games.games[e] !== undefined) {
                    if(i>=2 && gametype=="normal"){
                        var gameDetail = parsedPlayer[i].games.games[e].gameDetails.filter(function (gameDetail) { return gameDetail.playerProfile.name === parsedPlayer[i].name; })[0];
                        if (gameDetail.gameResult === "won") document.getElementById("gameresult" + (i + 3)).innerHTML += "W";
                        else if (gameDetail.gameResult === "tied") document.getElementById("gameresult" + (i + 3)).innerHTML += "T";
                        else {
                            document.getElementById("gameresult" + (i + 3)).innerHTML += "L";
                            winsFive[i]--;
                        }
                        if (e < 4) document.getElementById("gameresult" + (i + 3)).innerHTML += "/";
                    }
                    else{
                        var gameDetail = parsedPlayer[i].games.games[e].gameDetails.filter(function (gameDetail) { return gameDetail.playerProfile.name === parsedPlayer[i].name; })[0];
                        if (gameDetail.gameResult === "won") document.getElementById("gameresult" + (i + 1)).innerHTML += "W";
                        else if (gameDetail.gameResult === "tied") document.getElementById("gameresult" + (i + 1)).innerHTML += "T";
                        else {
                            document.getElementById("gameresult" + (i + 1)).innerHTML += "L";
                            winsFive[i]--;
                        }
                        if (e < 4) document.getElementById("gameresult" + (i + 1)).innerHTML += "/";
                    }
                    
                }

            }

        }
    }
    catch (err) {
        console.log(err);
    }

    var player_roles_worker = ["", "", "", ""];
    var player_roles_value = ["", "", "", ""];
    for (var xy = 0; xy < playercount; xy++) {
        if(xy>=2 && gametype=="normal"){
            //worker
            score_worker[xy] = score_worker[xy] / game_count[xy];
            if (score_worker[xy] < 0.01 && score_worker[xy] > -0.01) player_roles_worker[xy] = "Even Worker";
            else if (score_worker[xy] > 0.05) player_roles_worker[xy] = "Very High Worker";
            else if (score_worker[xy] < -0.05) player_roles_worker[xy] = "Very Low Worker";
            else if (score_worker[xy] < -0.01 && score_worker[xy] > -0.05) player_roles_worker[xy] = "Low Worker";
            else if (score_worker[xy] < 0.05 && score_worker[xy] > 0.01) player_roles_worker[xy] = "High Worker";
            document.getElementById("name" + (xy + 3)).innerHTML += " (" + player_roles_worker[xy];
            //value
            score_value[xy] = score_value[xy] / game_count[xy];
            if (score_value[xy] < 0.01 && score_value[xy] > -0.01) player_roles_value[xy] = "Even Value";
            else if (score_value[xy] > 0.05) player_roles_value[xy] = "Very High Value";
            else if (score_value[xy] < -0.05) player_roles_value[xy] = "Very Low Value";
            else if (score_value[xy] < -0.01 && score_value[xy] > -0.05) player_roles_value[xy] = "Low Value";
            else if (score_value[xy] < 0.05 && score_value[xy] > 0.01) player_roles_value[xy] = "High Value";
            document.getElementById("name" + (xy + 3)).innerHTML += ", " + player_roles_value[xy] + ")";
        }
        else{
            //worker
            score_worker[xy] = score_worker[xy] / game_count[xy];
            if (score_worker[xy] < 0.01 && score_worker[xy] > -0.01) player_roles_worker[xy] = "Even Worker";
            else if (score_worker[xy] > 0.05) player_roles_worker[xy] = "Very High Worker";
            else if (score_worker[xy] < -0.05) player_roles_worker[xy] = "Very Low Worker";
            else if (score_worker[xy] < -0.01 && score_worker[xy] > -0.05) player_roles_worker[xy] = "Low Worker";
            else if (score_worker[xy] < 0.05 && score_worker[xy] > 0.01) player_roles_worker[xy] = "High Worker";
            document.getElementById("name" + (xy + 1)).innerHTML += " (" + player_roles_worker[xy];
            //value
            score_value[xy] = score_value[xy] / game_count[xy];
            if (score_value[xy] < 0.01 && score_value[xy] > -0.01) player_roles_value[xy] = "Even Value";
            else if (score_value[xy] > 0.05) player_roles_value[xy] = "Very High Value";
            else if (score_value[xy] < -0.05) player_roles_value[xy] = "Very Low Value";
            else if (score_value[xy] < -0.01 && score_value[xy] > -0.05) player_roles_value[xy] = "Low Value";
            else if (score_value[xy] < 0.05 && score_value[xy] > 0.01) player_roles_value[xy] = "High Value";
            document.getElementById("name" + (xy + 1)).innerHTML += ", " + player_roles_value[xy] + ")";
        }
        
        

    }
    getWinchance();
}

function getPlayerLevel(totalXp) {
    if (totalXp < 1) return 1;
    if (totalXp < 1001) return 2;
    if (totalXp < 3001) return 3;
    if (totalXp < 7001) return 4;
    if (totalXp < 13001) return 5;
    if (totalXp < 21001) return 6;
    if (totalXp < 31001) return 7;
    if (totalXp < 43001) return 8;
    if (totalXp < 57001) return 9;
    if (totalXp < 73001) return 10;
    if (totalXp < 91001) return 11;
    if (totalXp < 111001) return 12;
    if (totalXp < 133001) return 13;
    if (totalXp < 157001) return 14;
    if (totalXp < 183001) return 15;
    if (totalXp < 211001) return 16;
    if (totalXp < 241001) return 17;
    if (totalXp < 273001) return 18;
    if (totalXp < 307001) return 19;
    if (totalXp < 343001) return 20;
    if (totalXp < 381001) return 21;
    if (totalXp < 421001) return 22;
    if (totalXp < 463001) return 23;
    if (totalXp < 507000) return 24;
    if (totalXp < 553001) return 25;
    if (totalXp < 601001) return 26;
    if (totalXp < 651001) return 27;
    if (totalXp < 703001) return 28;
    if (totalXp < 757001) return 29;
    if (totalXp < 813001) return 30;
    if (totalXp < 871001) return 31;
    if (totalXp < 931001) return 32;
    if (totalXp < 993001) return 33;
    if (totalXp < 1057001) return 34;
    return 35;
}
// todo: click first
function getFighterGames(fightername, playername) {
    var leaks = [];
    for (var i = 0; i < 22; i++) {
        leaks[i] = 0;
    }
    var fightercount_pick = 0;
    if(debug) console.log(playername);
    if(debug) console.log(parsedPlayer);
    var selectedPlayer = parsedPlayer.filter(function (filterGames) { return filterGames.name == playername })[0];
    if(debug) console.log(selectedPlayer);
    var selectedGames = selectedPlayer.games.games;
    selectedGames.forEach(function (ele) {
        gameDetail = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.playerProfile.name == playername })[0];
        if (typeof gameDetail !== "undefined") {
            if (typeof gameDetail.unitsPerWave[0] !== "undefined") {
                //check units on 1
                //more than 1 unit
                var target_pos;
                if (gameDetail.unitsPerWave[0].length > 1) {
                    //for each unit built on 1
                    for (var i = 0; i < gameDetail.unitsPerWave[0].length; i++) {
                        //unit matching?
                        if (gameDetail.unitsPerWave[0][i].includes(fightername)) {
                            fightercount_pick++;
                            if (gameDetail.leaksPerWave.length > 0) {
                                for (i = 0; i < gameDetail.leaksPerWave.length; i++) {
                                    if (gameDetail.leaksPerWave[i].length > 0) {
                                        switch (gameDetail.position) {
                                            case 1:
                                                target_pos = 6;
                                                break;
                                            case 2:
                                                target_pos = 5;
                                                break;
                                            case 3:
                                                target_pos = 1;
                                                break;
                                            case 4:
                                                target_pos = 2;
                                                break;
                                        }
                                        var gameDetail_oponent = ele['gameDetails'].filter(function (gameDetail_oponent) { return gameDetail_oponent.position == target_pos })[0];
                                        leaks[i]++;
                                    }
                                }
                            }
                            break; //?
                        }
                    }
                }
                //1 unit only
                else {
                    if (gameDetail.unitsPerWave[0].length > 0) {
                        if (gameDetail.unitsPerWave[0][0].includes(fightername)) {
                            fightercount_pick++;
                            if (gameDetail.leaksPerWave.length > 0) {
                                for (var i = 0; i < gameDetail.leaksPerWave.length; i++) {
                                    if (gameDetail.leaksPerWave[i].length > 0) {
                                        switch (gameDetail.position) {
                                            case 1:
                                                target_pos = 6;
                                                break;
                                            case 2:
                                                target_pos = 5;
                                                break;
                                            case 3:
                                                target_pos = 1;
                                                break;
                                            case 4:
                                                target_pos = 2;
                                                break;
                                        }
                                        //var gameDetail_oponent = ele['gameDetails'].filter(function (gameDetail_oponent) { return gameDetail_oponent.position == target_pos })[0];
                                        leaks[i]++;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    if(debug) console.log(leaks);
    var spot = 0;
    for (var i = 0; i < playercount; i++) {
        if (parsedPlayer[i].name == playername) {
            spot = i + 1;
        }
    }
    if(playercount==4 && spot > 2){
        spot = spot + 2;
    }

    document.getElementById("leaks" + spot).innerHTML = "Leaks: ";
    for (var i = 0; i < leaks.length; i++) {
        if (leaks[i] > 0) {
            var chance = ((leaks[i] / fightercount_pick) * 100).toFixed(2);
            if (chance > 20) {
                document.getElementById("leaks" + spot).innerHTML += i + 1 + " (" + (leaks[i] / fightercount_pick * 100).toFixed(0) + "%), ";
            }
        }
    }
    document.getElementById("leaks" + spot).innerHTML = document.getElementById("leaks" + spot).innerHTML.substring(0, document.getElementById("leaks" + spot).innerHTML.length - 2);
}



function getWinchance() {
    var elos = [];
    var peakElos = [];
    var bonus_w = 0; bonus_e = 0;
    for (var i = 0; i < parsedPlayer.length; i++) {
        //if(debug) console.log(parsedPlayer[i]);
        if (parsedPlayer[i].statistics.overallElo !== undefined) elos.push(parsedPlayer[i].statistics.overallElo);
        else elos.push(1000);
        if (parsedPlayer[i].statistics.overallPeakEloThisSeason !== undefined) peakElos.push(parsedPlayer[i].statistics.overallPeakEloThisSeason);
        else peakElos.push(1000);
        if (parsedPlayer[i].statistics.winStreak > 5 && i < 3) bonus_w += 5;
        else if (parsedPlayer[i].statistics.winStreak > 5 && i > 2) bonus_e += 5;
    }
    if(gametype=="normal"){
        var elo_west = parseFloat((elos[0] * 0, 5 + elos[1] * 0, 5 + peakElos[0] * 1 + peakElos[1] * 1) / 4);
        var elo_east = parseFloat((elos[2] * 0, 5 + elos[3] * 0, 5 + peakElos[2] * 1 + peakElos[3] * 1) / 4);
    }
    else{
        var elo_west = parseFloat((elos[0] * 0, 5 + elos[1] * 0, 5 + elos[2] * 0, 5 + elos[3] * 0, 5 + peakElos[0] * 1 + peakElos[1] * 1 + peakElos[3] * 1 + peakElos[4] * 1) / 8);
        var elo_east = parseFloat((elos[5] * 0, 5 + elos[6] * 0, 5 + elos[7] * 0, 5 + elos[8] * 0, 5 + peakElos[5] * 1 + peakElos[6] * 1 + peakElos[7] * 1 + peakElos[8] * 1) / 8);
    }
   
    var winchance = 50 * (elo_west / elo_east);
    /*for (i = 0; i < 4; i++) {
        if (i < 3) winchance += winsFive[i];
        else winchance -= winsFive[i];
    }
    winchance = winchance + bonus_w - bonus_e;*/
    if (winchance < 0 || winchance > 100) winchance = 50;
    if (duoWest) winchance = winchance + 5;
    if (duoEast) winchance = winchance - 5;
    var elem = document.getElementById("myBar");
    var elem2 = document.getElementById("myBar2");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= winchance || width > 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = "West: " + width * 1 + '%';
            elem2.style.width = (100 - width) + '%';
            elem2.innerHTML = "East: " + (100 - width * 1) + '%';
        }
    }
    document.getElementById("winchancebar").style.display = "";

}

document.onkeydown = function (event) {
    if (event.keyCode === 13) {
        if (event.target.id === "playername" || event.target.id === "playername2") getPlayer();
    }
};

function showPlayerDetails(nummer) {
    const details_box = document.getElementById("player_details_box");
    const details_content = document.getElementById("playername_details");
    details_box.style.display = "";
    parsedPlayer = [];
    if(livegame.players.length == 4 && nummer >= 2) nummer=nummer-2;
    for (var i = 0; i < livegame.players.length; i++) {
        parsedPlayer[i] = allPlayers.filter(function (filteredPlayer) { return filteredPlayer.name == livegame.players[i] })[0];
    }
    details_content.innerHTML += "<h3>" + parsedPlayer[nummer].name + "' Season 8 Stats (<a href='/profile?player=" + parsedPlayer[nummer].name + "' target='_blank'>Profile</a>)</h3>";
    selectedPlayerName = parsedPlayer[nummer].name;
    queryPlayerGames(selectedPlayerName);
}

function hidePlayerDetails() {
    document.getElementById("player_details_box").style.display = "none";
    document.getElementById("playername_details").innerHTML = "";
}

function showLivegame(name) {
    document.getElementById("playername").value = name;
    document.getElementById("playername2").value = name;
    window.history.pushState('livegame', 'Livegame', '?playername=' + document.getElementById("playername2").value);
    checkContent();
}

function listGames(livegames) {
    var classiccontainer = document.getElementById("classicgames");
    var normalcontainer = document.getElementById("normalgames");
    //if(debug) console.log(livegames);
    if (livegames) {
        var counter_r = 0, counter_c = 0;
        for (var i = livegames.length - 1; i > -1; i--) {
            var currgame = livegames[i];
            var time1 = new Date(currgame.ts);
            var time2 = new Date();
            var timediff = time2 - time1;
            var minutes = (timediff / 1000 / 60).toFixed(0);
            var seconds = (timediff / 1000 % 60).toFixed(0);
            var minutes_str = "", seconds_str = "";
            if (minutes.toString().length < 2) minutes_str = "0" + minutes;
            else minutes_str = minutes.toString();
            if (seconds.toString().length < 2) seconds_str = "0" + minutes;
            else seconds_str = seconds.toString();
            //if(debug) console.log(currgame);
            if (currgame.gametype === "classic") {
                classiccontainer.innerHTML += 
                "<div class='game_row_4v4' onclick='showLivegame(\"" + currgame.players[0] + "\")'>" +
                    "<b><div class='teamwest'>" + 
                        "<div class='playerlist4'>" + currgame.players[0] + "</b>(" + currgame.elos[0] + "), <b> </div>" +
                        "<div class='playerlist4'>" + currgame.players[1] + "</b>(" + currgame.elos[1] + "), <b> </div>" + 
                        "<div class='playerlist4'>" + currgame.players[2] + "</b>(" + currgame.elos[2] + "), <b> </div>" + 
                        "<div class='playerlist4'>" + currgame.players[3] + "</b>(" + currgame.elos[3] + ") </div>" + 
                    "</div>" +
                    "<div class='midvs'>"
                        + minutes_str + ":" + seconds_str +
                    "</div>"+
                    "<div class='teameast'><b>" + 
                        "<div class='playerlist4'>" + currgame.players[4] + "</b>(" + currgame.elos[4] + "), <b> </div>" + 
                        "<div class='playerlist4'>" + currgame.players[5] + "</b>(" + currgame.elos[5] + "), <b> </div>" + 
                        "<div class='playerlist4'>" + currgame.players[6] + "</b>(" + currgame.elos[6] + "), <b> </div>" + 
                        "<div class='playerlist4'>" + currgame.players[7] + "</b>(" + currgame.elos[7] + ") </div>" + 
                    "</div>" +
                "</div><br>"
                counter_c++;
            }
            else {
                normalcontainer.innerHTML += 
                "<div class='game_row'  onclick='showLivegame(\"" + currgame.players[0] + "\")'><b>" +
                    "<div class='teamwest'>" +
                        "<div class='playerlist2'>" + currgame.players[0] + "</b>(" + currgame.elos[0] + "), <b> </div>" + 
                        "<div class='playerlist2'>" + currgame.players[1] + "</b>(" + currgame.elos[1] + ") </div>" +
                    "</div>" +
                    "<div class='midvs'>" + 
                        minutes_str + ":" + seconds_str + 
                    "</div>" +
                    "<div class='teameast'><b>" + 
                        "<div class='playerlist2'>" + currgame.players[2] + "</b>(" + currgame.elos[2] + "), <b> </div>" + 
                        "<div class='playerlist2'>" + currgame.players[3] + "</b>(" + currgame.elos[3] + ") </div>"+
                    "</div>"+
                "</div><br>";
                counter_r++;
            }

        }
        if (counter_c === 0) classiccontainer.innerHTML = "No active games found.";
        if (counter_r === 0) normalcontainer.innerHTML = "No active games found.";
    }
    else {
        normalcontainer.innerText = "No games found.";
        console.log(livegames);
    }
}



checkLink();
queryAllLivegames();

function apiGetPlayer(callback, playername) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var player = JSON.parse(xhttp.response);
            callback(player);
        }
    };
    xhttp.open("GET", '/api/profile/player100?playername=' + playername, true);
    xhttp.send();
}

function queryPlayer(playername) {
    apiGetPlayer(function (result) {
        if (!result.player) {
            console.log("Failed to load player:");
            console.log(playername);
            console.log(result);
            allPlayers.push({ "playername": "Bot (player not found)", "statistics": {}, "bestFriends": [], "games": [] });
            document.getElementById("loadingstring").innerHTML = "Requesting players... " + allPlayers.length + "/4";
            //document.getElementById("apierror").style.display = "";
        }
        else {
            result.player.statistics = JSON.parse(result.player.statistics);
            player = result.player;
            allPlayers.push(player);
            document.getElementById("loadingstring").innerHTML = "Requesting players... " + allPlayers.length + "/4";
            //finished loading
            if (allPlayers.length === livegame.players.length) {
                document.getElementById("west").style.display = "";
                document.getElementById("east").style.display = "";
                if(livegame.players.length == 8){
                    //classic css changes
                    document.getElementById("player3").style.display="";
                    document.getElementById("player4").style.display="";
                    document.getElementById("player7").style.display="";
                    document.getElementById("player8").style.display="";
                    document.getElementsByClassName("teamcard")[0].style.height = "80%";
                    document.getElementsByClassName("teamcard")[0].style.maxHeight = "80%";
                    document.getElementsByClassName("teamcard")[1].style.height = "80%";
                    document.getElementsByClassName("teamcard")[1].style.maxHeight = "80%";
                    for(var i=1;i<9;i++){
                        document.getElementById("player"+i).style.height="45%";
                    }
                }
                parsePlayers();
                document.getElementById("loadingstring").innerHTML = "";

            }
            return player;
        }

    }, playername);
}

function switchListView(){
    var classiccontainer = document.getElementById("classicgames");
    var normalcontainer = document.getElementById("normalgames");

    var indermitte = document.getElementById("indermitte");
    //normal active
    if(normalcontainer.style.display==""){
        classiccontainer.style.display="";
        normalcontainer.style.display="none";
        indermitte.style.width="90%";
    }
    else{
        classiccontainer.style.display="none";
        normalcontainer.style.display="";
        indermitte.style.width="80%";
    }
}

function getAllLivegames(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var livegames = JSON.parse(xhttp.response);
            //if(debug) console.log(livegames);
            callback(livegames);
        }
        else if (this.status === 500) document.getElementById("apierror").style.display = "";
    };
    xhttp.open("GET", '/api/getLivegames', true);
    xhttp.send();
}

function queryAllLivegames() {
    getAllLivegames(function (result, err) {
        livegames = JSON.parse(result);
        if (livegames) {
            listGames(livegames);
            return livegames;
        }
        else {
            console.log(err);
            document.getElementById("apierror").style.display = "";
        }

    });
}


function sqlGetLivegame(callback, playername) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var livegame = JSON.parse(xhttp.response);
            callback(livegame);
        }
        else if (this.status === 500) document.getElementById("apierror").style.display = "";
    };
    xhttp.open("GET", '/sql/getLivegame?playername=' + playername, true);
    xhttp.send();

}

function queryLivegame(playername) {
    document.getElementById("loadingstring").innerHTML = "Requesting Livegame...";
    sqlGetLivegame(function (result) {
        livegame = JSON.parse(result);
        //if(debug) console.log(livegame);
        if (livegame) {
            livegame.players.forEach(function (ele) {
                queryPlayer(ele);
            });
        }
        else {
            document.getElementById("apierror").style.display = "";
        }
        return livegame;
    }, playername);
}

