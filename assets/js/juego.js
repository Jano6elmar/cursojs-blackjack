/* 
*2C = clubs (trebol)
*2D = diamonds ()
*2H = hearts ()
*2s = spades(picas)
 */
//primero crear el mazo

let deck         = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;

//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');



const contadorPuntaje = document.querySelectorAll('small');
//console.log(btnPedir)
const divCartasJugador     = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computer-cartas');
 
//para crear baraja
const crearDeck = () => {
    //añadir las cartas del 2 al 10
    for( let i = 2; i <= 10; i++ ){
        for (let tipo of tipos) {
            deck.push( i + tipo )
        }
    }

    for( let tipo of tipos ){
        for( let esp of especiales ){
            deck.push(esp + tipo)
        }
    }

    //console.log( deck )
    //para barajar el deck uso la librería underscore
    //recibe un listado, un arreglo y lo regresa de 
    //manera aleatoria
    // ( _ ) el underscore es un objeto
    deck = _.shuffle( deck );
    console.log( deck )
    return deck;
}

crearDeck();

//funcion para tomar una carta
const pedirCarta = () => {
    //medida de seguridad para cuando ya no hay cartas
    //en el deck
    if(deck.length === 0 ) {
        throw 'no hay cartas en el deck';  
    }
    //pop remueve el ultimo elemento del 
    //arreglo y lo regresa
    const carta = deck.pop()

    //console.log(carta)
    //console.log(deck)
    return carta
}

//para probar que funciona la prevencio de no hya mas cartas
/* for(let i = 0; i <= 100; i++){
    pedirCarta();
    
} */
//pedirCarta();

const valorCarta = ( carta ) => {
    //todos los string pueden ser trabajados como arreglos
    //substring es metodo que tienen todos los string
    const valor = carta.substring(0, carta.length -1);
    return (isNaN(valor)) ? 
            (valor === 'A') ? 11 : 10
            : valor * 1 // lo transforma en num
}
//pedir carta retorna una carta, y esa carta es la que 
//senvía a valorCarta()
/*  const valor = valorCarta(pedirCarta())
console.log({ valor})  */
//


//let puntos = 0;//esto es solo para inicializar la variable
//if( isNaN(valor)){
    //console.log('No es un numero')
    //  puntos = ( valor === 'A') ? 11 : 10;
//     console.log({valor}) 
//}else {
    //console.log('Es un numero')
 //   puntos = valor * 1;
// }
//console.log(puntos)

//turno de la computadora
const turnoComputadora = ( puntosMinimos) => {

    do {
    const carta = pedirCarta() 
    
    puntosComputadora = puntosComputadora + valorCarta( carta );
    contadorPuntaje[1].innerText = puntosComputadora;

    //<img class="carta" src="assets/cartas/cartas/2C.png" alt=""> 
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/cartas/${carta }.png`
    imgCarta.classList.add('carta')
    divCartasComputadora.append( imgCarta );

    }while( puntosComputadora < puntosMinimos);
    
    setTimeout(() => {    

        if( puntosComputadora === puntosMinimos) {
            alert( 'Nadie Gana ')
        }else if( puntosMinimos > 21) {
            alert( 'Computadora gana')
        }else if( puntosComputadora > 21){
            alert('Jugador Gana');
        }else {
            alert('Computadora Gana')
        }
    }, 100 )
}


//Eventos
btnPedir.addEventListener('click', () => {
    
    const carta = pedirCarta() 
    
    puntosJugador = puntosJugador + valorCarta( carta );
    contadorPuntaje[0].innerText = puntosJugador;

    //<img class="carta" src="assets/cartas/cartas/2C.png" alt=""> 
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/cartas/${carta }.png`
    divCartasJugador.append( imgCarta );
    imgCarta.classList.add('carta')

    if( puntosJugador > 21 ){
        console.warn('perdió');
        btnPedir.disabled = true;
        btnDetener.disabled = true; 

        turnoComputadora( puntosJugador );

    } else if ( puntosJugador === 21 ){
        btnPedir.disabled = true;
        btnDetener.disabled = true; 

        console.warn('21, gana!')
        turnoComputadora( puntosJugador );

    } 

    console.log(puntosJugador)

})

btnDetener.addEventListener('click', () => {

    btnPedir.disabled   = true;
    btnDetener.disabled = true; 

    turnoComputadora( puntosJugador );
})

btnNuevo.addEventListener('click', () => {

    console.clear();
    deck = []

    deck = crearDeck();   
    puntosJugador     = 0;
    puntosComputadora = 0;
    
    contadorPuntaje[0].innerText = 0;
    contadorPuntaje[1].innerText = 0;

    divCartasComputadora.innerHTML = ''; 
    divCartasJugador.innerHTML = '';

    btnPedir.disabled   = false;
    btnDetener.disabled = false; 


    
})
