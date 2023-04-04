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

//para crear baraja
const crearDeck = () => {

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
    //para barajar el deck
    deck = _.shuffle( deck );
    console.log( deck )
    return deck;
}

crearDeck();

//funcion para tomar una carta
const pedirCarta = () => {
    
    if(deck.length === 0 ) {
        throw 'no hay cartas en el deck';  
    }
    const carta = deck.pop()

    console.log(carta)
    console.log(deck)
    return carta
}

//para probar que funciona la prevencio de no hya mas cartas
/* for(let i = 0; i <= 100; i++){
    //pedirCarta();
    
} */

    //pedirCarta();
