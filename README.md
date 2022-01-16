### Live Streaming!!
- Welcome to my implementation of live streaming along with real time chat. I'm going to make a live streaming platform that will supoort streaming from a single user...aka ME, but will let anyone view it, and interact in a chatroom while I stream a video!

### Architecture

#### Video Streaming
- Built with Peerjs for webrtc and socketio for websocket.
- Admin publishing client waits for users to join.
- When users join they emit an event containing their peerjs ID via websocket, which is relayed to Admin publishing client.
- The admin publishing client upon recieving the viewer's peerjs client initiates a peer to peer connection to the viewer, and begins streaming audio and video data across the network using webrtc.

#### Live Chat
- Purely built over websockets. The live chat does not utilize webrtc.
- Clients emit messages that are then stored for running a backfill when later users join, this backfill is purged ever 10 seconds when thread size exceeds over 400 messages.
- Server broadcasts messages, which is a monitored event that a client will respond to by altering it's own state.

### Capabilities
- Authenticated route to access to upload permissions
- Once logged in I can begin streaming
- A random user can hit a url to view a live stream session.
- live stream sessions will be visible only when I am streaming.
- live stream will be presented with a live chat room!

### Technologies
- Node js, Typescript, Javascript, HTML, CSS, EJS, WebRtc (peer), Webscokets (Socket.io)
  
### How to run this?
- Have npm installed!
- npm i -g peerjs
- Create and set your local env variables: JWT_KEY, USERNAME, PASSWORD 
- npm i
- npm run start.
- Access localhost:3000/admin/signin to login and stream
- Access localhost:3000/ to view livestream and chat!
