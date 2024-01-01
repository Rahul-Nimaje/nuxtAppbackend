const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: process.env.WEBSOCKETPORT });
const clients = new Map();
const httpContext=require('express-http-context')
module.exports = wss.on('connection', (ws) => {
  console.log("user loggin",httpContext.get('LoggedinUser'))
  const id = 1;
  const color = Math.floor(Math.random() * 360);
  const metadata = { id, color };
  clients.set(ws, metadata);

}
)


