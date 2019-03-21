function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
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
    getPds(response);
    $(document).ready(function() {
            $('#pds').html(fillPds(response));
            $('#deep').html(fillDeep(response));
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
    getPds(response);
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
function getPds(response) {
    for (i = 0; i < response.items.length; i++) {
        hour = (new Date(response.items[i].snippet.publishedAt)).getHours();
        if (hour > 14)
            return response.items[i];
    }
}
function getDeep(response) {
    for (i = 0; i < response.items.length; i++) {
        hour = (new Date(response.items[i].snippet.publishedAt)).getHours();
        if (hour < 15)
            return response.items[i];
    }
}