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
    puntosComputador = 0;

//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');

const contadorPuntaje = document.querySelectorAll('small')
//console.log(btnPedir)
const divCartasJugador = document.querySelector('#jugador-cartas')

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
    } else if ( puntosJugador === 21 ){
        btnPedir.disabled = true;
        console.warn('21, gana!')
    } 

    console.log(puntosJugador)

})

