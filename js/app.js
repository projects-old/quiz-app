//define score position
//define question postion
let score = 0;
let currentQuestion = 0;

// document is loaded and DOM is ready
$(document).ready(function() {
  $(".mainpage").show();
});

// on click render final score
$(".btn-final").on('click', function(evt){
  displayFinalScore();
});

//user clicks start button to display first question
$(".btn-start").on('click', function(evt){
  displayQuestion();
});

//user clicks next question button to display next question
$(".btn-next").on('click', function(evt){
  currentQuestion ++;
  displayQuestion();
  displayCurrentQuestion();
});

//user submits selected answer to be checked
//check for true, false, and unselected answers
$(".btn-submit").on('click', function(evt){
    // Loop around the inputs $('input').length
    evt.preventDefault();
    var result = false;

    for (i = 0; i < $('input').length; i++) {
      let currentInput = $('input')[i];
      if (currentInput.checked === true){
        result = true;
        break;
      }
    }
    if (result === false){
      alert("Please select an answer.");
    }
    else {
      let answer = checkAnswer();

      if (answer === true){
          score++;
          displayCorrectAnswer();
      }
      else {
          displayIncorrectAnswer();
      }
    }
});

//displays current score
function displayScore(){
  $('#score').text("Score: " + score + " / 10 ");
};

//displays current Question
function displayCurrentQuestion(){
  $('#question').text("Current question: " + (currentQuestion + 1) + " / 10");
}

//displays final score
function displayFinalScore(){
  $('#score').text("Final score: " + score + " / 10");
}


$(".btn-final").on('click', function(evt){
  score = 0;
  currentQuestion = 0;
  $(".btn-submit").show();
  $(".btn-final").hide();
  displayQuestion();
});


function displayCorrectAnswer(){
  $('#answerImage').attr('src', (STORE[currentQuestion].icon));
  $('#statement').text(STORE[currentQuestion].statement);
  $('.mainpage').hide();
  $('.question-container').hide();
  $('.answer-container').show();
  $('#answer').text("That's correct!");
  $('#answerDescription').text("The answer is:  " + STORE[currentQuestion].correctAnswer + ".");
  $(".answer-container").css("display", "block");
  $(".btn-next").css("display", "block");
  displayScore();
  displayCurrentQuestion();
};

function displayIncorrectAnswer(){
  $('#answerImage').attr('src', (STORE[currentQuestion].icon));
  $('#statement').text(STORE[currentQuestion].statement);
  $('.mainpage').hide();
  $('.question-container').hide();
  $('.answer-container').show();
  $('#answer').text("Wrong!");
  $('#answerDescription').text("The answer is:  " + STORE[currentQuestion].correctAnswer + ".");
  $(".btn-next").css("display", "block");
  displayScore();
  displayCurrentQuestion();
};

function displayQuestion (){
  if (currentQuestion <= STORE.length-1) {
    $('.question-container').show();
    $('.mainpage').hide();
    $('.answer-container').hide();
    $('.question-container').css("display", "block");
    $('input[name="phxstname"]').prop('checked', false);

    displayScore();

    displayCurrentQuestion();

  }else {
    $('.question-container').hide();
    $('.btn-submit').hide();
    $('.btn-final').css("display", "block");
    $(".btn-next").css("display", "none")
    displayFinalScore();
  };

  //render the currentQuestion
  $('h3.question').html(STORE[currentQuestion].question);

  //render the 4 answers
  //answers in STORE accessed individually or by key
  $("#A").val(STORE[currentQuestion].answers[0])
  $("#A + label").text(STORE[currentQuestion].answers[0]);

  $("#B").val(STORE[currentQuestion].answers[1])
  $("#B + label").text(STORE[currentQuestion].answers[1]);

  $("#C").val(STORE[currentQuestion].answers[2])
  $("#C + label").text(STORE[currentQuestion].answers[2]);

  $("#D").val(STORE[currentQuestion].answers[3])
  $("#D + label").text(STORE[currentQuestion].answers[3]);
};


function checkAnswer(){
  //when user clicks submit button (event)
  //get the value of the selected answer from radio input
  //value is checked against STORE correctAnswer

  let selectedAnswer = $(".question-container input[type='radio']:checked").val();

  if (selectedAnswer === (STORE[currentQuestion].correctAnswer)){
    return true;
  } else {
    return false;
  }
};
