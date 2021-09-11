const express=require('express');
const app=express();
const cors=require('cors');
let socket=require('socket.io');
app.use(
	cors({
		origin:"*",
	})
	)
let server=app.listen(process.env.PORT||3000,(response)=>{
	console.log("The server is ready to serve you");
});
app.use(express.static('public'));


let io=socket(server);
let roomnamenew={};
io.on('connection',(socket)=>{
	console.log(`new connection id: ${socket.id}`);
	
	socket.on('username&roomname',(data)=>{
		roomnamenew[socket.id]=data.roomname;
		socket.join(data.roomname);
		if(data.roomname===''){
			socket.broadcast.emit('message',data);
		}
	});
	socket.on('mouse',(data)=>{
		socket.to(roomnamenew[socket.id]).emit('message',data);
	});

});