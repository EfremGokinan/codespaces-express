let app = require('express')();
let server = require('http').createServer(app);
const path = require('path');

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8100",
    methods: ["GET", "POST"]
  }
});
const cors = require('cors');
app.use(cors());
var port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
})


io.on('connection', (socket) => {
  
  console.log('a user connected');
  
  socket.on('order-changed', (text) => {
    console.log(socket.rooms);
    console.log('message from client: ', text);
    io.emit('order-changed', text);
  });

  socket.on('message', (text) => {
    // socket.join(text.room_id)
    console.log(socket.rooms)
    console.log('message-send', text);
    io.emit('message-send', text);
  });

  socket.on("disconnect", () => console.log("Client disconnected"));

});

server.listen(port, function(){
   console.log('listening on *: ' + port);
});