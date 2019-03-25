window.onload = function() {
    // load_elements();
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

function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
    load_menu();
}
  
  // Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyC9FbPGYeQJZkHZf_wh6tTxeHvUtspXZ0Y');
    channel();
    //search();
}

function channel() {
    var request = gapi.client.youtube.channels.list({
        part: 'contentDetails',
        id: 'UClFSU9_bUb4Rc6OYfTt5SPw'
    });
    request.execute(onChannelResponse);
}

function onChannelResponse(response) {
    var uploadsId = response.items[0].contentDetails.relatedPlaylists.uploads;
    uploads(uploadsId);
}

function uploads(uploadsId) {
    var request = gapi.client.youtube.playlistItems.list({
        part: 'snippet',
        playlistId: uploadsId,
        maxResults: 25,
    });
    request.execute(onUploadsResponse);
}

function onUploadsResponse(response) {
    // getPds(response);
    $(document).ready(function() {
            // $('#pds').html(fillPds(response));
            // $('#deep').html(fillDeep(response));
            $('#vids').html(fillVids(response));
    });
}
    
function search() {
    // Use the JavaScript client library to create a search.list() API call.
        var request = gapi.client.youtube.search.list({
        part: 'snippet',
        channelId: 'UClFSU9_bUb4Rc6OYfTt5SPw',
        order: 'date'
    });
    
    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(onSearchResponse);
}
    
    // Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    // getPds(response);
    $(document).ready(function() {
            $('#pds').html(fillPds(response));
            $('#deep').html(fillDeep(response));
    });
}
function thumbnail(item) {
    image = item.snippet.thumbnails.high.url;
    return '<img class="full" src="' + image + '"/>';
}
function title(item) {
    return item.snippet.title;
}
function link(item) {
    id = item.snippet.resourceId.videoId;
    return 'https://www.youtube.com/watch?v=' +
            id;
}
function fillPds(response) {
    vid = getPds(response);
    image = thumbnail(vid);
    caption = '<p>' + title(vid) + '</p>';
    url = link(vid);
    return '<a href="' +
            url + '">\
            <h1>Catch up on the latest PDS:</h1>' +
            image +
            caption +
            '</a>';
}
function fillDeep(response) {
    vid = getDeep(response);
    image = thumbnail(vid);
    caption = title(vid);
    url = link(vid);
    return '<a href="' +
            url + '">\
            <h1>Check out this deep dive:</h1>' +
            image +
            caption +
            '</a>';
}
function fillVids(response) {
    var content = "<h2>Recent Uploads</h2>";
    for (i = 0; i < response.items.length; i++) {
        caption = title(response.items[i]);
        url = link(response.items[i]);
        content = content + '<p><a href=' + url + '>' + title(response.items[i]) + '</a></p>';
    }
    return content;
}