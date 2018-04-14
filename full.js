let stream_id;
let hostname = "wss://localhost:8443";

let remoteVideo1;
let remoteVideo2;

let localVideo;

function init() {
    Flashphoner.init();
    localVideo = document.getElementById("localVideo");
    remoteVideo1 = document.getElementById("remoteVideo1");
    remoteVideo2 = document.getElementById("remoteVideo2");
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

let friends_list = ["stream1", "stream2"];

function update_friends() {
    for (let i = 1; i <= 10; i++) {
        document.getElementById("remoteVideo" + i).innerHTML = "";
        document.getElementById("remoteVideo" + i).style.display = "block";
    }


    Flashphoner.createSession({urlServer: hostname}).on(Flashphoner.constants.SESSION_STATUS.ESTABLISHED, function (session) {
        //session connected, start streaming
        startPlayback1(session);
    }).on(Flashphoner.constants.SESSION_STATUS.DISCONNECTED, function () {
        setStatus("DISCONNECTED", "status1");
    }).on(Flashphoner.constants.SESSION_STATUS.FAILED, function () {
        setStatus("FAILED", "status1");
    });

    Flashphoner.createSession({urlServer: hostname}).on(Flashphoner.constants.SESSION_STATUS.ESTABLISHED, function (session) {
        //session connected, start streaming
        startPlayback2(session);
    }).on(Flashphoner.constants.SESSION_STATUS.DISCONNECTED, function () {
        setStatus("DISCONNECTED", "status2");
    }).on(Flashphoner.constants.SESSION_STATUS.FAILED, function () {
        setStatus("FAILED", "status2");
    });
}

function startPlayback(session, friend_id, friend_video_id) {
    session.createStream({
        name: friend_id,
        display: friend_video_id,
        cacheLocalResources: true,
        receiveVideo: true,
        receiveAudio: true
    }).on(Flashphoner.constants.STREAM_STATUS.PLAYING, function (playStream) {
        setStatus(Flashphoner.constants.STREAM_STATUS.PLAYING, "status1");
    }).on(Flashphoner.constants.STREAM_STATUS.STOPPED, function () {
        setStatus(Flashphoner.constants.STREAM_STATUS.STOPPED, "status1");
    }).on(Flashphoner.constants.STREAM_STATUS.FAILED, function () {
        setStatus(Flashphoner.constants.STREAM_STATUS.FAILED, "status1");
    }).play();
}

function startPlayback2(session) {
    session.createStream({
        name: stream_id2,
        display: remoteVideo2,
        cacheLocalResources: true,
        receiveVideo: true,
        receiveAudio: true
    }).on(Flashphoner.constants.STREAM_STATUS.PLAYING, function (playStream) {
        setStatus(Flashphoner.constants.STREAM_STATUS.PLAYING, "status2");
    }).on(Flashphoner.constants.STREAM_STATUS.STOPPED, function () {
        setStatus(Flashphoner.constants.STREAM_STATUS.STOPPED, "status2");
    }).on(Flashphoner.constants.STREAM_STATUS.FAILED, function () {
        setStatus(Flashphoner.constants.STREAM_STATUS.FAILED, "status2");
    }).play();
}