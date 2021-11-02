function checkContent() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var playerurl = url.searchParams.get("unit");
    if (playerurl !== null) {
        document.getElementById("playername").value = playerurl;
    }
    if (document.getElementById("playername").value) {
        loadFighter(playerurl);
    }
}

function getPlayer() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var playerurl = url.searchParams.get("unit");
    if (playerurl === null) {
        window.location.href = window.location.href + "?unit=" + document.getElementById("playername").value;
    }
    else {
        window.location.href = "/units" + "?unit=" + document.getElementById("playername").value;
    }

}

function scanUnits() {
    var units = ["proton", "atom", "aqua_spirit", "fire_elemental", "rogue_wave", "windhawk", "violet", "mudman", "golem", "disciple", "starcaller", "fire_lord", "fenix", "bone_warrior", "bone_crusher", "dark_mage", "fire_archer", "gargoyle", "green_devil", "gateguard", "harbinger", "butcher", "head_chef", "nightmare", "doppelganger", "lord_of_death", "hades", "buzz", "consort", "ranger", "daphne", "wileshroom", "canopie", "honeyflower", "deathcap", "antler", "whitemane", "banana_bunk", "banana_haven", "peewee", "veteran", "bazooka", "pyro", "zeus", "tempest", "leviathan", "APS", "MPS", "berserker", "fatalizer", "millennium", "doomsday_machine", "pollywog", "seraphin", "devilfish", "angler", "bounty_hunter", "kingpi", "sea_serpent", "deepcoiler", "grarl", "king_claw", "ocean_templar","priestess_of_the_abyss", "azeria", "eggsack", "Hydra", "looter", "pack_rat", "harpy", "sky_queen", "desert_pilgrim", "lost_chieftain", "sand_badger", "iron_scales", "great_boar", "red_eyes", "masked_spirit", "false_maiden", "hell_raiser", "nekomata", "infiltrator", "orchid", "eternal_wanderer", "samurai_soul", "yozora", "arctaire", "soul_gate", "hell_gate", "chained_fist", "oathbreaker"];
    units.forEach(unit => {
        switch (unit) {
            //element
            case "proton":
                var url = "/img/icons/Proton.png";
                var unit_type = "Proton";
                break;
            case "atom":
                url = "/img/icons/Atom.png";
                unit_type = "Atom";
                break;
            case "aqua_spirit":
                url = "/img/icons/AquaSpirit.png";
                unit_type = "Aqua%20Spirit";
                break;
            case "fire_elemental":
                url = "/img/icons/FireElemental.png";
                unit_type = "Fire%20Elemental";
                break;
            case "rogue_wave":
                url = "/img/icons/RogueWave.png";
                unit_type = "Rogue%20Wave";
                break;
            case "windhawk":
                url = "/img/icons/Windhawk.png";
                unit_type = "Windhawk";
                break;
            case "violet":
                url = "/img/icons/Violet.png";
                unit_type = "Violet";
                break;
            case "mudman":
                url = "/img/icons/Mudman.png";
                unit_type = "Mudman";
                break;
            case "golem":
                url = "/img/icons/Golem.png";
                unit_type = "Golem";
                break;
            case "disciple":
                url = "/img/icons/Disciple.png";
                unit_type = "Disciple";
                break;
            case "starcaller":
                url = "/img/icons/Starcaller.png";
                unit_type = "Starcaller";
                break;
            case "fire_lord":
                url = "/img/icons/FireLord.png";
                unit_type = "Fire%20Lord";
                break;
            case "fenix":
                url = "/img/icons/Fenix.png";
                unit_type = "Fenix";
                break;
            //grove
            case "buzz":
                url = "/img/icons/Buzz.png";
                unit_type = "Buzz";
                break;
            case "consort":
                url = "/img/icons/Consort.png";
                unit_type = "Consort";
                break;
            case "ranger":
                url = "/img/icons/Ranger.png";
                unit_type = "Ranger";
                break;
            case "daphne":
                url = "/img/icons/Daphne.png";
                unit_type = "Daphne";
                break;
            case "wileshroom":
                url = "/img/icons/Wileshroom.png";
                unit_type = "Wileshroom";
                break;
            case "canopie":
                url = "/img/icons/Canopie.png";
                unit_type = "Canopie";
                break;
            case "honeyflower":
                url = "/img/icons/Honeyflower.png";
                unit_type = "Honeyflower";
                break;
            case "deathcap":
                url = "/img/icons/Deathcap.png";
                unit_type = "Deathcap";
                break;
            case "antler":
                url = "/img/icons/Antler.png";
                unit_type = "Antler";
                break;
            case "whitemane":
                url = "/img/icons/Whitemane.png";
                unit_type = "Whitemane";
                break;
            case "banana_bunk":
                url = "/img/icons/BananaBunk.png";
                unit_type = "Banana%20Bunk";
                break;
            case "banana_haven":
                url = "/img/icons/BananaHaven.png";
                unit_type = "Banana%20Haven";
                break;
            //forsaken
            case "bone_warrior":
                url = "/img/icons/BoneWarrior.png";
                unit_type = "Bone%20Warrior";
                break;
            case "bone_crusher":
                url = "/img/icons/BoneCrusher.png";
                unit_type = "Bone%20Crusher";
                break;
            case "dark_mage":
                url = "/img/icons/DarkMage.png";
                unit_type = "Dark%20Mage";
                break;
            case "fire_archer":
                url = "/img/icons/FireArcher.png";
                unit_type = "Fire%20Archer";
                break;
            case "gargoyle":
                url = "/img/icons/Gargoyle.png";
                unit_type = "Gargoyle";
                break;
            case "green_devil":
                url = "/img/icons/GreenDevil.png";
                unit_type = "Green%20Devil";
                break;
            case "gateguard":
                url = "/img/icons/Gateguard.png";
                unit_type = "Gateguard";
                break;
            case "harbinger":
                url = "/img/icons/Harbinger.png";
                unit_type = "Harbinger";
                break;
            case "butcher":
                url = "/img/icons/Butcher.png";
                unit_type = "Butcher";
                break;
            case "head_chef":
                url = "/img/icons/HeadChef.png";
                unit_type = "Head%20Chef";
                break;
            case "nightmare":
                url = "/img/icons/Nightmare.png";
                unit_type = "Nightmare";
                break;
            case "doppelganger":
                url = "/img/icons/Doppelganger.png";
                unit_type = "Doppelganger";
                break;
            case "lord_of_death":
                url = "/img/icons/LordOfDeath.png";
                unit_type = "Lord%20Of%20Death";
                break;
            case "hades":
                url = "/img/icons/Hades.png";
                unit_type = "Hades";
                break;
            //mech
            case "peewee":
                url = "/img/icons/Peewee.png";
                unit_type = "Peewee";
                break;
            case "veteran":
                url = "/img/icons/Veteran.png";
                unit_type = "Veteran";
                break;
            case "bazooka":
                url = "/img/icons/Bazooka.png";
                unit_type = "Bazooka";
                break;
            case "zeus":
                url = "/img/icons/Zeus.png";
                unit_type = "Zeus";
                break;
            case "pyro":
                url = "/img/icons/Pyro.png";
                unit_type = "Pyro";
                break;
            case "tempest":
                url = "/img/icons/Tempest.png";
                unit_type = "Tempest";
                break;
            case "leviathan":
                url = "/img/icons/Leviathan.png";
                unit_type = "Leviathan";
                break;
            case "APS":
                url = "/img/icons/APS.png";
                unit_type = "APS";
                break;
            case "MPS":
                url = "/img/icons/MPS.png";
                unit_type = "MPS";
                break;
            case "berserker":
                url = "/img/icons/Berserker.png";
                unit_type = "Berserker";
                break;
            case "fatalizer":
                url = "/img/icons/Fatalizer.png";
                unit_type = "Fatalizer";
                break;
            case "millennium":
                url = "/img/icons/Millennium.png";
                unit_type = "Millennium";
                break;
            case "doomsday_machine":
                url = "/img/icons/DoomsdayMachine.png";
                unit_type = "Doomsday%20Machine";
                break;
            // Atlantean
            case "pollywog":
                url = "/img/icons/Pollywog.png";
                unit_type = "Pollywog";
                break;
            case "devilfish":
                url = "/img/icons/Devilfish.png";
                unit_type = "Devilfish";
                break;
            case "seraphin":
                url = "/img/icons/Seraphin.png";
                unit_type = "Seraphin";
                break;
            case "angler":
                url = "/img/icons/Angler.png";
                unit_type = "Angler";
                break;
            case "bounty_hunter":
                url = "/img/icons/BountyHunter.png";
                unit_type = "Bounty%20%Hunter";
                break;
            case "kingpin":
                url = "/img/icons/Kingpin.png";
                unit_type = "Kingpin";
                break;
            case "kingpi": //WTF?!
                url = "/img/icons/Kingpin.png";
                unit_type = "Kingpin";
                break;
            case "sea_serpent":
                url = "/img/icons/SeaSerpent.png";
                unit_type = "Sea%20Serpent";
                break;
            case "deepcoiler":
                url = "/img/icons/Deepcoiler.png";
                unit_type = "Deepcoiler";
                break;
            case "grarl":
                url = "/img/icons/Grarl.png";
                unit_type = "Grarl";
                break;
            case "king_claw":
                url = "/img/icons/KingClaw.png";
                unit_type = "King%20Claw";
                break;
            case "ocean_templar":
                url = "/img/icons/OceanTemplar.png";
                unit_type = "Ocean%20Templar";
                break;
            case "azeria":
                var url = "/img/icons/Azeria.png";
                var unit_type = "Azeria";
                break;
            case "priestess_of_the_abyss":
                var url = "/img/icons/PriestessOfTheAbyss.png";
                var unit_type = "Priestess%20of%20the%20Abyss";
                break;
            case "eggsack":
                url = "/img/icons/Eggsack.png";
                unit_type = "Eggsack";
                break;
            case "Hydra":
                url = "/img/icons/Hydra.png";
                unit_type = "Hydra";
                break;
            case "looter":
                url = "/img/icons/Looter.png";
                unit_type = "Looter";
                break;
            case "pack_rat":
                url = "/img/icons/PackRat.png";
                unit_type = "Pack%20Rat";
                break;
            case "harpy":
                url = "/img/icons/Harpy.png";
                unit_type = "Harpy";
                break;
            case "sky_queen":
                url = "/img/icons/SkyQueen.png";
                unit_type = "Sky%20Queen";
                break;
            case "desert_pilgrim":
                url = "/img/icons/DesertPilgrim.png";
                unit_type = "Desert%20Pilgrim";
                break;
            case "lost_chieftain":
                url = "/img/icons/LostChieftain.png";
                unit_type = "Lost%20Chieftain";
                break;
            case "sand_badger":
                url = "/img/icons/SandBadger.png";
                unit_type = "Sand%20Badger";
                break;
            case "iron_scales":
                url = "/img/icons/IronScales.png";
                unit_type = "Iron%20Scales";
                break;
            case "great_boar":
                url = "/img/icons/GreatBoar.png";
                unit_type = "Great%20Boar";
                break;
            case "red_eyes":
                url = "/img/icons/RedEyes.png";
                unit_type = "Red%20Eyes";
                break;
            case "masked_spirit":
                url = "/img/icons/MaskedSpirit.png";
                unit_type = "Masked%20Spirit";
                break;
            case "false_maiden":
                url = "/img/icons/FalseMaiden.png";
                unit_type = "False%20Maiden";
                break;
            case "hell_raiser":
                url = "/img/icons/HellRaiser.png";
                unit_type = "Hell%20Raiser";
                break;
            case "nekomata":
                url = "/img/icons/Nekomata.png";
                unit_type = "Nekomata";
                break;
            case "infiltrator":
                url = "/img/icons/Infiltrator.png";
                unit_type = "Infiltrator";
                break;   
            case "orchid":
                url = "/img/icons/Orchid.png";
                unit_type = "Orchid";
                break;   
            case "eternal_wanderer":
                url = "/img/icons/EternalWanderer.png";
                unit_type = "Eternal%20Wanderer";
                break;   
            case "samurai_soul":
                url = "/img/icons/SamuraiSoul.png";
                unit_type = "Samurai%20Soul";
                break;   
            case "yozora":
                url = "/img/icons/Yozora.png";
                unit_type = "Yozora";
                break;   
            case "arctaire":
                url = "/img/icons/Arctaire.png";
                unit_type = "Arctaire";
                break;  
            case "soul_gate":
                url = "/img/icons/SoulGate.png";
                unit_type = "Soul%20Gate";
                break;    
            case "hell_gate":
                url = "/img/icons/HellGate.png";
                unit_type = "Hell%20Gate";
                break;   
            case "chained_fist":
                url = "/img/icons/ChainedFist.png";
                unit_type = "Chained%20Fist";
                break;   
            case "oathbreaker":
                url = "/img/icons/Oathbreaker.png";
                unit_type = "Oathbreaker";
                break;   
            default:
                url = "";
                unit_type = "empty";
                console.log(unit);
                break;
        }
        document.getElementById("carousel").innerHTML += "<div class='item'><img src='" + url + "' onclick=loadFighter('" + unit_type + "');></img></div>";
    });
}

function draw(myUnit) {
    var fighter = myUnit;
    wrapper = document.getElementsByClassName("wrap")[0];
    if (wrapper.classList.contains("active") === false) wrapper.classList.toggle("active");
    document.getElementById("unit_name").textContent = fighter.name;
    document.getElementById("unit_legion").innerHTML = "Legion: " + fighter.legion;
    document.getElementById("unit_icon").src = "/img/i" + fighter.iconPath.substring(1);
    document.getElementById("unit_health").innerHTML = "<img class='statpic' src='/img/icons/Health.png'> Health: " + fighter.hp;
    document.getElementById("unit_attackspeed").innerHTML = "<img class='statpic' src='/img/icons/AttackSpeedDecal.png> Attackspeed: " + fighter.attackSpeed;
    document.getElementById("unit_attacktype").innerHTML = "<img class='statpic' src='/img/icons/" + fighter.attackType + ".png'> Attack Type: " + fighter.attackType;
    document.getElementById("unit_defensetype").innerHTML = "<img class='statpic' src='/img/icons/" + fighter.armorType + ".png'> Armor Type: " + fighter.armorType;

    document.getElementById("unit_dps").innerHTML = "<img class='statpic' src='/img/icons/Damage.png'> DPS: " + fighter.dps;
    document.getElementById("unit_range").innerHTML = "<img class='statpic' src='/img/icons/Range.png'> Range: " + fighter.range;
    //fighter
    console.log(fighter.legion);
    if (fighter.legion !== "Mercenary" && fighter.legion !== "Creature") {
        console.log("gold");
        document.getElementById("unit_goldcost").innerHTML = "<img class='statpic' src='/img/icons/Gold_Currency.png'> Goldcost: " + fighter.goldCost;
        document.getElementById("unit_totalcost").innerHTML = "<img class='statpic' src='/img/icons/value.png'> Total Value: " + fighter.totalValue;
    }
    else {
        //mercs&creatures
        document.getElementById("unit_bounty").innerHTML = "<img class='statpic' src='/img/icons/Gold_Currency.png'> Bounty: " + fighter.bounty;
        if (fighter.legion == "Mercenary") {
            document.getElementById("unit_income").innerHTML = "<img class='statpic' src='/img/icons/Income.png'> Income: " + fighter.income;
        }
    }
    document.getElementById("unit_abilities").innerHTML = "Abilities: <ul>";
    if (fighter.abilities.length > 0) {
        for (var i = 0; i < fighter.abilities.length; i++) {
            if (fighter.abilities[i] !== null) document.getElementById("unit_abilities").innerHTML += "<li><img class='statpic' src='/img/icons/" + fighter.abilities[i].name.replace(/ /g, "") + ".png'> " + fighter.abilities[i].name + ": <i>" + fighter.abilities[i].tooltip + "</i> </li> <br>";
        }
    }
    else {
        document.getElementById("unit_abilities").innerHTML += "<li> None </li>";
    }
    document.getElementById("unit_abilities").innerHTML += "</ul>";
    document.getElementById("unit_upgrades").innerHTML = "Upgrades to: <ul>";
    if (fighter.upgradesTo.length > 0) {
        for (i = 0; i < fighter.upgradesTo.length; i++) {
            var upgrade_name = fighter.upgradesTo[i].substring(0, fighter.upgradesTo[i].indexOf("_unit")).replace("_", " ");
            upgrade_name = upgrade_name.charAt(0).toUpperCase() + upgrade_name.substring(1);
            for (var e = 0; e < upgrade_name.length; e++) {
                if (upgrade_name.charAt(e) === " ") {
                    upgrade_name = upgrade_name.substring(0, e) + " " + upgrade_name.charAt(e + 1).toUpperCase() + upgrade_name.substring(e + 2);
                }
            }
            switch (upgrade_name) {
                case "Aps":
                    upgrade_name = "APS";
                    break;
                case "Mps":
                    upgrade_name = "MPS";
                    break;
            }
            document.getElementById("unit_upgrades").innerHTML += "<li><a href='/units?unit=" + upgrade_name + "'><img class='statpic' src='/img/icons/" + upgrade_name.replace(" ", "") + ".png'> " + upgrade_name + " </a><br>";
        }
    }
    else {
        document.getElementById("unit_upgrades").innerHTML += "<li><i> No upgrade</i> </li>";
    }
    document.getElementById("unit_upgrades").innerHTML += "</ul><br>";
    document.getElementById("unit_description").innerHTML = "Description:<br> " + fighter.description;
}


// API

function getFighter(callback, unitname) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var fighters = JSON.parse(xhttp.response);
            callback(fighters);
        }
    };
    xhttp.open("GET", '/api/units?unitname=' + unitname, true);
    xhttp.send();
}

function loadFighter(unitname) {
    getFighter(function (result) {
        console.log(result);
        document.getElementById("playername").value = result.unit.name;
        draw(result.unit);
        return result;
    }, unitname);
}

document.onkeydown = function (event) {
    if (event.keyCode === 13) {
        if (event.target.id === "playername") getPlayer();
    }
};