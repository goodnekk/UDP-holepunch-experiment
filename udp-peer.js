const dgram = require('dgram');

let name = process.argv[2]
let lookingFor = process.argv[3]

const client = dgram.createSocket('udp4');

client.on('message', (msg, rinfo) => {
  let c = JSON.parse(msg)
  console.log("message from", rinfo)
  console.log(c);
  console.log("");
  if(c[lookingFor]) {
    console.log("connecting to peer", lookingFor, c[lookingFor].remotePort, c[lookingFor].remoteAddress);
    setInterval(_=>{
      client.send(JSON.stringify({message:"Hello from peer "+name}), c[lookingFor].remotePort, c[lookingFor].remoteAddress, (err) => {})
    }, 500)
  }
})

client.on('listening', () => {
  const address = client.address();
  console.log(`client listening ${address.address}:${address.port}`);
})

client.send(JSON.stringify({name}), 41234, "159.203.105.192", (err) => {
  console.log(err);
})
