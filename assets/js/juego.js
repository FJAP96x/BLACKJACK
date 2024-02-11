let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];
let puntosJugador=0,
puntosComputadora=0;

/* 
? referencias  del HTML
 */
const btnPedir=document.querySelector('#btnPedir')
const btnNuevo=document.querySelector('#btnNuevo')
const btnDetener=document.querySelector('#btnDetener')
const smalls=document.querySelectorAll('small')
const divCartasJugador=document.querySelector('#jugador-cartas')
const divCartasComputadora=document.querySelector('#computadora-cartas')


// Esta función crea un nuevo deck
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }


  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }
  
  deck = _.shuffle(deck);
  
  return deck;
};

crearDeck();


const pedirCarta = () =>{

  if(deck.length === 0){
    throw 'no hay cartas en el deck';
  }
  const carta = deck.pop()
return carta;
}
  
// pedirCarta();

// obtener valores carta
const valorCarta =(carta)=>{
  const valor=carta.substring(0,carta.length-1);
 
  return (isNaN(valor)) ? 
          (valor==='A') ? 11 : 10 
          :valor*1
  
}

// computadora 
const turnoComputadora = (puntosMínimos )=>{

  do{
    const carta=pedirCarta();
    puntosComputadora=puntosComputadora + valorCarta(carta)
    
    smalls[1].innerText=puntosComputadora
    
    const imgCarta = document.createElement('img');
    imgCarta.src=`assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta')
    
    divCartasComputadora.append(imgCarta)
    
    if (puntosMínimos > 21) {
      break;
    }
    
  }while( (puntosComputadora < puntosMínimos) && (puntosMínimos <= 21))

  setTimeout(() => {

  if (puntosMínimos===puntosComputadora) {
    alert('Empate')
  }else if( puntosMínimos > 21){
    alert('computadora gana')
  }else if (puntosComputadora>21){
    alert('ganaste')
  }else{
    alert('computadora gana')
  }
},500);

}

//evento
btnPedir.addEventListener('click', () => {

  const carta=pedirCarta();
puntosJugador=puntosJugador + valorCarta(carta)

smalls[0].innerText=puntosJugador

const imgCarta = document.createElement('img');
imgCarta.src=`assets/cartas/${carta}.png`;
imgCarta.classList.add('carta')

divCartasJugador.append(imgCarta)

if (puntosJugador > 21) {
btnPedir.disabled=true;
btnDetener.disabled=true;
turnoComputadora(puntosJugador)

}else if(puntosJugador === 21){
  btnPedir.disabled=true;
  btnDetener.disabled=true;
  turnoComputadora(puntosJugador)

}
})

btnDetener.addEventListener('click', () =>{
  btnPedir.disabled=true;
  btnDetener.disabled=true;

  turnoComputadora(puntosJugador)
})

btnNuevo.addEventListener('click', ()=>{
  
console.clear();

  deck = crearDeck();
  puntosJugador     = 0;
  puntosComputadora = 0;

  smalls[0].innerText = 0
  smalls[1].innerText = 0

  divCartasComputadora.innerHTML= '';
  divCartasJugador.innerHTML = '';

  btnPedir.disabled = false;
  btnDetener.disabled = false;

})