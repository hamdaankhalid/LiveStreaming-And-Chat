import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const socket = io();
const myPeer = new Peer(undefined, {
    host: 'localhost',
    path: '/',
    port: '3001'
});

const videoPlayer = document.getElementById('videoplayer');
const soundToggle = document.getElementById("sound");
const messageInput = document.getElementById("chat-input");
const viewerCountDisplay = document.getElementById("viewerCount");
const messageList = document.getElementById("message-list");
const messages = document.getElementById("messages");

socket.on("connect", () => {
    console.log("Connected as viewer");
});

myPeer.on("open", viewerId => {
    socket.emit("join-as-viewer", viewerId);
});

myPeer.on("call", (call)=>{
    call.answer();
    call.on('stream', (stream) => {
        addVideoStream(videoPlayer, stream);
    });
});

socket.on("disconnect", () => {
    console.log("disconnected viewer");
});

socket.on("streamer-joined", (streamerId) => {
    console.log('A streamer just joined!', streamerId);
    setTimeout(window.location.reload, 2000);
});

socket.on("new-message", (message) => {
    // add it inside live chat
    appendToChat(message);
});

messageInput.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      event.preventDefault();
      socket.emit("add-message-to-live-chat", messageInput.value );
      messageInput.value = "";
      messages.scrollTop = messages.scrollHeight;
    }
});

function addVideoStream(video, stream){
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
}

soundToggle.addEventListener("click", () => {
    videoPlayer.muted = !videoPlayer.muted;
    soundToggle.innerText = videoPlayer.muted ?"Unmute" : "Mute";
});
    
socket.on("viewer-count", (viewerCount) => {
    viewerCountDisplay.innerHTML = viewerCount;
});

socket.on("backfill-messages", (messageList) => {
    messageList.forEach(message => {
        appendToChat(message);
    });
    messages.scrollTop = messages.scrollHeight;
})

function appendToChat(message){
    let li = document. createElement("li");
    li.className = "single-message"
    li.appendChild(document. createTextNode(`${message}`))
    messageList.appendChild(li);
}