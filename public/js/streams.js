init();

function init(){
    //request streamers from db
    queryAllStreamers();

    //show content
    document.getElementsByClassName("card")[0].style.display="";
    
}

function showFilters(){
    var container = document.getElementById("filterbox");

    if(container.style.display=="flex"){
        //show
        container.style.display="none";
        document.getElementById("filterbutton").textContent="Show Filters";
    }
    else{
        //hide
        container.style.display="flex";
        document.getElementById("filterbutton").textContent="Hide Filters";
    }
    
}

function updateFilters(){
    //triggered on filter input change










    listStreamers(streamers);
}

function listStreamers(streamers){
    document.getElementsByClassName("card")[0].style.display="";
    var streamlist = document.getElementById("flexbox");
    streamlist.innerHTML="";
    console.log(streamers);
    streamers.forEach(streamer =>{
        console.log(streamer);
        var filter_lang = document.getElementById("sel_languages").value;
        var filter_other = document.getElementById("sel_other").value;
        var filter_type = document.getElementById("sel_type").value;
        var filter_target = document.getElementById("sel_target").value;
        if((streamer.languages.includes(filter_lang) || filter_lang=="ALL" || streamer.languages[0]=="ALL") && (streamer.other == filter_other || filter_other=="ALL" || streamer.other=="ALL") && (streamer.type.includes(filter_type) || filter_type == "ALL" || streamer.type[0]=="ALL") && (streamer.target.includes(filter_target) || filter_target=="ALL" || streamer.target[0]=="ALL")){
            console.log(streamer);
            var new_ele = "<dic class='flexitem'><a href='https://player.twitch.tv/?channel=" + streamer.twitchname + "2&parent=www.ltdstats.com&autoplay=false', target='blank'><img class='twitchicon' src='/img/icons/GlitchBadge_Purple_24px.png'><h6>"+ streamer.twitchname +" </h6></a></div>"
            streamlist.innerHTML += new_ele;
        }
        
        
    });

}








// API Requests
function getAllStreamers(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var streamers = JSON.parse(xhttp.response);
            //if(debug) console.log(livegames);
            callback(streamers);
        }   
    };
    xhttp.open("GET", '/api/streamers', true);
    xhttp.send();
}

function queryAllStreamers() {
    getAllStreamers(function (result, err) {
        streamers = JSON.parse(result);
        if (streamers) {
            listStreamers(streamers);
            console.log(streamers);
            return streamers;
        }
        else {
            console.log(err);

        }

    });
}