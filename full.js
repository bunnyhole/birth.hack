let stream_id;
let stream_id1 = "stream1";
let stream_id2 = "stream2";

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
    Flashphoner.createSession({urlServer: "wss://localhost:8443"}).on(Flashphoner.constants.SESSION_STATUS.ESTABLISHED, function (session) {
        //session connected, start streaming
        startStreaming(session);
    }).on(Flashphoner.constants.SESSION_STATUS.DISCONNECTED, function () {
        setStatus_stream("DISCONNECTED");
    }).on(Flashphoner.constants.SESSION_STATUS.FAILED, function () {
        setStatus_stream("FAILED");
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
        setStatus_stream(Flashphoner.constants.STREAM_STATUS.PUBLISHING);
    }).on(Flashphoner.constants.STREAM_STATUS.UNPUBLISHED, function () {
        setStatus_stream(Flashphoner.constants.STREAM_STATUS.UNPUBLISHED);
    }).on(Flashphoner.constants.STREAM_STATUS.FAILED, function () {
        setStatus_stream(Flashphoner.constants.STREAM_STATUS.FAILED);
    }).publish();
}

function setStatus_stream(status) {
    document.getElementById("status_stream").innerHTML = status;
}





function start() {
    Flashphoner.createSession({urlServer: "wss://localhost:8443"}).on(Flashphoner.constants.SESSION_STATUS.ESTABLISHED, function (session) {
        //session connected, start streaming
        startPlayback1(session);
    }).on(Flashphoner.constants.SESSION_STATUS.DISCONNECTED, function () {
        setStatus1("DISCONNECTED");
    }).on(Flashphoner.constants.SESSION_STATUS.FAILED, function () {
        setStatus1("FAILED");
    });

    Flashphoner.createSession({urlServer: "wss://localhost:8443"}).on(Flashphoner.constants.SESSION_STATUS.ESTABLISHED, function (session) {
        //session connected, start streaming
        startPlayback2(session);
    }).on(Flashphoner.constants.SESSION_STATUS.DISCONNECTED, function () {
        setStatus2("DISCONNECTED");
    }).on(Flashphoner.constants.SESSION_STATUS.FAILED, function () {
        setStatus2("FAILED");
    });
}

function startPlayback1(session) {
    session.createStream({
        name: stream_id1,
        display: remoteVideo1,
        cacheLocalResources: true,
        receiveVideo: true,
        receiveAudio: true
    }).on(Flashphoner.constants.STREAM_STATUS.PLAYING, function (playStream) {
        setStatus1(Flashphoner.constants.STREAM_STATUS.PLAYING);
    }).on(Flashphoner.constants.STREAM_STATUS.STOPPED, function () {
        setStatus1(Flashphoner.constants.STREAM_STATUS.STOPPED);
    }).on(Flashphoner.constants.STREAM_STATUS.FAILED, function () {
        setStatus1(Flashphoner.constants.STREAM_STATUS.FAILED);
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
        setStatus2(Flashphoner.constants.STREAM_STATUS.PLAYING);
    }).on(Flashphoner.constants.STREAM_STATUS.STOPPED, function () {
        setStatus2(Flashphoner.constants.STREAM_STATUS.STOPPED);
    }).on(Flashphoner.constants.STREAM_STATUS.FAILED, function () {
        setStatus2(Flashphoner.constants.STREAM_STATUS.FAILED);
    }).play();
}

function setStatus1(status) {
    document.getElementById("status1").innerHTML = status;
}

function setStatus2(status) {
    document.getElementById("status2").innerHTML = status;
}