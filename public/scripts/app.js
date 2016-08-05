
var state = {};
state.actual_turn = 1;
state.positions_logic = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

function is_full(){
  var full = true;
  state.positions_logic.forEach(function(array){
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
  var count = state.positions_logic[j].filter(function(x) {return x === state.positions_logic[j][i]}).length;
  if (count === 3){
    winner = state.positions_logic[j][i];
    //console.log("ganador: "+winner);
  }

  if (state.positions_logic[0][i] === state.positions_logic[1][i] && state.positions_logic[1][i] === state.positions_logic[2][i]){
    winner = state.positions_logic[j][i];
    //console.log("ganador: "+winner);
  }

  if (['00','11','22'].indexOf(''+j+''+i) > -1){
    if (state.positions_logic[0][0] === state.positions_logic[1][1] && state.positions_logic[1][1] === state.positions_logic[2][2]){
      winner = state.positions_logic[j][i];
      //console.log("ganador: "+winner);
    }
  }
  
  if (['02','11','20'].indexOf(''+j+''+i) > -1){
    if (state.positions_logic[0][2] === state.positions_logic[1][1] && state.positions_logic[1][1] === state.positions_logic[2][0]){
      winner = state.positions_logic[j][i];
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
  if (state.positions_logic[this_j - 1][this_i - 1] <= 0) {
    state.positions_logic[this_j - 1][this_i - 1] = state.actual_turn;
    render(build_html(state)+build_html_winner(this_j,this_i));
    if (state.actual_turn === 1){
      state.actual_turn = 2;
    }else{
      state.actual_turn = 1;
    }
  }
}

function on_mouse_over(){
  var id = this.id;
  var this_j = id.split('_')[0];
  var this_i = id.split('_')[1];
  if (state.positions_logic[this_j - 1][this_i - 1] == 0) {
    state.positions_logic[this_j - 1][this_i - 1] = -state.actual_turn;//solo se coloca 
    render(build_html(state));
  }
}

function on_mouse_out(){
  var id = this.id;
  var this_j = id.split('_')[0];
  var this_i = id.split('_')[1];
  if (state.positions_logic[this_j - 1][this_i - 1] < 0) {
    state.positions_logic[this_j - 1][this_i - 1] = 0;
    render(build_html(state));
  }
}

function build_html_winner(this_j, this_i){
  var winner = check_winner(this_j-1,this_i-1);
  var html = '';
  if ( winner != 0){
      if (winner === -1){
        html += '<div class="end" id="0_0">';
        html += '<h1 id="player">Es un empate</h1>';
      }else{
        
        html += '<div class="end" id="0_0">';
        html += '<h1 id="player">El ganador es el jugador '+winner+'</h1>';
      }
      html += '<a href="">Nuevo Juego</a>';
  }else{
    html += '<div class="end hide" id="0_0">';
  }
  html += '</div>';
  return html;
}

function build_html(state){
  var html = "";
  for (var j = 1; j <= state.positions_logic.length; j++){
    for (var i = 1; i <= state.positions_logic[j - 1].length; i++){
      html += '<div id="'+j+'_'+i+'" class="box b'+j+''+i ;
      switch (state.positions_logic[j-1][i-1]){
        case 1:
          html += ' clic_x">X</div>';
          break;
        case -1:
          html += ' hover">X</div>';
          break;
        case 2:
          html += ' clic_o">O</div>';
          break;
        case -2:
          html += ' hover">O</div>';
          break;
        default:
          html += '"></div>';
          break;
      }
    }
  }
  return html;
}


function render(html){
  var viewport = document.getElementById("all");
  viewport.innerHTML = html;
  set_actions();
}

function set_actions(){
  for (var j = 1; j <= state.positions_logic.length; j++) {
    for (var i = 1; i <= state.positions_logic[j - 1].length; i++) {
      var box = document.getElementById('' + j + '_' + i);
      box.onclick = new_click;
      box.onmouseover = on_mouse_over;
      box.onmouseout = on_mouse_out;
    }
  }
}

render(build_html(state));
set_actions();
