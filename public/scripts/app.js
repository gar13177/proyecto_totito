
var actual_turn = 1;
var positions_logic = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

function is_full(){
  var value = true;
  positions_logic.forEach(function(array){
    array.forEach(function(element){
      if (element === 0){
        value = false;
      }
    });
  });
  return value;
}

function check_winner() {
  //cambiar orden porque primero revisaria si ya no hay mas posiciones
  //esto quiere decir que si en el ultimo turno se gana, daria error
  //ya que no detectaria que con ese turno gano
  if (!is_full()) {
    console.log("Nuevo Turno");
  }else{
    console.log("No hay mas turnos");
  }
}

function new_click() {
  var id = this.id;
  var this_j = id.split('_')[0];
  var this_i = id.split('_')[1];
  if (positions_logic[this_j - 1][this_i - 1] === 0) {
    positions_logic[this_j - 1][this_i - 1] = actual_turn;
    
    if (actual_turn === 1) {
      this.innerHTML = 'X';
      this.style.backgroundColor = '#dc685a';
      actual_turn = 2;
    } else {
      this.innerHTML = 'O';
      this.style.backgroundColor = '#ecaf4f';
      actual_turn = 1;
    }
    check_winner();
  }
}

for (var j = 1; j <= positions_logic.length; j++) {
  for (var i = 1; i <= positions_logic[j - 1].length; i++) {
    var box = document.getElementById('' + j + '_' + i);
    box.onclick = new_click;
  }
}

/*
var reloj = "1";
var selector = document.getElementById("selector");
var deg_h = 0;
var deg_m = 0;
var deg_s = 0;

function start(){
  document.getElementById("selector").addEventListener("change", addActivityItem, false);
}

function addActivityItem(){
  reloj = selector.options[selector.selectedIndex].value;
  change_clock();
  render();
}

function changeTime(){
  deg_s = deg_s + 6;
  if (deg_s >= 360){
    deg_s = deg_s - 360;
    deg_m = deg_m + 6;
  }
  if (deg_m >= 360){
    deg_m = deg_m - 360;
    deg_h = deg_h + 30;
  }
  if (deg_h >= 360){
    deg_h = deg_h - 360;
  }
  render();  
}

function render(){
  if (reloj === "1"){
    var seg = document.getElementById("_segundero");
    seg.style.transform = "rotate(" + deg_s + "deg)";

    var min = document.getElementById("_minutero");
    min.style.transform = "rotate(" + deg_m + "deg)";

    var hor = document.getElementById("_horero");
    hor.style.transform = "rotate(" + deg_h + "deg)";
    
  }else{
    var hora = deg_h / 30;
    var min = deg_m / 6;
    var seg = deg_s / 6;

    var text = ""+hora+" : "+min+" : "+seg;
    document.getElementById("_digital").innerHTML = text;
  }
}


function change_clock(){
  var html = "";
  if (reloj === "1"){
    html = '<div class="reloj">';
    for (i = 1; i <= 12; i++) { 
      html += '<div class="numero n'+i+'">'+i+'</div>';
    }
    
    html += '<div id="_horero" class="aguja horero"></div>';
    html += '<div id="_minutero" class="aguja minutero"></div>';
    html += '<div id="_segundero" class="aguja segundero"></div>';
    html += '</div>';
  }else{
    html = '<div id="_digital" class="digital"></div>'
  }
  var viewport = document.getElementById("container");
  viewport.innerHTML = html;
}

change_clock();
window.addEventListener("load", start, false);
window.setInterval(changeTime, 1000);
*/


//scss
/*$bottom_pos: 0px;
$left_pos: 255px;

.reloj{
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: gray;
  border: 5px solid black;
  margin-left: 0;
  margin-top: 0;
}


@mixin numero(){
  height: 250px;
  color: black;
  font-size: 50px;
  line-height: 80px;
  position: absolute;
  margin-left: $left_pos;
  top: $bottom_pos;
  transform-origin: bottom left;
  @for $i from 1 through (12){
    &.n#{$i}{
      transform: rotate($i * 30deg);
    }
  }
}

.numero{
  @include numero();
}

.aguja{
  height: 230px;
  background: black;
  transform-origin: bottom center;
  position: absolute;
  left: $left_pos;
  top: $bottom_pos + 20px;
}

.horero{
  width: 10px;
}

.minutero{
  width: 5px;
}

.segundero{
  width: 3px;
  background: red;
}

.digital{
  font-size: 100px;
}
*/