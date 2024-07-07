let asnwerCheck=document.getElementById("aswercheck");
let scoreShowcase=document.getElementById("score");
let endofquiz=document.getElementById("endofquiz")

let currentQuestionIndex = 0;
let score=0
    let questionsData;

    // Fetch data from the JSON file
    fetch('questions/mythology.json')
      .then(response => response.json())
      .then(data => {
        questionsData = data.questions;
        displayQuestion();
      })
      .catch(error => console.error('Error fetching data:', error));

    function displayQuestion() {
      const quizContainer = document.getElementById('quiz-container');
      quizContainer.innerHTML = '';
      asnwerCheck.innerHTML=""

      const questionData = questionsData[currentQuestionIndex];

      const questionDiv = document.createElement('div');
      questionDiv.innerHTML = `<h3>Question ${currentQuestionIndex + 1}: ${questionData.question}</h3>`;

      // Iterate through each answer for the question
      questionData.answers.forEach(answerData => {
        const answerBtn = document.createElement('button');
        answerBtn.classList.add("button")
        answerBtn.textContent = answerData.option;
        answerBtn.addEventListener('click', () => {
          if (answerData.correct) {
            score+=1;
            answerBtn.style.backgroundColor="green"
            asnwerCheck.innerHTML="Correct!";
            scoreShowcase.innerHTML=`You answered ${score}/${questionsData.length} correct`
            incrementprogres()
            
            
          } else {
            answerBtn.style.backgroundColor="red"
            const correctAnswer = questionData.answers.find(answer => answer.correct);
            asnwerCheck.innerHTML=`Wrong! The correct answer is ${correctAnswer.option}`;
            scoreShowcase.innerHTML=`You answered ${score}/${questionsData.length} correct`
          }
          currentQuestionIndex++;
          if (currentQuestionIndex < questionsData.length) {
            setTimeout(displayQuestion,2000)
          } else {
            endofquiz.innerHTML="Quiz ended!"
            let button = document.createElement('button');
            button.textContent = 'Back to Home'
            
            button.classList.add("button")
            let container=document.getElementById("gohome")
            container.appendChild(button)
            button.addEventListener("click",backtohome)
            
            
          }
        });
        questionDiv.appendChild(answerBtn);
      });

      quizContainer.appendChild(questionDiv);
    }


function incrementprogres(){
  let progress=document.getElementById("progresbar")
  let currentvalue=progress.value;
  if(currentvalue<20){
    progress.value++
  }
}

function backtohome(){
  window.location.href='index.html'
}