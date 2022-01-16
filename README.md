### Live Streaming!!
- Welcome to my bastardized implementation of live streaming. I'm going to make a live streaming platform that will supoort streaming from a single user...aka ME, but will let anyone view it.


### Architecture

Client (Publisher) ----- Stream video --------------------- |
                                                            |
                                                            |
                                                            Node Server ---> Store recorded videos to s3 as a  background task using a queue.
                                                            |
                                                            |
                                                            |
Client (Subscriber/viewer) ------Emit to subscribers -------


### Capabilities

- Authenticated route to access to upload permissions
- Once logged in I can begin streaming
- A random user can hit a url to view a live stream session, or see stored streams
- live stream sessions will be visible only when I am streaming.
- Stored streams will be available for anyone.

### Technologies

- Node js, Typescript, Angular, AWS S3, Bull, Redis.
  