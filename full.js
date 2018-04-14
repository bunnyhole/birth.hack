let stream_id;
let hostname = "wss://localhost:8443";

let localVideo;

function init() {
    Flashphoner.init();
    localVideo = document.getElementById("localVideo");
}

function start_stream() {
    stream_id = document.getElementById("streamer_id").value;
    Flashphoner.createSession({urlServer: hostname}).on(Flashphoner.constants.SESSION_STATUS.ESTABLISHED, function (session) {
        //session connected, start streaming
        startStreaming(session);
    }).on(Flashphoner.constants.SESSION_STATUS.DISCONNECTED, function () {
        setStatus("DISCONNECTED", "status_stream");
    }).on(Flashphoner.constants.SESSION_STATUS.FAILED, function () {
        setStatus("FAILED", "status_stream");
    });
}

function startStreaming(session) {
    session.createStream({
        name: stream_id,
        display: localVideo,
        cacheLocalResources: true,
        receiveVideo: false,
        receiveAudio: false
    }).on(Flashphoner.constants.STREAM_STATUS.PUBLISHING, function (publishStream) {
        setStatus(Flashphoner.constants.STREAM_STATUS.PUBLISHING, "status_stream");
    }).on(Flashphoner.constants.STREAM_STATUS.UNPUBLISHED, function () {
        setStatus(Flashphoner.constants.STREAM_STATUS.UNPUBLISHED, "status_stream");
    }).on(Flashphoner.constants.STREAM_STATUS.FAILED, function () {
        setStatus(Flashphoner.constants.STREAM_STATUS.FAILED, "status_stream");
    }).publish();
}

function setStatus(status, element_id) {
    document.getElementById(element_id).innerHTML = status;
}

let friends_id_list = ["1", "2"];

function update_friends() {
    for (let i = 1; i <= 10; i++) {
        document.getElementById("remoteVideo" + i).innerHTML = "";
        document.getElementById("remoteVideo" + i).style.display = "none";
    }

    friends_id_list.forEach(function (friend_id, i, friends_id_list) {
        console.log(friend_id);
        Flashphoner.createSession({urlServer: hostname}).on(Flashphoner.constants.SESSION_STATUS.ESTABLISHED, function (session) {
            //session connected, start streaming
            console.log("session:", session);
            startPlayback(session, friend_id, friend_id);
        }).on(Flashphoner.constants.SESSION_STATUS.DISCONNECTED, function () {
            setStatus("DISCONNECTED", "status" + friend_id);
        }).on(Flashphoner.constants.SESSION_STATUS.FAILED, function () {
            setStatus("FAILED", "status" + friend_id);
        });
    });


}

function startPlayback(session, friend_id, friend_video_id) {
    let tag_friend_video_id = "remoteVideo" + friend_video_id;
    let remoteVideo = document.getElementById(tag_friend_video_id);
    let name_stream = "stream" + friend_id;
    console.log(tag_friend_video_id, name_stream);
    session.createStream({
        name: name_stream,
        display: remoteVideo,
        cacheLocalResources: true,
        receiveVideo: true,
        receiveAudio: true
    }).on(Flashphoner.constants.STREAM_STATUS.PLAYING, function (playStream) {
        setStatus(Flashphoner.constants.STREAM_STATUS.PLAYING, "status" + friend_video_id);
        document.getElementById(tag_friend_video_id).style.display = "block";
    }).on(Flashphoner.constants.STREAM_STATUS.STOPPED, function () {
        setStatus(Flashphoner.constants.STREAM_STATUS.STOPPED, "status" + friend_video_id);
    }).on(Flashphoner.constants.STREAM_STATUS.FAILED, function () {
        setStatus(Flashphoner.constants.STREAM_STATUS.FAILED, "status" + friend_video_id);
    }).play();
}