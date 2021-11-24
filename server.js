const express = require( 'express' );
let path = require('path');
const app = express();
let users=[];
let messages=[]
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

const server = app.listen(8888);

const io = require( 'socket.io' )( server );

app.get('/', function(req, res) {
    res.render("index", {});
})

io.on( 'connection', function( socket ){
    socket.emit('prompt',{});
    socket.on('username', function( data ){
        users.push(data.username)
        socket.emit('allMessages', {messages:messages})
    });

    socket.on( 'sendMessage', function( data ){
        messages.push(data);
        io.sockets.emit( 'sendAll', data ); 
    });

    socket.on('userGame', function(data){
        socket.broadcast.emit('userGame', { game: data });
    })
    
});


