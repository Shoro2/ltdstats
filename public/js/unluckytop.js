function getLadder(callback, limit, offset, type) {
    var xhttp = new XMLHttpRequest();
    document.getElementById("mitte").style.display = "";
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var player = JSON.parse(xhttp.response);
            callback(player);
        }
    };
    xhttp.open("GET", '/api/ladder?type=' + type + '&limit=' + limit + '&offset=' + offset, true);
    xhttp.send();
}

function queryLadder(limit, offset, type) {
    document.getElementById("mitte").style.display = "";
    getLadder(function (result) {
        parsePlayers(result.filteredPlayers.players);
        
        document.getElementById("mitte").style.display = "none";
        return result;
    }, limit, offset, type);
}



queryLadder(20, 0, "gamesWithoutCard");


function parsePlayers(players){
    var tabelle = document.getElementById("myladder");
    for(var i = 0; i<players.length; i++){
        var stats = JSON.parse(players[i].statistics);
        console.log(stats);

        var row = tabelle.insertRow(i + 1);
        var cell = [3];
        for (var e = 0; e < 3; e++) {
            cell[e] = row.insertCell(e);
            cell[e].classList.add("td_" + e);
        }
        cell[0].innerHTML = i + 1;
        cell[1].innerHTML = '<a href="/profile?player=' + players[i].name + '">' + players[i].name + '</a>';
        cell[2].innerHTML = stats.gamesWithoutCard;
    }
}