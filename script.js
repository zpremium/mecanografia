const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
//temporizador
var timer = [0,0,0,0];
var interval;
var timerRunning = false;
testArea.value='';

// Añadir 0 a los números inferiores a 9 :
function leadingZero(time){

    if(time<=9){
        time='0'+time;
    }
    return time;
}

// Ejecutar standard minuto/segundo/centésimas temporales:
function runTimer() {
    let tiempoActual=leadingZero(timer[0])+':'+leadingZero(timer[1])+':'+leadingZero(timer[2]);
    theTimer.innerHTML=tiempoActual;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60); //minutos
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60)); //segundos
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000)); //decimas
}
// Función Coincidencia del texto entrado con el original:
function spellCheck() {    

// variable para texto picado
textEntered = testArea.value;
//variable para controlar si el texto original coincide con el picado
originTextMatch = originText.substring(0,textEntered.length);

//condición d ecomparación entre el picado y el original


if (textEntered===originText) { //Se ha  completado con éxito
 //Si son iguales: se borra el intervalo, se cambia el color del borde de la caja de texto  
clearInterval(interval);
testWrapper.style.borderColor='#429890'
   
}  //Si NO son iguales: se comprueba que a medida que picamos 
else {//comprobar a medida que tecleamos
    
    if (textEntered === originTextMatch) { //comparar el texto picado con el texto original originTextMatch
       //Si es exacto, mostrar borde azul
       testWrapper.style.borderColor='#65ccf3'
    } else {
        //Si detecta fallo mientras picamos, poner borde en rojo.
        testWrapper.style.borderColor='#e95d0f'
    }
}
}
// Función Empezar temporizador:
function start() {
    if(!timerRunning){ //timerRunning == false
    interval=setInterval(runTimer,10)
    timerRunning=true;
}
}


// función Reset todo:
function reset() {
    clearInterval(interval);
    interval=null;
    timer=[0,0,0,0]
    timerRunning=false;
    testArea.value='';
    theTimer.innerHTML='00:00:00';
    testWrapper.style.borderColor='grey'
}
   //Borrar intervalo, iniciar temporizador, borrar testArea, color gris de la zona de texto
    

// listeners para el teclado y el botón reset:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);