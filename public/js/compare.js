function parseStats(player) {
    console.log(player);
    playername[counter] = player.name;
    gamesPlayed[counter] = player.statistics.gamesPlayed;
    wins[counter] = player.statistics.wins;
    losses[counter] = player.statistics.losses;
    winRate[counter] = player.statistics.winRate;
    ties[counter] = player.statistics.ties;
    if (typeof ties[counter] == 'undefined') ties[counter] = 0;
    quits[counter] = player.statistics.quits;
    if (typeof quits[counter] == 'undefined') quits[counter] = 0;
    winStreak[counter] = player.statistics.winStreak;
    if (typeof winStreak[counter] == 'undefined') winStreak[counter] = 0;
    secondsPlayed[counter] = player.statistics.secondsPlayed;
    totalXp[counter] = player.statistics.totalXp;
    overallPeakElo[counter] = player.statistics.overallPeakEloThisSeason;
    overallElo[counter] = player.statistics.overallElo;

    elementPeakElo[counter] = player.statistics.elementPeakElo;
    if (typeof elementPeakElo[counter] == 'undefined') elementPeakElo[counter] = 0;
    elementElo[counter] = player.statistics.elementElo;
    if (typeof elementElo[counter] == 'undefined') elementElo[counter] = 0;
    elementPlayed[counter] = player.statistics.elementPlayed;
    if (typeof elementPlayed[counter] == 'undefined') elementPlayed[counter] = 0;
    elementWins[counter] = player.statistics.elementWins;
    if (typeof elementWins[counter] == 'undefined') elementWins[counter] = 0;
    elementLosses[counter] = player.statistics.elementLosses;
    if (typeof elementLosses[counter] == 'undefined') elementLosses[counter] = 0;
    elementXp[counter] = player.statistics.elementXp;
    if (typeof elementXp[counter] == 'undefined') elementXp[counter] = 0;

    grovePeakElo[counter] = player.statistics.grovePeakElo;
    if (typeof grovePeakElo[counter] == 'undefined') grovePeakElo[counter] = 0;
    groveElo[counter] = player.statistics.groveElo;
    if (typeof groveElo[counter] == 'undefined') groveElo[counter] = 0;
    grovePlayed[counter] = player.statistics.grovePlayed;
    if (typeof grovePlayed[counter] == 'undefined') grovePlayed[counter] = 0;
    groveWins[counter] = player.statistics.groveWins;
    if (typeof groveWins[counter] == 'undefined') groveWins[counter] = 0;
    groveLosses[counter] = player.statistics.groveLosses;
    if (typeof groveLosses[counter] == 'undefined') groveLosses[counter] = 0;
    groveXp[counter] = player.statistics.groveXp;
    if (typeof groveXp[counter] == 'undefined') groveXp[counter] = 0;

    forsakenPeakElo[counter] = player.statistics.forsakenPeakElo;
    if (typeof forsakenPeakElo[counter] == 'undefined') forsakenPeakElo[counter] = 0;
    forsakenElo[counter] = player.statistics.forsakenElo;
    if (typeof forsakenElo[counter] == 'undefined') forsakenElo[counter] = 0;
    forsakenPlayed[counter] = player.statistics.forsakenPlayed;
    if (typeof forsakenPlayed[counter] == 'undefined') forsakenPlayed[counter] = 0;
    forsakenWins[counter] = player.statistics.forsakenWins;
    if (typeof forsakenWins[counter] == 'undefined') forsakenWins[counter] = 0;
    forsakenLosses[counter] = player.statistics.forsakenLosses;
    if (typeof forsakenLosses[counter] == 'undefined') forsakenLosses[counter] = 0;
    forsakenXp[counter] = player.statistics.forsakenXp;
    if (typeof forsakenXp[counter] == 'undefined') forsakenXp[counter] = 0;

    mechPeakElo[counter] = player.statistics.mechPeakElo;
    if (typeof mechPeakElo[counter] == 'undefined') mechPeakElo[counter] = 0;
    mechElo[counter] = player.statistics.mechElo;
    if (typeof mechElo[counter] == 'undefined') mechElo[counter] = 0;
    mechPlayed[counter] = player.statistics.mechPlayed;
    if (typeof mechPlayed[counter] == 'undefined') mechPlayed[counter] = 0;
    mechWins[counter] = player.statistics.mechWins;
    if (typeof mechWins[counter] == 'undefined') mechWins[counter] = 0;
    mechLosses[counter] = player.statistics.mechLosses;
    if (typeof mechLosses[counter] == 'undefined') mechLosses[counter] = 0;
    mechXp[counter] = player.statistics.mechXp;
    if (typeof mechXp[counter] == 'undefined') mechXp[counter] = 0;

    mastermindPeakElo[counter] = player.statistics.mastermindPeakElo;
    if (typeof mastermindPeakElo[counter] == 'undefined') mastermindPeakElo[counter] = 0;
    mastermindElo[counter] = player.statistics.mastermindElo;
    if (typeof mastermindElo[counter] == 'undefined') mastermindElo[counter] = 0;
    mastermindPlayed[counter] = player.statistics.mastermindPlayed;
    if (typeof mastermindPlayed[counter] == 'undefined') mastermindPlayed[counter] = 0;
    mastermindWins[counter] = player.statistics.mastermindWins;
    if (typeof mastermindWins[counter] == 'undefined') mastermindWins[counter] = 0;
    mastermindLosses[counter] = player.statistics.mastermindLosses;
    if (typeof mastermindLosses[counter] == 'undefined') mastermindLosses[counter] = 0;
    mastermindXp[counter] = player.statistics.mastermindXp;
    if (typeof mastermindXp[counter] == 'undefined') mastermindXp[counter] = 0;
    counter++;
    if (counter == 1) queryPlayer(document.getElementById("playername2").value);
    //compare&parse
    if (counter == 2) {
        for (var i = 0; i < 2; i++) {
            document.getElementById("player" + i + "_name").textContent = playername[i];
            document.getElementById("player" + i + "_gamesplayed").textContent = gamesPlayed[i];
            document.getElementById("player" + i + "_wins").textContent = wins[i];
            document.getElementById("player" + i + "_losses").textContent = losses[i];
            document.getElementById("player" + i + "_winrate").textContent = winRate[i];
            document.getElementById("player" + i + "_ties").textContent = ties[i];
            document.getElementById("player" + i + "_quits").textContent = quits[i];
            document.getElementById("player" + i + "_winstreak").textContent = winStreak[i];
            document.getElementById("player" + i + "_playtime").textContent = secondsPlayed[i];
            document.getElementById("player" + i + "_xp").textContent = totalXp[i];
            document.getElementById("player" + i + "_overallpeakelo").textContent = overallPeakElo[i];
            document.getElementById("player" + i + "_overallelo").textContent = overallElo[i];

            document.getElementById("player" + i + "_elementpeakelo").textContent = elementPeakElo[i];
            document.getElementById("player" + i + "_elementelo").textContent = elementElo[i];
            document.getElementById("player" + i + "_elementgames").textContent = elementPlayed[i];
            document.getElementById("player" + i + "_elementwins").textContent = elementWins[i];
            document.getElementById("player" + i + "_elementlosses").textContent = elementLosses[i];
            document.getElementById("player" + i + "_elementxp").textContent = elementXp[i];

            document.getElementById("player" + i + "_grovepeakelo").textContent = grovePeakElo[i];
            document.getElementById("player" + i + "_groveelo").textContent = groveElo[i];
            document.getElementById("player" + i + "_grovegames").textContent = grovePlayed[i];
            document.getElementById("player" + i + "_grovewins").textContent = groveWins[i];
            document.getElementById("player" + i + "_grovelosses").textContent = groveLosses[i];
            document.getElementById("player" + i + "_grovexp").textContent = groveXp[i];

            document.getElementById("player" + i + "_forsakenpeakelo").textContent = forsakenPeakElo[i];
            document.getElementById("player" + i + "_forsakenelo").textContent = forsakenElo[i];
            document.getElementById("player" + i + "_forsakengames").textContent = forsakenPlayed[i];
            document.getElementById("player" + i + "_forsakenwins").textContent = forsakenWins[i];
            document.getElementById("player" + i + "_forsakenlosses").textContent = forsakenLosses[i];
            document.getElementById("player" + i + "_forsakenxp").textContent = forsakenXp[i];

            document.getElementById("player" + i + "_mechpeakelo").textContent = mechPeakElo[i];
            document.getElementById("player" + i + "_mechelo").textContent = mechElo[i];
            document.getElementById("player" + i + "_mechgames").textContent = mechPlayed[i];
            document.getElementById("player" + i + "_mechwins").textContent = mechWins[i];
            document.getElementById("player" + i + "_mechlosses").textContent = mechLosses[i];
            document.getElementById("player" + i + "_mechxp").textContent = mechXp[i];

            document.getElementById("player" + i + "_mastermindpeakelo").textContent = mastermindPeakElo[i];
            document.getElementById("player" + i + "_mastermindelo").textContent = mastermindElo[i];
            document.getElementById("player" + i + "_mastermindgames").textContent = mastermindPlayed[i];
            document.getElementById("player" + i + "_mastermindwins").textContent = mastermindWins[i];
            document.getElementById("player" + i + "_mastermindlosses").textContent = mastermindLosses[i];
            document.getElementById("player" + i + "_mastermindxp").textContent = mastermindXp[i];
        }
        //difference
        document.getElementById("difference_gamesplayed").textContent = (gamesPlayed[0] - gamesPlayed[1]);
        document.getElementById("difference_wins").textContent = wins[0] - wins[1];
        document.getElementById("difference_losses").textContent = losses[0] - losses[1];
        document.getElementById("difference_winrate").textContent = winRate[0] - winRate[1];
        document.getElementById("difference_ties").textContent = ties[0] - ties[1];
        document.getElementById("difference_quits").textContent = quits[0] - quits[1];
        document.getElementById("difference_winstreak").textContent = winStreak[0] - winStreak[1];
        document.getElementById("difference_playtime").textContent = (((secondsPlayed[0] - secondsPlayed[1]) / 60)/60).toFixed(2) + " h";
        document.getElementById("difference_xp").textContent = totalXp[0] - totalXp[1];
        document.getElementById("difference_overallpeakelo").textContent = overallPeakElo[0] - overallPeakElo[1];
        document.getElementById("difference_overallelo").textContent = overallElo[0] - overallElo[1];
        document.getElementById("difference_elementpeakelo").textContent = elementPeakElo[0] - elementPeakElo[1];
        document.getElementById("difference_elementelo").textContent = elementElo[0] - elementElo[1];
        document.getElementById("difference_elementgames").textContent = elementPlayed[0] - elementPlayed[1];
        document.getElementById("difference_elementwins").textContent = elementWins[0] - elementWins[1];
        document.getElementById("difference_elementlosses").textContent = elementLosses[0] - elementLosses[1];
        document.getElementById("difference_elementxp").textContent = elementXp[0] - elementXp[1];
        document.getElementById("difference_grovepeakelo").textContent = grovePeakElo[0] - grovePeakElo[1];
        document.getElementById("difference_groveelo").textContent = groveElo[0] - groveElo[1];
        document.getElementById("difference_grovegames").textContent = grovePlayed[0] - grovePlayed[1];
        document.getElementById("difference_grovewins").textContent = groveWins[0] - groveWins[1];
        document.getElementById("difference_grovelosses").textContent = groveLosses[0] - groveLosses[1];
        document.getElementById("difference_grovexp").textContent = groveXp[0] - groveXp[1];
        document.getElementById("difference_forsakenpeakelo").textContent = forsakenPeakElo[0] - forsakenPeakElo[1];
        document.getElementById("difference_forsakenelo").textContent = forsakenElo[0] - forsakenElo[1];
        document.getElementById("difference_forsakengames").textContent = forsakenPlayed[0] - forsakenPlayed[1];
        document.getElementById("difference_forsakenwins").textContent = forsakenWins[0] - forsakenWins[1];
        document.getElementById("difference_forsakenlosses").textContent = forsakenLosses[0] - forsakenLosses[1];
        document.getElementById("difference_forsakenxp").textContent = forsakenXp[0] - forsakenXp[1];
        document.getElementById("difference_mechpeakelo").textContent = mechPeakElo[0] - mechPeakElo[1];
        document.getElementById("difference_mechelo").textContent = mechElo[0] - mechElo[1];
        document.getElementById("difference_mechgames").textContent = mechPlayed[0] - mechPlayed[1];
        document.getElementById("difference_mechwins").textContent = mechWins[0] - mechWins[1];
        document.getElementById("difference_mechlosses").textContent = mechLosses[0] - mechLosses[1];
        document.getElementById("difference_mechxp").textContent = mechXp[0] - mechXp[1];
        document.getElementById("difference_mastermindpeakelo").textContent = mastermindPeakElo[0] - mastermindPeakElo[1];
        document.getElementById("difference_mastermindelo").textContent = mastermindElo[0] - mastermindElo[1];
        document.getElementById("difference_mastermindgames").textContent = mastermindPlayed[0] - mastermindPlayed[1];
        document.getElementById("difference_mastermindwins").textContent = mastermindWins[0] - mastermindWins[1];
        document.getElementById("difference_mastermindlosses").textContent = mastermindLosses[0] - mastermindLosses[1];
        document.getElementById("difference_mastermindxp").textContent = mastermindXp[0] - mastermindXp[1];
        //colorize
        if (gamesPlayed[0] > gamesPlayed[1]) document.getElementById("difference_gamesplayed").innerHTML = "<div class='green'>" + document.getElementById("difference_gamesplayed").textContent + "</div>";
        if (gamesPlayed[0] < gamesPlayed[1]) document.getElementById("difference_gamesplayed").innerHTML = "<div class='red'>" + document.getElementById("difference_gamesplayed").textContent + "</div>";
        if (gamesPlayed[0] == gamesPlayed[1]) document.getElementById("difference_gamesplayed").innerHTML = "<div class='white'>" + document.getElementById("difference_gamesplayed").textContent + "</div>";

        if (wins[0] > wins[1]) document.getElementById("difference_wins").innerHTML = "<div class='green'>" + document.getElementById("difference_wins").textContent + "</div>";
        if (wins[0] < wins[1]) document.getElementById("difference_wins").innerHTML = "<div class='red'>" + document.getElementById("difference_wins").textContent + "</div>";
        if (wins[0] == wins[1]) document.getElementById("difference_wins").innerHTML = "<div class='white'>" + document.getElementById("difference_wins").textContent + "</div>";

        if (losses[0] > losses[1]) document.getElementById("difference_losses").innerHTML = "<div class='green'>" + document.getElementById("difference_losses").textContent + "</div>";
        if (losses[0] < losses[1]) document.getElementById("difference_losses").innerHTML = "<div class='red'>" + document.getElementById("difference_losses").textContent + "</div>";
        if (losses[0] == losses[1]) document.getElementById("difference_losses").innerHTML = "<div class='white'>" + document.getElementById("difference_losses").textContent + "</div>";

        if (winRate[0] > winRate[1]) document.getElementById("difference_winrate").innerHTML = "<div class='green'>" + document.getElementById("difference_winrate").textContent + "</div>";
        if (winRate[0] < winRate[1]) document.getElementById("difference_winrate").innerHTML = "<div class='red'>" + document.getElementById("difference_winrate").textContent + "</div>";
        if (winRate[0] == winRate[1]) document.getElementById("difference_winrate").innerHTML = "<div class='white'>" + document.getElementById("difference_winrate").textContent + "</div>";

        if (ties[0] > ties[1]) document.getElementById("difference_ties").innerHTML = "<div class='green'>" + document.getElementById("difference_ties").textContent + "</div>";
        if (ties[0] < ties[1]) document.getElementById("difference_ties").innerHTML = "<div class='red'>" + document.getElementById("difference_ties").textContent + "</div>";
        if (ties[0] == ties[1]) document.getElementById("difference_ties").innerHTML = "<div class='white'>" + document.getElementById("difference_ties").textContent + "</div>";

        if (quits[0] > quits[1]) document.getElementById("difference_quits").innerHTML = "<div class='green'>" + document.getElementById("difference_quits").textContent + "</div>";
        if (quits[0] < quits[1]) document.getElementById("difference_quits").innerHTML = "<div class='red'>" + document.getElementById("difference_quits").textContent + "</div>";
        if (quits[0] == quits[1]) document.getElementById("difference_quits").innerHTML = "<div class='white'>" + document.getElementById("difference_quits").textContent + "</div>";

        if (winStreak[0] > winStreak[1]) document.getElementById("difference_winstreak").innerHTML = "<div class='green'>" + document.getElementById("difference_winstreak").textContent + "</div>";
        if (winStreak[0] < winStreak[1]) document.getElementById("difference_winstreak").innerHTML = "<div class='red'>" + document.getElementById("difference_winstreak").textContent + "</div>";
        if (winStreak[0] == winStreak[1]) document.getElementById("difference_winstreak").innerHTML = "<div class='white'>" + document.getElementById("difference_winstreak").textContent + "</div>";

        if (quits[0] > quits[1]) document.getElementById("difference_quits").innerHTML = "<div class='green'>" + document.getElementById("difference_quits").textContent + "</div>";
        if (quits[0] < quits[1]) document.getElementById("difference_quits").innerHTML = "<div class='red'>" + document.getElementById("difference_quits").textContent + "</div>";
        if (quits[0] == quits[1]) document.getElementById("difference_quits").innerHTML = "<div class='white'>" + document.getElementById("difference_quits").textContent + "</div>";

        if (secondsPlayed[0] > secondsPlayed[1]) document.getElementById("difference_playtime").innerHTML = "<div class='green'>" + document.getElementById("difference_playtime").textContent + "</div>";
        if (secondsPlayed[0] < secondsPlayed[1]) document.getElementById("difference_playtime").innerHTML = "<div class='red'>" + document.getElementById("difference_playtime").textContent + "</div>";
        if (secondsPlayed[0] == secondsPlayed[1]) document.getElementById("difference_playtime").innerHTML = "<div class='white'>" + document.getElementById("difference_playtime").textContent + "</div>";

        if (totalXp[0] > totalXp[1]) document.getElementById("difference_xp").innerHTML = "<div class='green'>" + document.getElementById("difference_xp").textContent + "</div>";
        if (totalXp[0] < totalXp[1]) document.getElementById("difference_xp").innerHTML = "<div class='red'>" + document.getElementById("difference_xp").textContent + "</div>";
        if (totalXp[0] == totalXp[1]) document.getElementById("difference_xp").innerHTML = "<div class='white'>" + document.getElementById("difference_xp").textContent + "</div>";

        if (overallPeakElo[0] > overallPeakElo[1]) document.getElementById("difference_overallpeakelo").innerHTML = "<div class='green'>" + document.getElementById("difference_overallpeakelo").textContent + "</div>";
        if (overallPeakElo[0] < overallPeakElo[1]) document.getElementById("difference_overallpeakelo").innerHTML = "<div class='red'>" + document.getElementById("difference_overallpeakelo").textContent + "</div>";
        if (overallPeakElo[0] == overallPeakElo[1]) document.getElementById("difference_overallpeakelo").innerHTML = "<div class='white'>" + document.getElementById("difference_overallpeakelo").textContent + "</div>";

        if (overallElo[0] > overallElo[1]) document.getElementById("difference_overallelo").innerHTML = "<div class='green'>" + document.getElementById("difference_overallelo").textContent + "</div>";
        if (overallElo[0] < overallElo[1]) document.getElementById("difference_overallelo").innerHTML = "<div class='red'>" + document.getElementById("difference_overallelo").textContent + "</div>";
        if (overallElo[0] == overallElo[1]) document.getElementById("difference_overallelo").innerHTML = "<div class='white'>" + document.getElementById("difference_overallelo").textContent + "</div>";

        if (elementElo[0] > elementElo[1]) document.getElementById("difference_elementelo").innerHTML = "<div class='green'>" + document.getElementById("difference_elementelo").textContent + "</div>";
        if (elementElo[0] < elementElo[1]) document.getElementById("difference_elementelo").innerHTML = "<div class='red'>" + document.getElementById("difference_elementelo").textContent + "</div>";
        if (elementElo[0] == elementElo[1]) document.getElementById("difference_elementelo").innerHTML = "<div class='white'>" + document.getElementById("difference_elementelo").textContent + "</div>";

        if (elementPeakElo[0] > elementPeakElo[1]) document.getElementById("difference_elementpeakelo").innerHTML = "<div class='green'>" + document.getElementById("difference_elementpeakelo").textContent + "</div>";
        if (elementPeakElo[0] < elementPeakElo[1]) document.getElementById("difference_elementpeakelo").innerHTML = "<div class='red'>" + document.getElementById("difference_elementpeakelo").textContent + "</div>";
        if (elementPeakElo[0] == elementPeakElo[1]) document.getElementById("difference_elementpeakelo").innerHTML = "<div class='white'>" + document.getElementById("difference_elementpeakelo").textContent + "</div>";

        if (elementPlayed[0] > elementPlayed[1]) document.getElementById("difference_elementgames").innerHTML = "<div class='green'>" + document.getElementById("difference_elementgames").textContent + "</div>";
        if (elementPlayed[0] < elementPlayed[1]) document.getElementById("difference_elementgames").innerHTML = "<div class='red'>" + document.getElementById("difference_elementgames").textContent + "</div>"; 
        if (elementPlayed[0] == elementPlayed[1]) document.getElementById("difference_elementgames").innerHTML = "<div class='white'>" + document.getElementById("difference_elementgames").textContent + "</div>"; 

        if (elementWins[0] > elementWins[1]) document.getElementById("difference_elementwins").innerHTML = "<div class='green'>" + document.getElementById("difference_elementwins").textContent + "</div>";
        if (elementWins[0] < elementWins[1]) document.getElementById("difference_elementwins").innerHTML = "<div class='red'>" + document.getElementById("difference_elementwins").textContent + "</div>";
        if (elementWins[0] == elementWins[1]) document.getElementById("difference_elementwins").innerHTML = "<div class='white'>" + document.getElementById("difference_elementwins").textContent + "</div>";

        if (elementLosses[0] > elementLosses[1]) document.getElementById("difference_elementlosses").innerHTML = "<div class='green'>" + document.getElementById("difference_elementlosses").textContent + "</div>";
        if (elementLosses[0] < elementLosses[1]) document.getElementById("difference_elementlosses").innerHTML = "<div class='red'>" + document.getElementById("difference_elementlosses").textContent + "</div>";
        if (elementLosses[0] == elementLosses[1]) document.getElementById("difference_elementlosses").innerHTML = "<div class='white'>" + document.getElementById("difference_elementlosses").textContent + "</div>";

        if (elementXp[0] > elementXp[1]) document.getElementById("difference_elementxp").innerHTML = "<div class='green'>" + document.getElementById("difference_elementxp").textContent + "</div>";
        if (elementXp[0] < elementXp[1]) document.getElementById("difference_elementxp").innerHTML = "<div class='red'>" + document.getElementById("difference_elementxp").textContent + "</div>";
        if (elementXp[0] == elementXp[1]) document.getElementById("difference_elementxp").innerHTML = "<div class='white'>" + document.getElementById("difference_elementxp").textContent + "</div>";


        if (groveElo[0] > groveElo[1]) document.getElementById("difference_groveelo").innerHTML = "<div class='green'>" + document.getElementById("difference_groveelo").textContent + "</div>";
        if (groveElo[0] < groveElo[1]) document.getElementById("difference_groveelo").innerHTML = "<div class='red'>" + document.getElementById("difference_groveelo").textContent + "</div>";
        if (groveElo[0] == groveElo[1]) document.getElementById("difference_groveelo").innerHTML = "<div class='white'>" + document.getElementById("difference_groveelo").textContent + "</div>";

        if (grovePeakElo[0] > grovePeakElo[1]) document.getElementById("difference_grovepeakelo").innerHTML = "<div class='green'>" + document.getElementById("difference_grovepeakelo").textContent + "</div>";
        if (grovePeakElo[0] < grovePeakElo[1]) document.getElementById("difference_grovepeakelo").innerHTML = "<div class='red'>" + document.getElementById("difference_grovepeakelo").textContent + "</div>";
        if (grovePeakElo[0] == grovePeakElo[1]) document.getElementById("difference_grovepeakelo").innerHTML = "<div class='white'>" + document.getElementById("difference_grovepeakelo").textContent + "</div>";

        if (grovePlayed[0] > grovePlayed[1]) document.getElementById("difference_grovegames").innerHTML = "<div class='green'>" + document.getElementById("difference_grovegames").textContent + "</div>";
        if (grovePlayed[0] < grovePlayed[1]) document.getElementById("difference_grovegames").innerHTML = "<div class='red'>" + document.getElementById("difference_grovegames").textContent + "</div>";
        if (grovePlayed[0] == grovePlayed[1]) document.getElementById("difference_grovegames").innerHTML = "<div class='white'>" + document.getElementById("difference_grovegames").textContent + "</div>";

        if (groveWins[0] > groveWins[1]) document.getElementById("difference_grovewins").innerHTML = "<div class='green'>" + document.getElementById("difference_grovewins").textContent + "</div>";
        if (groveWins[0] < groveWins[1]) document.getElementById("difference_grovewins").innerHTML = "<div class='red'>" + document.getElementById("difference_grovewins").textContent + "</div>";
        if (groveWins[0] == groveWins[1]) document.getElementById("difference_grovewins").innerHTML = "<div class='white'>" + document.getElementById("difference_grovewins").textContent + "</div>";

        if (groveLosses[0] > groveLosses[1]) document.getElementById("difference_grovelosses").innerHTML = "<div class='green'>" + document.getElementById("difference_grovelosses").textContent + "</div>";
        if (groveLosses[0] < groveLosses[1]) document.getElementById("difference_grovelosses").innerHTML = "<div class='red'>" + document.getElementById("difference_grovelosses").textContent + "</div>";
        if (groveLosses[0] == groveLosses[1]) document.getElementById("difference_grovelosses").innerHTML = "<div class='white'>" + document.getElementById("difference_grovelosses").textContent + "</div>";

        if (groveXp[0] > groveXp[1]) document.getElementById("difference_grovexp").innerHTML = "<div class='green'>" + document.getElementById("difference_grovexp").textContent + "</div>";
        if (groveXp[0] < groveXp[1]) document.getElementById("difference_grovexp").innerHTML = "<div class='red'>" + document.getElementById("difference_grovexp").textContent + "</div>";
        if (groveXp[0] == groveXp[1]) document.getElementById("difference_grovexp").innerHTML = "<div class='white'>" + document.getElementById("difference_grovexp").textContent + "</div>";


        if (forsakenElo[0] > forsakenElo[1]) document.getElementById("difference_forsakenelo").innerHTML = "<div class='green'>" + document.getElementById("difference_forsakenelo").textContent + "</div>";
        if (forsakenElo[0] < forsakenElo[1]) document.getElementById("difference_forsakenelo").innerHTML = "<div class='red'>" + document.getElementById("difference_forsakenelo").textContent + "</div>";
        if (forsakenElo[0] == forsakenElo[1]) document.getElementById("difference_forsakenelo").innerHTML = "<div class='white'>" + document.getElementById("difference_forsakenelo").textContent + "</div>";

        if (forsakenPeakElo[0] > forsakenPeakElo[1]) document.getElementById("difference_forsakenpeakelo").innerHTML = "<div class='green'>" + document.getElementById("difference_forsakenpeakelo").textContent + "</div>";
        if (forsakenPeakElo[0] < forsakenPeakElo[1]) document.getElementById("difference_forsakenpeakelo").innerHTML = "<div class='red'>" + document.getElementById("difference_forsakenpeakelo").textContent + "</div>";
        if (forsakenPeakElo[0] == forsakenPeakElo[1]) document.getElementById("difference_forsakenpeakelo").innerHTML = "<div class='white'>" + document.getElementById("difference_forsakenpeakelo").textContent + "</div>";

        if (forsakenPlayed[0] > forsakenPlayed[1]) document.getElementById("difference_forsakengames").innerHTML = "<div class='green'>" + document.getElementById("difference_forsakengames").textContent + "</div>";
        if (forsakenPlayed[0] < forsakenPlayed[1]) document.getElementById("difference_forsakengames").innerHTML = "<div class='red'>" + document.getElementById("difference_forsakengames").textContent + "</div>";
        if (forsakenPlayed[0] == forsakenPlayed[1]) document.getElementById("difference_forsakengames").innerHTML = "<div class='white'>" + document.getElementById("difference_forsakengames").textContent + "</div>";

        if (forsakenWins[0] > forsakenWins[1]) document.getElementById("difference_forsakenwins").innerHTML = "<div class='green'>" + document.getElementById("difference_forsakenwins").textContent + "</div>";
        if (forsakenWins[0] < forsakenWins[1]) document.getElementById("difference_forsakenwins").innerHTML = "<div class='red'>" + document.getElementById("difference_forsakenwins").textContent + "</div>";
        if (forsakenWins[0] == forsakenWins[1]) document.getElementById("difference_forsakenwins").innerHTML = "<div class='white'>" + document.getElementById("difference_forsakenwins").textContent + "</div>";

        if (forsakenLosses[0] > forsakenLosses[1]) document.getElementById("difference_forsakenlosses").innerHTML = "<div class='green'>" + document.getElementById("difference_forsakenlosses").textContent + "</div>";
        if (forsakenLosses[0] < forsakenLosses[1]) document.getElementById("difference_forsakenlosses").innerHTML = "<div class='red'>" + document.getElementById("difference_forsakenlosses").textContent + "</div>";
        if (forsakenLosses[0] == forsakenLosses[1]) document.getElementById("difference_forsakenlosses").innerHTML = "<div class='white'>" + document.getElementById("difference_forsakenlosses").textContent + "</div>";

        if (forsakenXp[0] > forsakenXp[1]) document.getElementById("difference_forsakenxp").innerHTML = "<div class='green'>" + document.getElementById("difference_forsakenxp").textContent + "</div>";
        if (forsakenXp[0] < forsakenXp[1]) document.getElementById("difference_forsakenxp").innerHTML = "<div class='red'>" + document.getElementById("difference_forsakenxp").textContent + "</div>";
        if (forsakenXp[0] == forsakenXp[1]) document.getElementById("difference_forsakenxp").innerHTML = "<div class='white'>" + document.getElementById("difference_forsakenxp").textContent + "</div>";


        if (mechElo[0] > mechElo[1]) document.getElementById("difference_mechelo").innerHTML = "<div class='green'>" + document.getElementById("difference_mechelo").textContent + "</div>";
        if (mechElo[0] < mechElo[1]) document.getElementById("difference_mechelo").innerHTML = "<div class='red'>" + document.getElementById("difference_mechelo").textContent + "</div>";
        if (mechElo[0] == mechElo[1]) document.getElementById("difference_mechelo").innerHTML = "<div class='white'>" + document.getElementById("difference_mechelo").textContent + "</div>";

        if (mechPeakElo[0] > mechPeakElo[1]) document.getElementById("difference_mechpeakelo").innerHTML = "<div class='green'>" + document.getElementById("difference_mechpeakelo").textContent + "</div>";
        if (mechPeakElo[0] < mechPeakElo[1]) document.getElementById("difference_mechpeakelo").innerHTML = "<div class='red'>" + document.getElementById("difference_mechpeakelo").textContent + "</div>";
        if (mechPeakElo[0] == mechPeakElo[1]) document.getElementById("difference_mechpeakelo").innerHTML = "<div class='white'>" + document.getElementById("difference_mechpeakelo").textContent + "</div>";

        if (mechPlayed[0] > mechPlayed[1]) document.getElementById("difference_mechgames").innerHTML = "<div class='green'>" + document.getElementById("difference_mechgames").textContent + "</div>";
        if (mechPlayed[0] < mechPlayed[1]) document.getElementById("difference_mechgames").innerHTML = "<div class='red'>" + document.getElementById("difference_mechgames").textContent + "</div>";
        if (mechPlayed[0] == mechPlayed[1]) document.getElementById("difference_mechgames").innerHTML = "<div class='white'>" + document.getElementById("difference_mechgames").textContent + "</div>";

        if (mechWins[0] > mechWins[1]) document.getElementById("difference_mechwins").innerHTML = "<div class='green'>" + document.getElementById("difference_mechwins").textContent + "</div>";
        if (mechWins[0] < mechWins[1]) document.getElementById("difference_mechwins").innerHTML = "<div class='red'>" + document.getElementById("difference_mechwins").textContent + "</div>";
        if (mechWins[0] == mechWins[1]) document.getElementById("difference_mechwins").innerHTML = "<div class='white'>" + document.getElementById("difference_mechwins").textContent + "</div>";

        if (mechLosses[0] > mechLosses[1]) document.getElementById("difference_mechlosses").innerHTML = "<div class='green'>" + document.getElementById("difference_mechlosses").textContent + "</div>";
        if (mechLosses[0] < mechLosses[1]) document.getElementById("difference_mechlosses").innerHTML = "<div class='red'>" + document.getElementById("difference_mechlosses").textContent + "</div>";
        if (mechLosses[0] == mechLosses[1]) document.getElementById("difference_mechlosses").innerHTML = "<div class='white'>" + document.getElementById("difference_mechlosses").textContent + "</div>";

        if (mechXp[0] > mechXp[1]) document.getElementById("difference_mechxp").innerHTML = "<div class='green'>" + document.getElementById("difference_mechxp").textContent + "</div>";
        if (mechXp[0] < mechXp[1]) document.getElementById("difference_mechxp").innerHTML = "<div class='red'>" + document.getElementById("difference_mechxp").textContent + "</div>";
        if (mechXp[0] == mechXp[1]) document.getElementById("difference_mechxp").innerHTML = "<div class='white'>" + document.getElementById("difference_mechxp").textContent + "</div>";

       
        if (mastermindElo[0] > mastermindElo[1]) document.getElementById("difference_mastermindelo").innerHTML = "<div class='green'>" + document.getElementById("difference_mastermindelo").textContent + "</div>";
        if (mastermindElo[0] < mastermindElo[1]) document.getElementById("difference_mastermindelo").innerHTML = "<div class='red'>" + document.getElementById("difference_mastermindelo").textContent + "</div>";
        if (mastermindElo[0] == mastermindElo[1]) document.getElementById("difference_mastermindelo").innerHTML = "<div class='white'>" + document.getElementById("difference_mastermindelo").textContent + "</div>";

        if (mastermindPeakElo[0] > mastermindPeakElo[1]) document.getElementById("difference_mastermindpeakelo").innerHTML = "<div class='green'>" + document.getElementById("difference_mastermindpeakelo").textContent + "</div>";
        if (mastermindPeakElo[0] < mastermindPeakElo[1]) document.getElementById("difference_mastermindpeakelo").innerHTML = "<div class='red'>" + document.getElementById("difference_mastermindpeakelo").textContent + "</div>";
        if (mastermindPeakElo[0] == mastermindPeakElo[1]) document.getElementById("difference_mastermindpeakelo").innerHTML = "<div class='white'>" + document.getElementById("difference_mastermindpeakelo").textContent + "</div>";

        if (mastermindPlayed[0] > mastermindPlayed[1]) document.getElementById("difference_mastermindgames").innerHTML = "<div class='green'>" + document.getElementById("difference_mastermindgames").textContent + "</div>";
        if (mastermindPlayed[0] < mastermindPlayed[1]) document.getElementById("difference_mastermindgames").innerHTML = "<div class='red'>" + document.getElementById("difference_mastermindgames").textContent + "</div>";
        if (mastermindPlayed[0] == mastermindPlayed[1]) document.getElementById("difference_mastermindgames").innerHTML = "<div class='white'>" + document.getElementById("difference_mastermindgames").textContent + "</div>";

        if (mastermindWins[0] > mastermindWins[1]) document.getElementById("difference_mastermindwins").innerHTML = "<div class='green'>" + document.getElementById("difference_mastermindwins").textContent + "</div>";
        if (mastermindWins[0] < mastermindWins[1]) document.getElementById("difference_mastermindwins").innerHTML = "<div class='red'>" + document.getElementById("difference_mastermindwins").textContent + "</div>";
        if (mastermindWins[0] == mastermindWins[1]) document.getElementById("difference_mastermindwins").innerHTML = "<div class='white'>" + document.getElementById("difference_mastermindwins").textContent + "</div>";

        if (mastermindLosses[0] > mastermindLosses[1]) document.getElementById("difference_mastermindlosses").innerHTML = "<div class='green'>" + document.getElementById("difference_mastermindlosses").textContent + "</div>";
        if (mastermindLosses[0] < mastermindLosses[1]) document.getElementById("difference_mastermindlosses").innerHTML = "<div class='red'>" + document.getElementById("difference_mastermindlosses").textContent + "</div>";
        if (mastermindLosses[0] == mastermindLosses[1]) document.getElementById("difference_mastermindlosses").innerHTML = "<div class='white'>" + document.getElementById("difference_mastermindlosses").textContent + "</div>";

        if (mastermindXp[0] > mastermindXp[1]) document.getElementById("difference_mastermindxp").innerHTML = "<div class='green'>" + document.getElementById("difference_mastermindxp").textContent + "</div>";
        if (mastermindXp[0] < mastermindXp[1]) document.getElementById("difference_mastermindxp").innerHTML = "<div class='red'>" + document.getElementById("difference_mastermindxp").textContent + "</div>";
        if (mastermindXp[0] == mastermindXp[1]) document.getElementById("difference_mastermindxp").innerHTML = "<div class='white'>" + document.getElementById("difference_mastermindxp").textContent + "</div>";
        queryBothPlayers(document.getElementById("playername").value, document.getElementById("playername2").value);
    }

}

function getPlayer() {
    counter = 0;
    anzahlSpieler = 2;
    playername = [2];
    gamesPlayed = [2];
    wins = [2];
    losses = [2];
    winRate = [2];
    ties = [2];
    quits = [2];
    winStreak = [2];
    secondsPlayed = [2];
    totalXp = [2];

    overallPeakElo = [2];
    overallElo = [2];

    elementPeakElo = [2];
    elementElo = [2];
    elementPlayed = [2];
    elementWins = [2];
    elementLosses = [2];
    elementXp = [2];

    forsakenPeakElo = [2];
    forsakenElo = [2];
    forsakenPlayed = [2];
    forsakenWins = [2];
    forsakenLosses = [2];
    forsakenXp = [2];

    grovePeakElo = [2];
    groveElo = [2];
    grovePlayed = [2];
    groveWins = [2];
    groveLosses = [2];
    groveXp = [2];

    mechPeakElo = [2];
    mechElo = [2];
    mechPlayed = [2];
    mechWins = [2];
    mechLosses = [2];
    mechXp = [2];

    mastermindPeakElo = [2];
    mastermindElo = [2];
    mastermindPlayed = [2];
    mastermindWins = [2];
    mastermindLosses = [2];
    mastermindXp = [2];
    player = [2];

    queryPlayer(document.getElementById("playername").value);
    
}

function gamesTogether(games_together, name1, name2){
    console.log(games_together);
    let games_together_amount = 0;
    let games_together_wins = 0;
    let games_against_amount = 0;
    let games_against_p1 = 0;
    let games_against_p2 = 0;
    //games_together = convertGameToNew(games_together);
    for(var i=0;i<games_together.length;i++){
        //together in one team
        try{
            if(games_together[i].gameDetails.filter(meinName => meinName.playerProfile.name.toUpperCase() == name1.toUpperCase())[0].gameResult =="won" && games_together[i].gameDetails.filter(meinName => meinName.playerProfile.name.toUpperCase() == name2.toUpperCase())[0].gameResult =="won"){
                games_together_amount++;
                games_together_wins++;
            }
            else if(games_together[i].gameDetails.filter(meinName => meinName.playerProfile.name.toUpperCase() == name1.toUpperCase())[0].gameResult =="lost" && games_together[i].gameDetails.filter(meinName => meinName.playerProfile.name.toUpperCase() == name2.toUpperCase())[0].gameResult =="lost"){
                games_together_amount++;
            }
            //against each other
            else if(games_together[i].gameDetails.filter(meinName => meinName.playerProfile.name.toUpperCase() == name1.toUpperCase())[0].gameResult =="won" && games_together[i].gameDetails.filter(meinName => meinName.playerProfile.name.toUpperCase() == name2.toUpperCase())[0].gameResult =="lost"){
                games_against_amount++;
                games_against_p1++;
            }
            else if(games_together[i].gameDetails.filter(meinName => meinName.playerProfile.name.toUpperCase() == name1.toUpperCase())[0].gameResult =="lost" && games_together[i].gameDetails.filter(meinName => meinName.playerProfile.name.toUpperCase() == name2.toUpperCase())[0].gameResult =="won"){
                games_against_amount++;
                games_against_p2++;
            }
        }
        catch(err){
            console.log(err);
            console.log(games_together[i]);
        }
        
    }
    document.getElementById("games_together").innerHTML="<b>Seasonal</b><br>Games together: "+games_together_amount; 
    if(games_together_amount>0){
        document.getElementById("wins_together").innerHTML="Wins together: "+games_together_wins +" ("+(games_together_wins/games_together_amount*100).toFixed(2)+"%)";
    }
    else{
        document.getElementById("wins_together").innerHTML="Wins together: "+games_together_wins;
    }
    
    document.getElementById("games_against").innerHTML="Games against: "+games_against_amount;  
    if(typeof(playername[0]) == "undefined") console.log("playername1 undefined");
    if(typeof(playername[1]) == "undefined") console.log("playername1 undefined");

    if(games_against_amount>0){
        document.getElementById("wins_player1").innerHTML="Wins "+playername[0]+": "+games_against_p1+" ("+(games_against_p1/games_against_amount*100).toFixed(2)+"%)";
        document.getElementById("wins_player2").innerHTML="Wins "+playername[1]+": "+games_against_p2+" ("+(games_against_p2/games_against_amount*100).toFixed(2)+"%)";
    }
    else{
        document.getElementById("wins_player1").innerHTML="Wins "+playername[0]+": "+games_against_p1;
        document.getElementById("wins_player2").innerHTML="Wins "+playername[1]+": "+games_against_p2;
    }
    
}

function apiGetPlayer(callback, playername) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var player = JSON.parse(xhttp.response);
            callback(player);
        }
    };
    xhttp.open("GET", '/api/profile/player?playername=' + playername, true);
    xhttp.send();
}

function queryPlayer(playername) {
    console.log("query player "+playername);
    apiGetPlayer(function (result) {
        result.player.statistics = JSON.parse(result.player.statistics);
        player = result.player;
        parseStats(player);
        return player;
    }, playername);
}

function apiGetBothPlayers(callback, playername1, playername2) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var player = JSON.parse(xhttp.response);
            callback(player);
        }
    };
    targetDb = document.getElementById("versionselect").value;
    xhttp.open("GET", "/mongo/getGames?type=duoplayer&db="+targetDb+"&limit=0&formating=none&name1="+playername1+"&name2="+playername2, true);
    xhttp.send();
}

function queryBothPlayers(playername1, playername2) {
    apiGetBothPlayers(function (result, error) {
        if(error){
            console.log(error);
        }
        else{
            games_together = JSON.parse(result);
            gamesTogether(games_together, playername1, playername2);
            return games_together;
        }
        
    }, playername1, playername2);
}

document.onkeydown = function (event) {
    if (event.keyCode === 13) {
        if (event.target.id === "playername" || event.target.id === "playername2") getPlayer();
    }
}







