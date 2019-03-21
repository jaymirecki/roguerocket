window.onload = function() {
    load_elements();
}
function load_elements() {
    load_menu();
    load_vids();
    load_tweets();
}
function load_menu() {
    menubar = document.getElementById("menubar");
    menubar.innerHTML = "<img class='menu' src='logo.png' alt='Rogue Rocket' />\
    <ul class='menu'>\
    <li class='menu'><a href='home.html'>Home</a></li>\
    <li class='menu'><a href='pds.html'>PDS</a></li>\
    <li class='menu'><a href='deep_dives.html'>Deep Dives</a></li>\
    <li class='menu'><a href='stories.html'>Stories</a></li>\
    </ul>"
}
function load_vids() {
    vids = document.getElementById("vids");
    vids.innerHTML = "<p>This is where recent videos will be listed</p>"
}
function load_tweets() {
    tweets = document.getElementById("tweets");
    // tweets.innerHTML = "<p>This is where recent tweets will be listed</p>"
}