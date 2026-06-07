const questionsData = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

let progress =
  JSON.parse(sessionStorage.getItem("progress")) || {};

function renderQuestions() {
  questionsDiv.innerHTML = "";

  questionsData.forEach((q, i) => {
    const div = document.createElement("div");

    const title = document.createElement("p");
    title.textContent = q.question;
    div.appendChild(title);

    q.choices.forEach(choice => {
      const label = document.createElement("label");

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "q" + i;
      radio.value = choice;

      if (progress["q" + i] === choice) {
        radio.checked = true;
      }

      radio.addEventListener("change", () => {
        progress["q" + i] = choice;
        sessionStorage.setItem(
          "progress",
          JSON.stringify(progress)
        );
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(choice));

      div.appendChild(label);
      div.appendChild(document.createElement("br"));
    });

    questionsDiv.appendChild(div);
  });
}

const savedScore = localStorage.getItem("score");

if (savedScore !== null) {
  scoreDiv.textContent =
    `Your score is ${savedScore} out of 5.`;
}

submitBtn.addEventListener("click", () => {
  let score = 0;

  questionsData.forEach((q, i) => {
    if (progress["q" + i] === q.answer) {
      score++;
    }
  });

  scoreDiv.textContent =
    `Your score is ${score} out of 5.`;

  localStorage.setItem("score", score);
});

renderQuestions();