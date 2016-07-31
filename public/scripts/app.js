
var actual_turn = 1;
var positions_logic = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

function is_full(){
  var full = true;
  positions_logic.forEach(function(array){
    array.forEach(function(element){
      if (element === 0){
        full = false;
      }
    });
  });
  return full;
}

function check_winner(j,i) {
  var winner = 0;//0 indica que todavia no han ganado
  var count = positions_logic[j].filter(function(x) {return x === positions_logic[j][i]}).length;
  if (count === 3){
    winner = positions_logic[j][i];
    //console.log("ganador: "+winner);
  }

  if (positions_logic[0][i] === positions_logic[1][i] && positions_logic[1][i] === positions_logic[2][i]){
    winner = positions_logic[j][i];
    //console.log("ganador: "+winner);
  }

  if (['00','11','22'].indexOf(''+j+''+i) > -1){
    if (positions_logic[0][0] === positions_logic[1][1] && positions_logic[1][1] === positions_logic[2][2]){
      winner = positions_logic[j][i];
      //console.log("ganador: "+winner);
    }
  }
  
  if (['02','11','20'].indexOf(''+j+''+i) > -1){
    if (positions_logic[0][2] === positions_logic[1][1] && positions_logic[1][1] === positions_logic[2][0]){
      winner = positions_logic[j][i];
      //console.log("ganador: "+winner);
    }
  }

  if (winner === 0 && is_full()){
    winner = -1;
    //console.log("No hay mas turnos");
  }

  return winner;
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
    var winner = check_winner(this_j-1,this_i-1);
    if ( winner != 0){//si existe ganandor o ya no hay turnos
        var player = document.getElementById("player");
        if (winner === -1){
          player.innerHTML = "Es un empate";
        }else{
          player.innerHTML = "El ganador es el jugador "+winner;
        }
        var end = document.getElementById('0_0');
        end.style.display = 'inline';
    }
  }
}

function on_mouse_over(){
  var id = this.id;
  var this_j = id.split('_')[0];
  var this_i = id.split('_')[1];
  if (positions_logic[this_j - 1][this_i - 1] === 0) {
    if (actual_turn === 1){
      this.innerHTML = 'X';
    }else{
      this.innerHTML = 'O';
    }
  }
}

function on_mouse_out(){
  var id = this.id;
  var this_j = id.split('_')[0];
  var this_i = id.split('_')[1];
  if (positions_logic[this_j - 1][this_i - 1] === 0) {
    if (actual_turn === 1){
      this.innerHTML = '';
    }else{
      this.innerHTML = '';
    }
  }
}

for (var j = 1; j <= positions_logic.length; j++) {
  for (var i = 1; i <= positions_logic[j - 1].length; i++) {
    var box = document.getElementById('' + j + '_' + i);
    box.onclick = new_click;
    box.onmouseover = on_mouse_over;
    box.onmouseout = on_mouse_out;
  }
}
