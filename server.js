const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const questions = [
    { question: "What is the capital of France?", answers: ["a) Paris", "b) London", "c) Berlin", "d) Madrid"], correct: 'a' },
    { question: "What is 2 + 2?", answers: ["a) 3", "b) 4", "c) 5", "d) 6"], correct: 'b' },
    { question: "What color do you get by mixing red and white?", answers: ["a) Pink", "b) Blue", "c) Green", "d) Purple"], correct: 'a' },
    { question: "What is the largest ocean on Earth?", answers: ["a) Atlantic", "b) Indian", "c) Arctic", "d) Pacific"], correct: 'd' },
    { question: "What is the boiling point of water?", answers: ["a) 100°C", "b) 0°C", "c) 50°C", "d) 200°C"], correct: 'a' },
    { question: "What planet is known as the Red Planet?", answers: ["a) Earth", "b) Mars", "c) Saturn", "d) Venus"], correct: 'b' },
    { question: "What is the currency of Japan?", answers: ["a) Yen", "b) Won", "c) Dollar", "d) Euro"], correct: 'a' },
    { question: "What is the freezing point of water?", answers: ["a) 0°C", "b) -100°C", "c) 32°F", "d) 100°C"], correct: 'a' },
    { question: "How many continents are there?", answers: ["a) 5", "b) 6", "c) 7", "d) 8"], correct: 'c' },
    { question: "Who wrote 'Romeo and Juliet'?", answers: ["a) Mark Twain", "b) Charles Dickens", "c) William Shakespeare", "d) Jane Austen"], correct: 'c' },
];

let score = 0;
let currentQuestion = 0;
let totalTime = 100; // Total quiz time in seconds
let questionTime = 10; // Time per question in seconds

function displayTimers() {
    console.clear(); // Clear the console for a cleaner output
    console.log(`Total time left for the quiz: ${totalTime} seconds`);
    console.log(`Time left for this question: ${questionTime} seconds`);
    console.log(`Current Question: ${currentQuestion + 1}: ${questions[currentQuestion].question}`);
    questions[currentQuestion].answers.forEach(answer => console.log(answer));
}

function askQuestion() {
    if (currentQuestion < questions.length) {
        displayTimers();

        let timer = setTimeout(() => {
            console.log("Time's up! Moving to the next question.");
            currentQuestion++;
            questionTime = 10; // Reset question time for the next question
            askQuestion();
        }, questionTime * 1000);

        const questionTimer = setInterval(() => {
            if (questionTime > 0) {
                questionTime--;
                displayTimers(); // Update the timer display
            } else {
                clearInterval(questionTimer);
            }
        }, 1000);

        rl.question('Your answer: ', (answer) => {
            clearTimeout(timer);
            clearInterval(questionTimer);
            const normalizedAnswer = answer.toLowerCase();
            if (normalizedAnswer === questions[currentQuestion].correct) {
                score++;
                console.log("Correct!");
            } else if (normalizedAnswer.length > 0) { // Only message for invalid input if not empty
                console.log("Wrong answer.");
            }
            currentQuestion++;
            questionTime = 10; // Reset question time for the next question
            askQuestion();
        });
    } else {
        console.log(`\nQuiz over! Your final score: ${score} out of ${questions.length}`);
        rl.close();
    }
}

const overallTimer = setInterval(() => {
    if (totalTime <= 0 || currentQuestion >= questions.length) {
        clearInterval(overallTimer);
        if (totalTime <= 0) {
            console.log("Quiz time's up!");
        }
        currentQuestion = questions.length; // Move to end the quiz
    } else {
        totalTime--; // Decrement total time
    }
}, 1000);

askQuestion();
