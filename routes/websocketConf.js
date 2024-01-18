
const httpContext=require('express-http-context')
const http = require('http');
const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
module.exports=(app)=>{
  const httpServer = http.createServer(app);
const io = socketIO(httpServer,{
  cors: {
    origin: "*",
    credentials: true
  }
});
io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  // Verify the JWT token
  console.log("tokeeeeeeeeeen",token)
  jwt.verify(token, process.env.secretKey, (err, decoded) => {
    if (err) {
      console.error('JWT verification failed:', err.message);
      return next(new Error('Authentication failed.'));
    }

    // Attach user information to the socket for later use
    const{id,emailid}=decoded?.user
    socket.user = {
      userId: id,
      email:emailid,
    };
    next();
  });
});

io.listen(process.env.WEBSOCKETPORT, () => {
  console.log(`Socket.IO server is running on port ${process.env.WEBSOCKETPORT}`);
});
io.on("error", (error) => {
  console.error("Socket.IO server error:", error);
});
  io.on('connection', (socket) => {
    console.log(`User ${socket.user.userId} connected`);
    const user=socket.user.userId
  // Handle 'message' events
  socket.on('message', (message) => {
    console.log('Message from client:', {message,user});

    // Broadcast the message to all connected clients
    io.emit('message', {message,user} );
  });

  // Handle 'disconnect' event
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
}

