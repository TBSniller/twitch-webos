var makedivchatbox;
var makechatframe;

var pathname = window.location.pathname;
console.log("Current pathname: " + pathname);

function observer() {
    var bodyList = document.querySelector("body")

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (pathname != window.location.pathname) {
                pathname = window.location.pathname;
                console.log("Sleeping few secounds after location change.. Current pathname: " + pathname);
                setTimeout(function() {
                    locationChanged();
                }, 4000);
            }
        });
    });

    var config = {
        childList: true,
        subtree: true
    };

    observer.observe(bodyList, config);
    console.log("Observing..");
};

if(!pathname.startsWith("/embed")){
    observer();
}

function addBTTV(){
    console.log("Appending BetterTTV..");
    const bttv = document.createElement('script');
    bttv.type = 'text/javascript';
    bttv.src = 'https://cdn.betterttv.net/betterttv.js';
    document.head.appendChild(bttv);

}

function createChat(){
    var streamer = pathname.substring(1);
    console.log("Creating chat for " + streamer);

    makedivchatbox = document.createElement("div");
    makedivchatbox.style.position = "relative";
    makedivchatbox.setAttribute("class", "btwich-chat");
    makedivchatbox.style.bottom = "0";
    makedivchatbox.style.width = "100%";
    makedivchatbox.style.height = "100%";
    makedivchatbox.style.backgroundColor = "#18181b";

    makechatframe = document.createElement("iframe");
    makechatframe.setAttribute("src", "https://www.twitch.tv/embed/" + streamer + "/chat?darkpopout&parent=coyhhqjzbvbinjy4.lg.tv.twitch.tv/");
    makechatframe.setAttribute("id", "tchatframe");
    makechatframe.setAttribute("frameborder", "0");
    makechatframe.style.width = "100%";
    makechatframe.style.height = "100%";
    makechatframe.style.backgroundColor = "#18181b";

    makedivchatbox.appendChild(makechatframe);
}

async function addChat(){
    createChat();
    console.log("Adding chat..");

    var chatasides = document.querySelectorAll("[class^='ScChatAside']");
    while (chatasides[0].firstChild) {
        chatasides[0].removeChild(chatasides[0].firstChild);
    }

    chatasides[0].appendChild(makedivchatbox);
}

async function locationChanged(){
    console.log("Location changed.");
    if(pathname == "/" || pathname.startsWith("/settings") || pathname.startsWith("/directory") || pathname.startsWith("/search") || pathname.startsWith("/videos") || pathname.startsWith("/login") || pathname.startsWith("/embed") || pathname.endsWith("/home")){
        console.log("Non chat location. Skipping chat add. Path:" + pathname);
        return;
    }
    addChat();
    addBTTV();
}

locationChanged();
addBTTV();