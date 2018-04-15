let stream_id;
let hostname = "wss://sidekick.online:8443";

let localVideo;


function init() {
    Flashphoner.init();
    localVideo = document.getElementById("localVideo");
    //let timerId = setInterval(update_friends, 2000);
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

let friends_id_list = ["1", "2", "3", "4", "5"];

let video_id_to_update = [];

function update_friends() {
    // for (let i = 1; i <= 10; i++) {
    //     document.getElementById("remoteVideo" + i).innerHTML = "";
    //     // document.getElementById("remoteVideo" + i).style.display = "none";
    // }
    video_id_to_update = [];
    console.log("update friend");
    friends_id_list.forEach(function (friend_id, i, friends_id_list) {
        //console.log(friend_id);
        Flashphoner.createSession({urlServer: hostname}).on(Flashphoner.constants.SESSION_STATUS.ESTABLISHED, function (session) {
            startPlayback(session, friend_id, friend_id, false);
        }).on(Flashphoner.constants.SESSION_STATUS.DISCONNECTED, function () {
            setStatus("DISCONNECTED", "status" + friend_id);
            document.getElementById("remoteVideo" + friend_id).innerHTML = "";
            document.getElementById("remoteVideo" + friend_id).style.display = "none";
        }).on(Flashphoner.constants.SESSION_STATUS.FAILED, function () {
            setStatus("FAILED", "status" + friend_id);
            document.getElementById("remoteVideo" + friend_id).innerHTML = "";
            document.getElementById("remoteVideo" + friend_id).style.display = "none";
        });
    });


}

function startPlayback(session, friend_id, friend_video_id, is_real) {
    let tag_friend_video_id = "remoteVideo" + friend_video_id;
    let hidden_tag_friend_video_id = "hiddenremoteVideo" + friend_video_id;
    let hidden_video = document.getElementById("hiddenremoteVideo" + friend_video_id);
    let remoteVideo = document.getElementById(tag_friend_video_id);
    let fake_video = document.getElementById("fakeVideo");
    fake_video.innerHTML = "";

    let working_video = fake_video;
    console.log(is_real);
    if (is_real) {
        console.log("remoteVideo");
        working_video = remoteVideo;
    } else {
        console.log("fake_video");
    }
    let name_stream = "stream" + friend_id;
    session.createStream({
        name: name_stream,
        display: working_video,
        cacheLocalResources: true,
        receiveVideo: true,
        receiveAudio: true
    }).on(Flashphoner.constants.STREAM_STATUS.PLAYING, function (playStream) {
        setStatus(Flashphoner.constants.STREAM_STATUS.PLAYING, "status" + friend_video_id);

        //console.log("is?", (friend_video_id in video_id_to_update) && (remoteVideo.innerHTML == ""));

        // if ((friend_video_id in video_id_to_update) && (remoteVideo.innerHTML == "")) {
        //     document.getElementById(tag_friend_video_id).style.display = "block";
        // } else {
        //     video_id_to_update.push(friend_video_id);
        // }

        //document.getElementById(tag_friend_video_id).innerHTML = document.getElementById(hidden_tag_friend_video_id).innerHTML;
        //document.getElementById(hidden_tag_friend_video_id).innerHTML = "";
        console.log("succ", remoteVideo.style.display != "block");
        if (!is_real && remoteVideo.style.display != "block") {
            startPlayback(session, friend_id, friend_id, true);
        }
        document.getElementById(tag_friend_video_id).style.display = "block";
    }).on(Flashphoner.constants.STREAM_STATUS.STOPPED, function () {
        setStatus(Flashphoner.constants.STREAM_STATUS.STOPPED, "status" + friend_video_id);
    }).on(Flashphoner.constants.STREAM_STATUS.FAILED, function () {
        setStatus(Flashphoner.constants.STREAM_STATUS.FAILED, "status" + friend_video_id);
        document.getElementById(tag_friend_video_id).innerHTML = "";
        document.getElementById(tag_friend_video_id).style.display = "none";
    }).play();
}