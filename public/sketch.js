let socket;
let linewidth=20;
const username=window.location.href.split('?')[1].split('=')[1].split('&')[0];
const roomname=window.location.href.split('?')[1].split('=')[2].split('+')[1];
function setup() {
  
  createCanvas(windowWidth, windowHeight);
  background(0);
  socket=io.connect('https://afternoon-garden-60673.herokuapp.com');
  socket.on('message',(data)=>{
    fill("red");
    stroke("red");
    strokeWeight(linewidth);
    line(data.x, data.y, data.px, data.py);
    noStroke();
    ellipse(data.x,data.y,linewidth,linewidth);
  });
  socket.emit('username&roomname',{username:username,roomname:roomname});
}

function draw() {
  
}
function mouseDragged(){

  fill(255);
  stroke(255);
  strokeWeight(linewidth);
  line(mouseX, mouseY, pmouseX, pmouseY);
  noStroke();
  ellipse(mouseX,mouseY,linewidth,linewidth);
  data={
    x:mouseX,
    y:mouseY,
    px:pmouseX,
    py:pmouseY
  }
  socket.emit('mouse',data);
}