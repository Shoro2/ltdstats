/*
Author: GvR Mr Mister / Shoro2
ltdstats.com script
*/
var debug = false;

var unitstats = [
    // Atlantean
    {name:"angler",value:40},
    {name:"azeria",value:540},
    {name:"bountyhunter",value:165},
    {name:"deepcoiler",value:275},
    {name:"devilfish",value:95},
    {name:"eggsack",value:275},
    {name:"grarl",value:145},
    {name:"hydra",value:275},
    {name:"kingclaw",value:420},
    {name:"kingpin",value:415},
    {name:"oceantemplar",value:320},
    {name:"pollywog",value:15},
    {name:"priestessoftheabyss",value:190},
    {name:"seaserpent",value:90},
    {name:"seraphin",value:95},
    // Element
    {name:"aquaspirit",value:50},
    {name:"atom",value:90},
    {name:"disciple",value:195},
    {name:"fenix",value:705},
    {name:"fireelemental",value:190},
    {name:"firelord",value:275},
    {name:"golem",value:405},
    {name:"mudman",value:140},
    {name:"proton",value:20},
    {name:"roguewave",value:165},
    {name:"starcaller",value:530},
    {name:"violet",value:265},
    {name:"windhawk",value:85},
    // Forsaken
    {name:"bonecrusher",value:110},
    {name:"bonewarrior",value:15},
    {name:"butcher",value:150},
    {name:"darkmage",value:95},
    {name:"doppelganger",value:525},
    {name:"firearcher",value:80},
    {name:"gargoyle",value:40},
    {name:"gateguard",value:100},
    {name:"greendevil",value:160},
    {name:"hades",value:675},
    {name:"harbinger",value:300},
    {name:"headchef",value:415},
    {name:"lordofdeath",value:265},
    {name:"nightmare",value:185},
    // Grove
    {name:"antler",value:200},
    {name:"bananabunk",value:280},
    {name:"bananahaven",value:700},
    {name:"buzz",value:20},
    {name:"canopie",value:275},
    {name:"consort",value:105},
    {name:"daphne",value:180},
    {name:"deathcap",value:395},
    {name:"honeyflower",value:130},
    {name:"ranger",value:55},
    {name:"whitemane",value:555},
    {name:"wileshroom",value:95},
    // Mech
    {name:"aps",value:150},
    {name:"bazooka",value:45},
    {name:"berserker",value:190},
    {name:"doomsdaymachine",value:715},
    {name:"fatalizer",value:545},
    {name:"leviathan",value:280},
    {name:"mps",value:400},
    {name:"millennium",value:290},
    {name:"peewee",value:25},
    {name:"pyro",value:220},
    {name:"tempest",value:90},
    {name:"veteran",value:115},
    {name:"zeus",value:175},
    // Nomad
    {name:"alphamale",value:285},
    {name:"desertpilgrim",value:135},
    {name:"greatboar",value:270},
    {name:"harpy",value:35},
    {name:"ironscales",value:530},
    {name:"lioness",value:260},
    {name:"looter",value:10},
    {name:"lostchieftain",value:390},
    {name: "packrat", value: 75 },
    {name: "packratnest", value: 75},
    {name:"redeyes",value:690},
    {name:"sandbadger",value:195},
    {name:"skyqueen",value:200},
    { name: "warg", value: 85 },
    // Shrine
    { name: "maskedspirit", value: 25 },
    { name: "falsemaiden", value: 95 },
    { name: "hellraiser", value: 215 },
    { name: "hellraiserbuffed", value: 215 },
    { name: "nekomata", value: 60 },
    { name: "orchid", value: 280 },
    { name: "infiltrator", value: 80 },
    { name: "eternalwanderer", value: 125 },
    { name: "samuraisoul", value: 400 },
    { name: "yozora", value: 190 },
    { name: "arctaire", value: 430 },
    { name: "soulgate", value: 260 },
    { name: "hellgate", value: 420 },

    // Divine
    { name: "chainedfist", value: 20},
    { name: "oathbreaker", value: 95},
    { name: "goldenbuckler", value: 50},
    { name: "royalguard", value: 185},
    { name: "sacredsteed", value: 80},
    { name: "pegasus", value: 270},
    { name: "elitearcher", value: 145},
    { name: "trinityarcher", value: 410},
    { name: "radianthalo", value: 200},
    { name: "arcofjustice", value: 535},
    { name: "holyavenger", value: 270},
    { name: "sovereign", value: 700},
    //buggy api yay
    { name:"atlanteant1", value: 15},
    { name:"atlanteant1u", value: 95},
    { name:"atlanteant1u2", value: 95}
];


function getTotalValue(input){
    var val_total = 0;
    input.forEach(element => {
        var unitstring = element.substring(0, element.indexOf("_unit_id"));
        if(debug) console.log(unitstring);
        var value = unitstats.filter(unitstats => unitstats.name == unitstring.replaceAll("_",""))[0].value;
        if(debug) console.log(value);
        val_total = val_total + value;
    });
    return val_total
}