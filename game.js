var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var state = false;
//Inicia juego al precionar cualquier tecla
$(document).keypress(function(){
    if(!state){
        $("h1").text("Level "+level);
        nextSequence();
        state = true;
    }
    
});


$(".btn").click(function(){
    //Obtienes el color que se le dio click
    var userChosenColour = $(this).attr("id");
    //Se guarda la secuencia de clicks
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    //Verificar respuesta
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log(gamePattern[currentLevel]);
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }
    else{
        gameOver();
    }
}

function nextSequence(){
    //Se vacia el arreglo para repetir los clicks
    userClickedPattern = [];
    //Color aleatorio
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    //Guardar patron de colores
    gamePattern.push(randomChosenColour);
    //Animacion y Sonido
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    //Next Level
    level += 1;
    $("h1").text("Level " + level);
}

//Partida perdida y Reinicio del juego
function gameOver(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },100);
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
}

//Reproductor de sonido
function playSound(name){
    var sound = new Audio("sounds/"+name+".mp3");
        sound.play();
}

//Animacion click
function animatePress(currentColour){
    var button= $("#"+currentColour);
    button.addClass("pressed");
    setTimeout(function() {
        button.removeClass("pressed");
    },100);
}

function startOver(){
    state = false;
    level = 0;
    gamePattern = [];
}