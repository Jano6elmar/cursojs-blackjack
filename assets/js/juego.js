/* 
*2C = clubs (trebol)
*2D = diamonds ()
*2H = hearts ()
*2s = spades(picas)
 */
//agregado Patron Modulo 
//esto también nos permite una encapsulación de nuestro código
//y protección de el mismo de manera que no se 
//puedan manipular las variables, ni llamar en la consola
//sintaxis del patrón modulo
//funcion anonima autoinvocada
const miModulo = (() => {
    
    'use strict' //le dice a JavaScript Por favor, sé estricto a la hora de evaluar mi código
     //se recomienda dejar habilitado
     //al implementar este patrón ayuda mucho en el desarrollo, a evitar errores bastante comunes

    
        let deck         = [];
        const tipos      = ['C','D','H','S'],
              especiales   = ['A','J','Q','K'];

         
        let puntosJugadores = [];


        //Referencias del HTML
        const btnPedir   = document.querySelector('#btnPedir'), //con # se hace referencia a id's
              btnDetener = document.querySelector('#btnDetener'),
              btnNuevo   = document.querySelector('#btnNuevo');



        const divCartasJugadores = document.querySelectorAll('.divCartas'),  
              contadorPuntaje    = document.querySelectorAll('small');

         //esta funcion inicializa el juego
        const inicializarJuego = ( numJugadores = 2) => {
        
            deck = crearDeck();

            puntosJugadores = []
            for ( let i = 0; i < numJugadores; i++ ) {
                puntosJugadores.push(0)
            }    
            
            deck = [];
            deck = crearDeck();
                     
            contadorPuntaje.forEach( elem => elem.innerText = 0 );

            divCartasJugadores.forEach( elem => elem.innerHTML = '');           

            btnPedir.disabled   = false;
            btnDetener.disabled = false;
        };
    
            //para crear baraja // Esta función crea un nuevo deck
        const crearDeck = () => {
            //añadir las cartas del 2 al 10
            
            deck = []; 
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
            
            //para barajar el deck uso la librería underscore
            //recibe un listado, un arreglo y lo regresa de 
            //manera aleatoria
            // ( _ ) el underscore es un objeto
            return  _.shuffle( deck );
        }
        
          


        
        //funcion para tomar/pedir una carta
        const pedirCarta = () => {
            //medida de seguridad para cuando ya no hay cartas
            //en el deck
            if(deck.length === 0 ) {
                throw 'no hay cartas en el deck';//muestra error en consola  
            }
            //pop remueve el ultimo elemento del 
            //arreglo y lo regresa
            

            //console.log(carta)
            //console.log(deck)
            
            return deck.pop();
        }

        //para probar que funciona la prevencio de no hya mas cartas
        /* for(let i = 0; i <= 100; i++){
            pedirCarta();
            
        } */
        //pedirCarta();


    //función para obtener valor de cada carta
        const valorCarta = ( carta ) => {
            //todos los string pueden ser trabajados como arreglos
            //substring es metodo que tienen todos los string
            const valor = carta.substring(0, carta.length -1);
            return ( isNaN( valor ) ) ? 
                    ( valor === 'A' ) ? 11 : 10
                    : valor * 1 // transforma el string en type number
        }
        //pedir carta retorna una carta, y esa carta es la que 
        //se envía a valorCarta()
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

        //turno: 0 = primer jugador y el ultimo será la cpu
        const acumularPuntos = ( carta, turno ) => {
            
            puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
            contadorPuntaje[turno].innerText = puntosJugadores[turno];
            return puntosJugadores[turno];
        }


        const crearCarta = ( carta, turno ) => {

            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/cartas/${ carta }.png`
            imgCarta.classList.add('carta')
            divCartasJugadores[turno].append( imgCarta );
        }

        const determinarGanador = () => {
            
            const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

            setTimeout(() => {
                if( puntosComputadora === puntosMinimos ) {
                    alert('Nadie gana :(');
                } else if ( puntosMinimos > 21 ) {
                    alert('Computadora gana')
                } else if( puntosComputadora > 21 ) {
                    alert('Jugador Gana');
                } else {
                    alert('Computadora Gana')
                }
            }, 100 );
        }

        //turno de la computadora
        const turnoComputadora = ( puntosMinimos) => {

            let puntosComputadora = 0;

            do {
                const carta = pedirCarta()                 
                puntosComputadora = acumularPuntos( carta, puntosJugadores.length -1);
                crearCarta( carta, puntosJugadores.length -1)               
        
            } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );
        
            determinarGanador();
        }


        ///////////////////----------------Eventos---------//////////////////////////////////////////////////
        btnPedir.addEventListener('click', () => {
            
            const carta = pedirCarta() 
            const puntosJugador = acumularPuntos(carta, 0);
            
            crearCarta(carta, 0);

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

            turnoComputadora( puntosJugadores[0] );
        })

        // btnNuevo.addEventListener('click', () => { 

        //     inicializarJuego();
                       
        // });

        return{
            nuevoJuego: inicializarJuego
        };//Si retornamos algo aquí, eso es lo único que va a ser público y todo lo demás va a ser privado
     
    })();


//primero crear el mazo    
    