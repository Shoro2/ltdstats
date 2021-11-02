/*
Author: GvR Mr Mister / Shoro2
ltdstats.com/profile
*/
var debug = true;



function checkContent() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var playerurl = url.searchParams.get("player");
    if (playerurl !== null) {
        document.getElementById("playername").value = playerurl;
    }
    if (document.getElementById("playername").value) {
        document.getElementById("mitte").style.display = "inherit";
        document.getElementById("googlead").style.display="none";
        document.getElementById("stats").style.display="";
        queryPlayer(playerurl);
        queryLivegames();
        //queryRank(playerurl);
        
    }
    else {
        openTab(1);
    }
}

function setPlayer() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var playerurl = url.searchParams.get("player");
    document.getElementById("placeholder").style.display="none";
    var plname = document.getElementById("playername").value;
    if (plname.length==0) plname = document.getElementById("playername2").value;
    if (playerurl === null) {
        window.location.href = window.location.href + "?player=" + plname;
    }
    else {
        window.location.href = "/profile" + "?player=" + plname;
    }

}

function loadEloGraphProfile(games) {
    var graphData = [];
    var counter = 0;
    games.forEach(function (myEle) {
        try{
			if (myEle.queueType == "Normal") {
                var gameDetail = myEle['gameDetails'].filter(function (gameDetail) { return gameDetail.playerProfile.name == player_name; })[0];
                graphData.push({elo: gameDetail.overallElo, date: myEle.ts.substring(0, myEle.ts.indexOf("T"))});
            }
		}
		catch(err){
			console.log("Error loading game: ");
			console.log(err);
			console.log(myEle);
		}
    });
    graphData.reverse();
    document.getElementById("tab_box_2").innerHTML = "<div class='profile'><h1 id='player_name'>" + player_name + "</h1><div id='chart-container'><canvas id='myChart'></canvas></div></div>";
    var ctx = document.getElementById("myChart");
    ctx.height = 500;
    ctx.width = 1000;
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Elo',
                data: [],
                backgroundColor: [
                    'rgba(255, 0, 0, 0.9)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });

    graphData.forEach(function(ele){
        addData(myChart, ele.date, ele.elo)
    });
}

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();

}

function loadGames() {
    getGameDetailsProfile();
}

function loadStats(player) {
    console.log(player);
    try{
        player_name = player.name;
        player_id = player.id;
        player_icon = player.avatarUrl;
        player_icon = "/img/i"+player_icon.substring(1);
        //general
        player_totalgames = player.statistics.gamesPlayed; //total ranked games
        player_totalwins = player.statistics.wins; //overall ranked wins
        if (typeof player.statistics.wins == 'undefined') player_totalwins = 0;
        player_totalwinchance = player.statistics.winRate;
        if (player_totalwinchance == 'NaN') player_totalwinchance = 0;
        player_ties = player.statistics.ties;
        if (typeof player.statistics.ties == 'undefined') player_ties = 0;
        player_quits = player.statistics.quits;
        if (typeof player.statistics.quits == 'undefined') player_quits = 0;
        player_overall_elo = player.statistics.overallElo; //current elo season
        if (typeof player.statistics.overallPeakElo == 'undefined') player_overall_peakelo = player.statistics.overallPeakEloThisSeason;
        else player_overall_peakelo = player.statistics.overallPeakElo;
        player_overall_xp = player.statistics.totalXp;
        player_overall_level = getPlayerLevel(player_overall_xp);
        player_winningstreak = player.statistics.winStreak;
        player_bestfriends = "";
        if (player.bestFriends !== undefined && player.bestFriends[0]!== undefined) {
        
            player_bestfriends += player.bestFriends[0].player.name + " (" + player.bestFriends[0].gameCount + ")";
            if (player.bestFriends[1].player !== null) {
                player_bestfriends += ", " + player.bestFriends[1].player.name + " (" + player.bestFriends[1].gameCount + ")";
                if (player.bestFriends[2].player !== null) {
                    player_bestfriends += ", " + player.bestFriends[2].player.name + " (" + player.bestFriends[2].gameCount + ")";
                }
            }
        }

        if(typeof player.statistics.rankedTiesThisSeason == 'undefined') player_seasonal_ties = 0;
        player_seasonal_wins = player.statistics.rankedWinsThisSeason;
        player_seasonal_losses = player.statistics.rankedLossesThisSeason;
        player_seasonal_games = player_seasonal_wins + player_seasonal_losses + player_seasonal_ties;

        player_seasonal_classic_wins = player.statistics.classicWinsThisSeason;
        player_seasonal_classic_losses = player.statistics.classicLossesThisSeason;
        player_seasonal_classic_games = player_seasonal_classic_wins + player_seasonal_classic_losses;
        player_seasonal_classic_elo = player.statistics.classicElo;
        player_seasonal_classic_peakelo = player.statistics.classicPeakEloThisSeason;

        player_atlantean_games = player.statistics.atlanteanPlayed;
        if(!player_atlantean_games) player_atlantean_games = 0;
        player_atlantean_wins = player.statistics.atlanteanWins;
        if(!player_atlantean_wins) player_atlantean_wins= 0;
        player_element_games = player.statistics.elementPlayed;
        if(!player_element_games) player_element_games= 0;
        player_element_wins = player.statistics.elementWins;
        if(!player_element_wins) player_element_wins= 0;
        player_grove_games = player.statistics.grovePlayed;
        if(!player_grove_games)player_grove_games = 0;
        player_grove_wins = player.statistics.groveWins;
        if(!player_grove_wins)player_grove_wins = 0;
        player_mech_games = player.statistics.mechPlayed;
        if(!player_mech_games) player_mech_games= 0;
        player_mech_wins = player.statistics.mechWins;
        if(!player_mech_wins)player_mech_wins = 0;
        player_forsaken_games = player.statistics.forsakenPlayed;
        if(!player_forsaken_games)player_forsaken_games = 0;
        player_forsaken_wins = player.statistics.forsakenWins;
        if(!player_forsaken_wins)player_forsaken_wins = 0;
        player_nomad_games = player.statistics.nomadPlayed;
        if(!player_nomad_games)player_nomad_games = 0;
        player_nomad_wins = player.statistics.nomadWins;
        if(!player_nomad_wins) player_nomad_wins= 0;
        player_shrine_games = player.statistics.shrinePlayed;
        if(!player_shrine_games) player_shrine_games = 0;
        player_shrine_wins = player.statistics.shrineWins;
        if(!player_shrine_wins) player_shrine_wins= 0;
        
        //icon für race mit meisten wins
        var bgimage = "mastermind_2.png";
        //parse
        document.getElementById("player_name1").textContent = player_name;
        document.getElementById("player_elo1").textContent = player_overall_elo + " (" + player_overall_peakelo + ")";
        //badges
        if (player_overall_level < 10) {
            document.getElementById("playerbadge_level").innerHTML = "<img id='img_level' src='/img/icons/0" + player_overall_level + ".png'>";
        }
        else {

            document.getElementById("playerbadge_level").innerHTML = "<img id='img_level' src='/img/icons/" + player_overall_level + ".png'>";
        }
        //console.log(player_overall_level);
        if (!player_overall_elo) document.getElementById("playerbadge_rank").innerHTML = "<img id='img_rank' src='/img/icons/Ranks/Unranked.png'>";
        else if (player_overall_elo > 0 && player_overall_elo < 1200) document.getElementById("playerbadge_rank").innerHTML = "<img id='img_rank' src='/img/icons/Ranks/Bronze.png'>";
        else if (player_overall_elo > 1200 && player_overall_elo < 1400) document.getElementById("playerbadge_rank").innerHTML = "<img id='img_rank' src='/img/icons/Ranks/Silver.png'>";
        else if (player_overall_elo > 1400 && player_overall_elo < 1600) document.getElementById("playerbadge_rank").innerHTML = "<img id='img_rank' src='/img/icons/Ranks/Gold.png'>";
        else if (player_overall_elo > 1600 && player_overall_elo < 1800) document.getElementById("playerbadge_rank").innerHTML = "<img id='img_rank' src='/img/icons/Ranks/Platinum.png'>";
        else if (player_overall_elo > 1800 && player_overall_elo < 2000) document.getElementById("playerbadge_rank").innerHTML = "<img id='img_rank' src='/img/icons/Ranks/Diamond.png'>";
        else if (player_overall_elo > 2000 && player_overall_elo < 2200) document.getElementById("playerbadge_rank").innerHTML = "<img id='img_rank' src='/img/icons/Ranks/Expert.png'>";
        else if (player_overall_elo > 2200 && player_overall_elo < 2400) document.getElementById("playerbadge_rank").innerHTML = "<img id='img_rank' src='/img/icons/Ranks/SeniorMaster.png'>";
        else if (player_overall_elo > 2400) document.getElementById("playerbadge_rank").innerHTML = "<img id='img_rank' src='/img/icons/Ranks/Grandmaster.png'>";
        // mouseover details
        parseStats();
        document.getElementsByClassName("main-content")[0].setAttribute("style", "background-image: url('/img/" + bgimage + "');background-repeat: no-repeat;background-position:center;background-size: 23% 40%;opacity:1.0;");
        document.title = "LTDStats - " + player_name + "'s Profile";

        document.getElementById("player_icon1").innerHTML ="<img id='img_playericon' src='"+player_icon+"'></img>";
    }
    catch(err){
        console.log("Failed to load player: "+err);
        console.log(player);
    }
    
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

//parses stats into profile tab1
function parseStats() {
    // top
    document.getElementById("playerLevel").textContent = "Level: " + player_overall_level + " (" + player_overall_xp + " XP)";
    // general

    
    document.getElementById("winStreak").textContent = "Winningstreak: " + player_winningstreak;
    // seasonal
    document.getElementById("s_rankedGames").textContent = "Ranked Games: " + player_seasonal_games;
    document.getElementById("s_rankedWins").textContent = "Ranked Wins: " + player_seasonal_wins + " ("+(player_seasonal_wins/player_seasonal_games*100).toFixed(2)+"%)";
    document.getElementById("s_rankedLosses").textContent = "Ranked Losses: " + player_seasonal_losses;

    document.getElementById("s_classicGames").textContent = "Classic Games: " + player_seasonal_classic_games;
    document.getElementById("s_classicWins").textContent = "Classic Wins: " + player_seasonal_classic_wins+ " ("+(player_seasonal_classic_wins/player_seasonal_classic_games*100).toFixed(2)+"%)";
    document.getElementById("s_classicLosses").textContent = "Classic Losses: " + player_seasonal_classic_losses;
    document.getElementById("s_classicElo").textContent = "Classic Elo (unoffical): " + player_seasonal_classic_elo;
    document.getElementById("s_classicPeakElo").textContent = "Classic Peak Elo (unoffical): " + player_seasonal_classic_peakelo;
    // overall
    document.getElementById("o_gamesPlayed").textContent = "Ranked Games: " + player_totalgames;
    document.getElementById("o_rankedWins").textContent = "Ranked Wins: " + player.statistics.wins + " (" + player_totalwinchance + "%)";

    document.getElementById("o_atlantean_games").textContent = "Atlantean Games: " + player_atlantean_games;
    document.getElementById("o_atlantean_wins").textContent = "Atlantean Wins: " + player_atlantean_wins;
    document.getElementById("o_element_games").textContent = "Element Games: " + player_element_games;
    document.getElementById("o_element_wins").textContent = "Element Wins: " + player_element_wins;
    document.getElementById("o_grove_games").textContent = "Grove Games: " + player_grove_games;
    document.getElementById("o_grove_wins").textContent = "Grove Wins: " + player_grove_wins;
    document.getElementById("o_mech_games").textContent = "Mech Games: " + player_mech_games;
    document.getElementById("o_mech_wins").textContent = "Mech Wins: " + player_mech_wins;
    document.getElementById("o_forsaken_games").textContent = "Forsaken Games: " + player_forsaken_games;
    document.getElementById("o_forsaken_wins").textContent = "Forsaken Wins: " + player_forsaken_wins;
    document.getElementById("o_nomad_games").textContent = "Nomad Games: " + player_nomad_games;
    document.getElementById("o_nomad_wins").textContent = "Nomad Wins: " + player_nomad_wins;
    document.getElementById("o_shrine_games").textContent = "Shrine Games: " + player_shrine_games;
    document.getElementById("o_shrine_wins").textContent = "Shrine Wins: " + player_shrine_wins;






    if (player_bestfriends !== "") document.getElementById("bestFriends").innerHTML = "Played together with: " + player_bestfriends;





}

//toggle seasonal/overall view
$( "#toggleseason" ).click(function() {
    var seasonal = document.getElementById("seasonal");
    var overall = document.getElementById("overall");
    //check current view
    if(seasonal.style.display=="none"){
        overall.style.display="none";
        $( "#seasonal" ).fadeIn( "fast", function() {
            // Animation complete
            $("#toggleseason").text("Overall");
          });
    }
    else{
        seasonal.style.display="none";
        $( "#overall" ).fadeIn( "fast", function() {
            // Animation complete
            $("#toggleseason").text("Seasonal");
            
          });
    }
    
  });

//builds
function toggleFilters() {
    var selector = document.getElementById("selector");
    var filter = document.getElementById("filter");
    if (selector.classList.contains("hidediv")) {
        selector.classList.toggle("hidediv");
        filter.textContent = "Hide Filters";
    }
    else {
        selector.classList.toggle("hidediv");
        filter.textContent = "Show Filters";
    }
}
/*
function drawPlayerBuilds(gameX) {
    console.log(player);
    player_name = player.name;
    player_id = player.id;
    game = gameX;
    player_count = 51; //amount of games
    games = [0, 0, 0, 0, 0, 0];
    gamesNeu = [0, 0, 0, 0, 0, 0];
    wins = [0, 0, 0, 0, 0, 0];
    anzahl = 0;
    leaks = new Array(6);
    sends = new Array(6);
    sendchance = new Array(6);
    builds = new Array(6);
    for (var i = 0; i < leaks.length; i++) {
        leaks[i] = new Array(21);
        sends[i] = new Array(21);
        builds[i] = new Array(21);
        sendchance[i] = new Array(21);
        for (var e = 0; e < 21; e++) {
            //builds[i][e] = new Array (units.length);
            builds[i][e] = new Array(60);
            leaks[i][e] = 0;
            sendchance[i][e] = 0;
            sends[i][e] = new Array(60);
            for (var p = 0; p < 60; p++) {
                builds[i][e][p] = 0;
                sends[i][e][p] = 0;
            }
        }
    }
    var target_race = 0;
    switch (document.getElementById("setRace2").value) {
        case "Mastermind":
            target_race = 0;
            break;
        case "Element":
            target_race = 1;
            break;
        case "Grove":
            target_race = 2;
            break;
        case "Forsaken":
            target_race = 3;
            break;
        case "Mech":
            target_race = 4;
            break;
        case "Atlantean":
            target_race = 5;
            break;
    }

    for (i = 0; i < game.length; i++) {
        /*raceint:
        0=Mastermind
        1=Element
        2=Grove
        3=Forsaken
        4=Mech
        5=Atlantean

        if (game[i].queueType === "Normal") //ranked only
        {
            wave = parseInt(game[i].wave);
            //if (wave > 15) console.log(wave);
            var raceint = 0;
            switch (game[i].legion) {
                case "Mastermind":
                    raceint = 0;
                    break;
                case "Element":
                    raceint = 1;
                    break;
                case "Grove":
                    raceint = 2;
                    break;
                case "Forsaken":
                    raceint = 3;
                    break;
                case "Mech":
                    raceint = 4;
                    break;
                case "Atlantean":
                    raceint = 5;
                    break;
            }

            //total # of ranked games
            games[raceint]++;
            //gamesNeu: games with newer data and leaks 
            if (game[i].leaksPerWave !== null && wave - 1 > document.getElementById("setWave2").value - 1 && game[i].mercsReceivedPerWave !== null) gamesNeu[raceint]++;
            //wins
            if (game[i].gameResult === "won") wins[raceint]++;
            //check leaks for every wave and store them in leaks[][]
            //console.log(player.games.games[i].unitsPerWave);
            for (var e = 0; e < wave - 1; e++) {
                //check for newer data
                //Chance to leak:
                if (game[i].leaksPerWave !== null && game[i].mercsReceivedPerWave !== null) {
                    if (game[i].leaksPerWave.length > 0 && game[i].mercsReceivedPerWave.length > 0) {
                        if (game[i].leaksPerWave[e].length > 0 && game[i].mercsReceivedPerWave[e].length > 0) {
                            //amount of games where he leaked
                            leaks[raceint][e] = leaks[raceint][e] + 1;
                        }
                    }
                }
                //Chance to send
                if (game[i].mercsSentPerWave !== null) {
                    if (game[i].mercsSentPerWave.length > 0) {
                        if (game[i].mercsSentPerWave[e].length > 0) {
                            //amount of games where he leaked
                            sendchance[raceint][e] = sendchance[raceint][e] + 1;
                        }
                    }
                }
                game[i].unitsPerWave[e].forEach(function (element) {
                    //e=wave ;x=different units
                    var anzahl = 0;
                    for (var x = 0; x < 60; x++) {
                        if (builds[raceint][e][x] != 0) {
                            //unit matching?
                            if (builds[raceint][e][x].includes(element.substring(0, element.indexOf("_unit")))) {
                                anzahl = parseInt(builds[raceint][e][x].substring(builds[raceint][e][x].indexOf(";") + 1));
                                //console.log(builds[raceint][e][x].substring(builds[raceint][e][x].indexOf(";") + 1));
                                anzahl++;
                                //console.log(element);
                                builds[raceint][e][x] = element.substring(0, element.indexOf("_unit")) + ";" + anzahl;
                            }
                        }
                    }
                    //no match, add it
                    if (anzahl > 0 == false) {
                        for (var x = 0; x < 60; x++) {
                            if (builds[raceint][e][x] == 0) {
                                builds[raceint][e][x] = element.substring(0, element.indexOf("_unit")) + ";1";
                                break;
                            }
                        }
                    }
                });
                game[i].mercsSentPerWave[e].forEach(function (element) {
                    var anzahl = 0;
                    for (var x = 0; x < 60; x++) {
                        if (sends[raceint][e][x] != 0) {
                            //match
                            //console.log(element);
                            if (sends[raceint][e][x].includes(element)) {
                                anzahl = parseInt(sends[raceint][e][x].substring(sends[raceint][e][x].indexOf(";") + 1));
                                //console.log(builds[raceint][e][x].substring(builds[raceint][e][x].indexOf(";") + 1));
                                anzahl++;
                                sends[raceint][e][x] = element + ";" + anzahl;
                            }
                        }
                    }
                    //no match, add it
                    if (anzahl > 0 == false) {

                        for (var x = 0; x < 60; x++) {
                            if (sends[raceint][e][x] == 0) {
                                sends[raceint][e][x] = element + ";1";
                                break;
                            }
                        }
                    }
                });
            }
        }
    }
    //console.log(sends);

    var chancetoleak = (leaks[target_race][document.getElementById("setWave2").value - 1] / gamesNeu[target_race] * 100).toFixed(2);
    var chancetosend = (sendchance[target_race][document.getElementById("setWave2").value - 1] / gamesNeu[target_race] * 100).toFixed(2);
    var favunit = []
    meineBuilds = builds[target_race][[document.getElementById("setWave2").value - 1]];
    meineSends = sends[target_race][[document.getElementById("setWave2").value - 1]];
    if (chancetoleak == 'NaN') chancetoleak = "no data";
    else if (chancetoleak == 0) chancetoleak = "0";
    if (chancetosend == 'NaN') chancetosend = "no data";
    else if (chancetosend == 0) chancetosend = "0";
    document.getElementById("playername").textContent = player_name;
    document.getElementById("totalgames").textContent = "Games reached wave " + document.getElementById("setWave2").value + ": " + gamesNeu[target_race];
    document.getElementById("chancetoleak").textContent = "Chance to leak wave " + document.getElementById("setWave2").value + " with " + document.getElementById("setRace2").value + ": " + chancetoleak;
    document.getElementById("chancetosend").textContent = "Chance to send on wave " + document.getElementById("setWave2").value + " with " + document.getElementById("setRace2").value + ": " + chancetosend;
    if (chancetoleak !== "no data") document.getElementById("chancetoleak").textContent = document.getElementById("chancetoleak").textContent += "%";
    if (chancetosend !== "no data") document.getElementById("chancetosend").textContent = document.getElementById("chancetosend").textContent += "%";

    var buildcontainer = document.getElementById("avgbuild");
    var sendcontainer = document.getElementById("avgsend");
    buildcontainer.innerHTML = "";
    sendcontainer.innerHTML = "";
    builds[target_race][[document.getElementById("setWave2").value - 1]].sort(function (a, b) {
        if (a != 0) {
            var abstandA = a.indexOf(";") + 1;
            var lastA = a.substring(abstandA, a.length);
        }
        else lastA = 0;
        if (b != 0) {
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
    sends[target_race][[document.getElementById("setWave2").value - 1]].sort(function (a, b) {
        if (a != 0) {
            var abstandA = a.indexOf(";") + 1;
            var lastA = a.substring(abstandA, a.length);
        }
        else lastA = 0;
        if (b != 0) {
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
    //console.log(builds[target_race]);

    builds[target_race][[document.getElementById("setWave2").value - 1]].forEach(function (ele) {

        if (ele != 0) {
            var url = "";
            url = "/img/icons/" + ele.substring(0, ele.indexOf(";")).charAt(0).toUpperCase() + ele.substring(0, ele.indexOf(";")).substring(1);
            while (url.includes("_")) {
                var index = url.indexOf("_");
                url = url.substring(0, index) + url.charAt(index + 1).toUpperCase() + url.substring(index + 2);
                url.replace("_", "%20");
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

            buildcontainer.innerHTML += "<img src='" + url + "' height='20px' width='20px'> " + unit_type + " (" + (parseInt(ele.substring(ele.indexOf(";") + 1)) / gamesNeu[target_race] * 100).toFixed(2) + "%) <br>";
        }
    });


    sends[target_race][[document.getElementById("setWave2").value - 1]].forEach(function (ele) {
        if (ele != 0) {

            sendcontainer.innerHTML += "<img src='/img/icons/" + ele.substring(0, ele.indexOf(";")).replace(" ", "") + ".png' height='20px' width='20px'> " + ele.substring(0, ele.indexOf(";")) + " (" + (parseInt(ele.substring(ele.indexOf(";") + 1)) / gamesNeu[target_race] * 100).toFixed(2) + "%) <br>";
        }
    });
    //gamedetails
    $('#tab_top_3').on('click', function () {
        if (document.getElementById("playername").value) {
            drawGameDetails(0);
            return false;
        }
    });
}

*/
// lists matches in dropdown
function listGames() {
    var selector = document.getElementById("setGame");
        selector.remove(0);
        console.log(games.length);
        console.log(games);
        for (i = 0; i < games.length; i++) {
            var option = document.createElement("option");
            var timestamp = games[i].ts.substring(0, games[i].ts.indexOf(".")).replace("T", " ");
            var legion = "";
            var currelo = 0;
            var pastelo = 0;
            try {
                var gameDetail = games[i]['gameDetails'].filter(gameDetail => gameDetail.playerProfile['name'] == player.name)[0];
                legion = ", Legion: " + gameDetail['legion'];
                if (i > 0) {
                    gameDetail = games[i - 1]['gameDetails'].filter(gameDetail => gameDetail.playerProfile['name'] == player.name)[0];
                    currelo = gameDetail['overallElo'];
                }
                else currelo = parseInt(player.statistics.overallElo);
                gameDetail = games[i]['gameDetails'].filter(gameDetail => gameDetail.playerProfile['name'] == player.name)[0];
                pastelo = gameDetail['overallElo'];
                var elochange = 0;
                elochange = currelo - pastelo;

            } catch (err) {
                // Catch games that error out with no game detail.
                console.log(err);
                console.log(games[i]);
                console.log(player);
            }

            if (elochange > 0) option.text = games[i].queueType + ": " + timestamp.substring(0, timestamp.length - 3) + " UTC, ID: " + games[i].id + legion + ", Elo: +" + elochange;
            else option.text = games[i].queueType + ": " + timestamp.substring(0, timestamp.length - 3) + " UTC, ID: " + games[i].id + legion + ", Elo: " + elochange;
            option.value = i;
            if (gameDetail.gameResult == "lost") option.style = "background-color: #FCA8A8;"
            else if (gameDetail.gameResult == "won") option.style = "background-color: #B7FBA3;"
            else option.style = "background-color: #e6e3e3;"
            
            selector.add(option);

        }
    }
    

    // displays match info from match history for selected game
    function getGameDetails(int){
        if (debug) console.log("Reading Game with the id " + games[int].id + ": ")
        if (debug) console.log(games[int]);
        var target_game = games[int];
        var target_detail = target_game['gameDetails'].filter(gameDetail => gameDetail.playerProfile['name'] == player.name)[0];
        var meinString = target_game.gameDetails.filter(meinString => meinString.position == 1)[0];
        var meinString1 = target_game.gameDetails.filter(meinString => meinString.position == 2)[0];
        var meinString2 = target_game.gameDetails.filter(meinString => meinString.position == 5)[0];
        var meinString3 = target_game.gameDetails.filter(meinString => meinString.position == 6)[0];
        target_game.gameDetails.splice(0, target_game.gameDetails.length);
        target_game.gameDetails.push(meinString,meinString1,meinString2,meinString3);
        var datestring = target_game.ts;
        datestring = datestring.replace("T", " ");
        datestring = datestring.replace(":00.000Z", "");

        document.getElementById("game_id").innerHTML            =       "ID: <a href = 'https://ltdstats.com/replay?gameid="+target_game.id+"'>"+target_game.id+"</a>";
        document.getElementById("game_date").innerHTML          =       "TS: "+ datestring;
        document.getElementById("game_result").innerHTML        =       "Result: "+ target_detail.gameResult;
        document.getElementById("game_wave").innerHTML          =       "Ending wave: " + target_game.endingWave;
        document.getElementById("game_time").innerHTML          =       "Match length: " + (target_game.gameLength/60).toFixed(2) + "min";

        var mostelo_val=0, mostelo_pos, mostmvp_val=0, mostmvp_pos, mostval_val=0, mostval_pos, mostwo_val=0,mostwo_pos,mostinc_val=0,mostinc_pos,mostleaks_val=99999,mostleaks_pos;


        for(var i = 0; i<target_game.humanCount;i++){
            target_detail = target_game.gameDetails[i];

            var total_leaks = 0;
            target_detail.leaksPerWave.forEach(ele => {
                total_leaks = total_leaks + ele.length;
            }); 

            var total_value = getTotalValue(target_detail.unitsPerWave[target_game.endingWave - 1]);

            //records
            if(target_detail.overallElo > mostelo_val){
                mostelo_val = target_detail.overallElo;
                mostelo_pos = target_detail.position;
            } 
            if(target_detail.mvpScore > mostmvp_val){
                mostmvp_val = target_detail.mvpScore; 
                mostmvp_pos = target_detail.position;
            } 
            if(total_value > mostval_val){
                mostval_val = total_value; 
                mostval_pos = target_detail.position; 
            } 
            if(target_detail.workersPerWave[target_game.endingWave - 1] > mostwo_val){
                mostwo_val = target_detail.workersPerWave[target_game.endingWave - 1]; 
                mostwo_pos = target_detail.position;
            } 
            if(target_detail.incomePerWave[target_game.endingWave - 1] > mostinc_val){
                mostinc_val = target_detail.incomePerWave[target_game.endingWave - 1]; 
                mostinc_pos = target_detail.position;
            } 
            if(total_leaks < mostleaks_val){
                mostleaks_val = total_leaks; 
                mostleaks_pos = target_detail.position;
            } 

            document.getElementById("name_"+(i+1)).innerHTML    =       "<a href='/profile&player='"+target_detail.playerProfile.name+">"+target_detail.playerProfile.name+"</a>";
            document.getElementById("elo_"+(i+1)).innerHTML     =       target_detail.overallElo;
            document.getElementById("mvpscore_"+(i+1)).innerHTML=       target_detail.mvpScore;
            document.getElementById("value_"+(i+1)).innerHTML   =       total_value;
            document.getElementById("worker_"+(i+1)).innerHTML  =       target_detail.workersPerWave[target_game.endingWave - 1];
            document.getElementById("income_"+(i+1)).innerHTML  =       target_detail.incomePerWave[target_game.endingWave - 1];
            document.getElementById("leaks_"+(i+1)).innerHTML   =       total_leaks;
        }

        if (mostelo_pos == 5) mostelo_pos = 3;
        if (mostelo_pos == 6) mostelo_pos = 4;
        if (mostmvp_pos == 5) mostmvp_pos = 3;
        if (mostmvp_pos == 6) mostmvp_pos = 4;
        if (mostval_pos == 5) mostval_pos = 3;
        if (mostval_pos == 6) mostval_pos = 4;
        if (mostwo_pos == 5) mostwo_pos = 3;
        if (mostwo_pos == 6) mostwo_pos = 4;
        if (mostinc_pos == 5) mostinc_pos = 3;
        if (mostinc_pos == 6) mostinc_pos = 4;
        if (mostleaks_pos == 5) mostleaks_pos = 3;
        if (mostleaks_pos == 6) mostleaks_pos = 4;

        document.getElementById("elo_"+mostelo_pos).style.fontWeight="bold";
        document.getElementById("mvpscore_"+mostmvp_pos).style.fontWeight="bold";
        document.getElementById("value_"+mostval_pos).style.fontWeight="bold";
        document.getElementById("worker_"+mostwo_pos).style.fontWeight="bold";
        document.getElementById("income_"+mostinc_pos).style.fontWeight="bold";
        document.getElementById("leaks_"+mostleaks_pos).style.fontWeight="bold";





    }

    function calcGameStats(playername, games_scope){
        var gamecount=0;
        var inc_better=0, worker_better=0, value_better=0, leaks_better=0, early_send=0, mid_send=0, late_send=0;

        games_scope.forEach(game_scope => {
            gamecount++;
            var scope_detail = game_scope['gameDetails'].filter(gameDetail => gameDetail.playerProfile['name'] == playername)[0];
            var scope_pos = scope_detail.position;
            var mate_pos = 0;
            switch(scope_pos){
                case 1:
                    mate_pos=2;
                break;
                case 2:
                    mate_pos=1;
                break;
                case 5:
                    mate_pos=6;
                break;
                case 6:
                    mate_pos=5;
                break;
                default:
                break;
            }


            var scope_detail2 = game_scope.gameDetails.filter(meinString => meinString.position == mate_pos)[0];
            var gamelength = game_scope.endingWave-1;
            var tmp_worker=0, tmp_inc=0, tmp_value=0, tmp_leaks=0, tmp_early=0, tmp_mid=0, tmp_late=0;
            for(var i=0;i<gamelength;i++){
                if(scope_detail.workersPerWave[i]>scope_detail2.workersPerWave[i]){
                    tmp_worker++;
                }
                else if(scope_detail.workersPerWave[i]<scope_detail2.workersPerWave[i]){
                    tmp_worker--;
                }
                if(scope_detail.incomePerWave[i]>scope_detail2.incomePerWave[i]){
                    tmp_inc++;
                }
                else if(scope_detail.incomePerWave[i]<scope_detail2.incomePerWave[i]){
                    tmp_inc--;
                }
                if(scope_detail.leaksPerWave[i]<scope_detail2.leaksPerWave[i]){
                    tmp_leaks++;
                }
                else if(scope_detail.leaksPerWave[i]>scope_detail2.leaksPerWave[i]){
                    tmp_leaks--;
                }
                if(getTotalValue(scope_detail.unitsPerWave[i])>getTotalValue(scope_detail2.unitsPerWave[i])){
                    tmp_value++;
                }
                else if(getTotalValue(scope_detail.unitsPerWave[i])<getTotalValue(scope_detail2.unitsPerWave[i])){
                    tmp_value--;
                }
                if(i<10){
                    if(scope_detail.mercsSentPerWave[i]>0){
                        tmp_early++;
                    }
                    else{
                        tmp_early--;
                    }
                }
                else if(i < 15){
                    //mid game
                    if(scope_detail.mercsSentPerWave[i]>0){
                        tmp_mid++;
                    }
                    else{
                        tmp_mid--;
                    }
                }
                else{
                    //lategame
                    if(scope_detail.mercsSentPerWave[i]>0){
                        tmp_late++;
                    }
                    else{
                        tmp_late--;
                    }
                }
            }
            if(tmp_worker>0){
                worker_better++;
            }
            if(tmp_inc>0){
                inc_better++;
            }
            if(tmp_leaks>0){
                leaks_better++;
            }
            if(tmp_value>0){
                value_better++;
            }
            if(tmp_early>0){
                early_send++;
            }
            if(tmp_mid>0){
                mid_send++;
            }
            if(tmp_late>0){
                late_send++;
            }

        });
        console.log("Playstyle: ");
        console.log("Workers: " + (worker_better/gamecount));
        console.log("Income: " + (inc_better/gamecount));
        console.log("Leaks: " + (leaks_better/gamecount));
        console.log("Value: " + (value_better/gamecount));
        console.log("Early sends: "+(early_send/gamecount));
        console.log("Mid sends: "+(mid_send/gamecount));
        console.log("Late sends: "+(late_send/gamecount));
        console.log("toal games: "+gamecount);

    }


    function getGameDetailsProfile(pos, games) {
        savedGame = games[pos];
        meinString = games[pos].gameDetails.filter(meinString => meinString.position == 1)[0];
        meinString1 = games[pos].gameDetails.filter(meinString => meinString.position == 2)[0];
        meinString2 = games[pos].gameDetails.filter(meinString => meinString.position == 5)[0];
        meinString3 = games[pos].gameDetails.filter(meinString => meinString.position == 6)[0];
        gameEvent = [meinString, meinString1, meinString2, meinString3];
    }

    function getPlayerAmount() {
        return gameEvent[0].player_count;
    }
    

    function dec2hex(str) { // .toString(16) only works up to 2^53
        var dec = str.toString().split(''), sum = [], hex = [], i, s;
        while (dec.length) {
            s = 1 * dec.shift();
            for (i = 0; s || i < sum.length; i++) {
                s += (sum[i] || 0) * 10;
                sum[i] = s % 16;
                s = (s - sum[i]) / 16;
            }
        }
        while (sum.length) {
            hex.push(sum.pop().toString(16));
        }
        return hex.join('');
    }


    

    
function toggleIngame(livegames) {
    let name = document.getElementById("playername").value;
    //check for name in livegames
    for (var i = 0; i < livegames.length; i++) {
        if (livegames[i].players.includes(name)) {
            let target = document.getElementById("ingame");
            target.style.display = "block";
            if (livegames[i].gametype == "classic") target.innerHTML += " (Classic)";
            else target.innerHTML += " (Ranked)";
        }
    }
}
    // api
function getLivegames(callback) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var player = JSON.parse(xhttp.response);
            callback(player);
        }
    };
    xhttp.open("GET", '/api/getLivegames', true);
    xhttp.send();
}

function queryLivegames() {
    getLivegames(function (result) {
        if (!result) {
            document.getElementById("apierror").style.display = "";
        }
        else {
            toggleIngame(JSON.parse(result));
            return result;
        }
    });
}
    // player stats by name
    //stats
    function apiGetPlayer(callback, playername) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var player = JSON.parse(xhttp.response);
                callback(player);
            }
        };
        xhttp.open("GET", '/api/profile/player?playername=' + playername, true);
        xhttp.send();
    }

    function queryPlayer(playername) {
        apiGetPlayer(function (result) {
            if (result.player === null) {
                document.getElementById("apierror").style.display = "";
            }
            else {
                result.player.statistics = JSON.parse(result.player.statistics);
                player = result.player;
                try{
                    queryPlayerOverallGames(player.name);
                    loadStats(player);
                    parseStats(player);
                    hideLoad();
                }
                catch(err){
                    console.log("Error parsing player: "+err);
                    console.log(player);
                    document.getElementById("stats").innerHTML="<h3>Error parsing player " + player.name + ". Check the name again or report this issue if it still exists.</h3>";
                }
                
                return player;
            }

        }, playername);
    }
    //player overall games
    //builds
    function getPlayerOverallGames(callback, playername) {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var reqGames = JSON.parse(xhttp.response);
                callback(reqGames);
            }
        };
        xhttp.open("GET", '/api/profile/playerOverallGames?playername=' + playername, true);
        xhttp.send();
    }

    function queryPlayerOverallGames(playername) {
        getPlayerOverallGames(function (result) {
            if (!result) {
                document.getElementById("apierror").style.display = "";
            }
            else {
                result = JSON.parse(result);
                console.log(result);
                playerGames = result;
                games = result;
                loadEloGraphProfile(result);
                queryPlayerOverallGamesClassic(playername);
                calcGameStats(playername, result)
                return playerGames;
            }
        }, playername);
    }

    function getPlayerOverallGamesClassic(callback, playername) {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var reqGames = JSON.parse(xhttp.response);
                callback(reqGames);
            }
        };
        xhttp.open("GET", '/api/profile/playerOverallGamesClassic?playername=' + playername, true);
        xhttp.send();
    }

    function queryPlayerOverallGamesClassic(playername) {
        getPlayerOverallGamesClassic(function (result2) {
            if (!result2) {
                document.getElementById("apierror").style.display = "";
            }
            else {
                result2 = JSON.parse(result2);
                console.log(result2);
                playerGames = playerGames.concat(result2);
                games = games.concat(result2);
                playerGames.sort(compareTS);
                games.sort(compareTS);
                listGames();
                getGameDetails(0);
                document.getElementById("mitte").style.display = "none";
                return playerGames;
            }
        }, playername);
    }

        

    //adds thik lines to grid
    function drawSquares() {
        var smalls = document.getElementsByClassName("pictable");
        Array.prototype.forEach.call(smalls, function (element) {
            var x = element.id.substring(element.id.indexOf(".") + 1);
            var y = element.id.substring(0, element.id.indexOf("."));
            if (x % 2 == 1) {

                element.style["border-left"] = "2px solid black";
            }
            else {

                element.style["border-right"] = "2px solid black";
            }
            if (y % 2 == 1) {
                element.style["border-bottom"] = "2px solid black";
            }
            else {
                element.style["border-top"] = "2px solid black";
            }
        });
    }


    function compareTS(a, b) {
        if (a.ts < b.ts) {
          return 1;
        }
        if (a.ts > b.ts) {
          return -1;
        }
        // a muss gleich b sein
        return 0;
      }