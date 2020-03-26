const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
})

let connections = {}

server.on('message', (msg, rinfo) => {
  let c = JSON.parse(msg)
  c.remoteAddress = rinfo.address
  c.remotePort = rinfo.port
  if(c.name) {
    connections[c.name] = c
    console.log(connections);
    let connectionsMessage = JSON.stringify(connections)
    Object.keys(connections).forEach(key=>{
      server.send(connectionsMessage, connections[key].remotePort, connections[key].remoteAddress, err=>{

      })
    })
    //update all sockets

  }

})

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
})

server.bind(41234);
