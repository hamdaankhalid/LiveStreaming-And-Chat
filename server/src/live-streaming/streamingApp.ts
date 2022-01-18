import {Server} from 'socket.io';
import {app} from '../app';
import * as http from 'http';

const httpServer = new http.Server(app);

app.get('/', (req, res) =>{
  res.render('index');
});
const socketServer = new Server(httpServer);
let viewerCount = 0;

type Message = { text: string, date: Date };

const messageList: Message[] = [];

function purgeLastHundred() {
  if (messageList.length > 200) {
    messageList.slice(100);
  }
}

setInterval(purgeLastHundred, 10000);

socketServer.on('connection', (socket) => {
  viewerCount++;
  console.log('a user connected. Total viewer count:', viewerCount);
  socket.emit('viewer-count', viewerCount);

  socket.on('disconnect', () => {
    viewerCount--;
    console.log('A user disconnected. Total viewer count:', viewerCount);
    socket.emit('viewer-count', viewerCount);
  });

  socket.on('join-as-streamer', (streamerId) => {
    socket.broadcast.emit('streamer-joined', streamerId);
  });

  socket.on('disconnect-as-streamer', (streamerId) => {
    socket.broadcast.emit('streamer-disconnected', streamerId);
  });

  socket.on('join-as-viewer', (viewerId) => {
    socket.broadcast.emit('viewer-connected', viewerId);
    socket.emit('backfill-messages', messageList);
  });

  socket.on('add-message-to-live-chat', (messageText: string) => {
    const message: Message = {
      text: messageText,
      date: new Date(),
    };

    messageList.push(message);
    socket.emit('new-message', message);
    socket.broadcast.emit('new-message', message);
  });
});

export {httpServer};
