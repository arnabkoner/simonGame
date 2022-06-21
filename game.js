
// Variables

var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;


// Functions

// Sound Play
function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}


// Animation
function animatePress(color) {
  $("#" + color).addClass("pressed");
    setTimeout(function() {
     $("#" + color).removeClass("pressed");
     }, 100);

}


// Main Keyword Press random colour generator
function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.random();
  randomNumber = randomNumber * 4;
  randomNumber = Math.floor(randomNumber);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  userClickedPattern.length = 0;
  console.log(gamePattern);
}


// Answer Checking
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if (gamePattern.length===userClickedPattern.length){
    setTimeout(function(){
      nextSequence()}, 1000);
    }
  }else{
    playSound("wrong");
      $(document.body).addClass("game-over")
    setTimeout(function(){
      $(document.body).removeClass("game-over")}, 200);
    $("h1").text("Game Over, Press Any Key to Restart")
    startOver();
  }
}


// To Restart the Game if wrong pattern entered
function startOver(){
  userClickedPattern.length = 0;
  gamePattern.length = 0;
  level = 0;
  started = false;
}




// Operations

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true
  }
});


$(".btn").click(function(handler) {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);

  console.log(userClickedPattern);
})
