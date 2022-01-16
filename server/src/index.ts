import { httpServer } from "./streamingApp";

httpServer.listen(3000, function() {
    console.log('listening on port 3000');
 });