import {httpServer} from './live-streaming/streamingApp';
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.USERNAME) {
  throw new Error('USERNAME ENV IS NOT DEFINED');
}

if (!process.env.PASSWORD) {
  throw new Error('PASSWORD ENV IS NOT DEFINED');
}

const port = process.env.PORT || 3000;

httpServer.listen(port, function() {
  console.log('listening on port', port);
});
