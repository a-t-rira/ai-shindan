(() => {
  const data = window.AI_SHINDAN_DATA;
  const screens = [...document.querySelectorAll(".screen")];
  const questionCount = data.questions.length;
  let selectedJob = null;
  let answers = [];
  let currentQuestionIndex = 0;

  function showScreen(name) {
    screens.forEach((screen) => {
      const active = screen.id === `screen-${name}`;
      screen.hidden = !active;
      screen.classList.toggle("is-active", active);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderJobs() {
    const list = document.querySelector("#job-list");
    data.jobs.forEach((job) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "job-card";
      button.innerHTML = '<span class="job-icon" aria-hidden="true"></span><span class="job-label"></span>';
      button.querySelector(".job-icon").textContent = job.icon;
      button.querySelector(".job-label").textContent = job.label;
      button.addEventListener("click", () => {
        selectedJob = job;
        answers = [];
        currentQuestionIndex = 0;
        renderQuestion();
        showScreen("question");
      });
      list.append(button);
    });
  }

  function renderQuestion() {
    const question = data.questions[currentQuestionIndex];
    document.querySelector("#question-title").textContent = question.text;
    document.querySelector("#question-number").textContent = String(currentQuestionIndex + 1);
    document.querySelector("#question-progress").setAttribute("aria-valuenow", String(currentQuestionIndex + 1));
    document.querySelector("#progress-fill").style.width = `${((currentQuestionIndex + 1) / questionCount) * 100}%`;

    const list = document.querySelector("#answer-list");
    list.replaceChildren();
    question.choices.forEach((choice, choiceIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-card";
      button.innerHTML = '<span class="answer-number"></span><span class="answer-label"></span><span class="answer-arrow" aria-hidden="true">›</span>';
      button.querySelector(".answer-number").textContent = String(choiceIndex + 1).padStart(2, "0");
      button.querySelector(".answer-label").textContent = choice;
      button.addEventListener("click", () => {
        if (button.disabled) return;
        list.querySelectorAll("button").forEach((answerButton) => { answerButton.disabled = true; });
        button.classList.add("is-pressed");
        answers[currentQuestionIndex] = choiceIndex;

        window.setTimeout(() => {
          if (currentQuestionIndex === questionCount - 1) {
            showResult();
            return;
          }
          currentQuestionIndex += 1;
          renderQuestion();
          showScreen("question");
        }, 140);
      });
      list.append(button);
    });
  }

  function calculatePercentage(scores, adjustment) {
    const total = scores.reduce((sum, score) => sum + score, 0);
    const maximum = questionCount * 3;
    const basePercentage = (total / maximum) * 100;
    return Math.round(Math.min(95, Math.max(5, basePercentage + adjustment)));
  }

  function findResultType(percentage) {
    return data.resultTypes.find((type) => percentage >= type.min && percentage <= type.max);
  }

  function animatePercentage(target) {
    const number = document.querySelector("#result-percentage");
    const startedAt = performance.now();
    const duration = 900;
    number.setAttribute("aria-label", `${target}%`);

    function tick(now) {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - (1 - progress) ** 3;
      number.querySelector("span").textContent = String(Math.round(target * eased));
      if (progress < 1) window.requestAnimationFrame(tick);
    }

    window.requestAnimationFrame(tick);
  }

  function showResult() {
    const percentage = calculatePercentage(answers, selectedJob.adjustment);
    const resultType = findResultType(percentage);
    const number = document.querySelector("#result-percentage");
    const typeBubble = document.querySelector("#result-type-bubble");

    number.querySelector("span").textContent = "0";
    number.setAttribute("aria-label", "結果を計算中");
    document.querySelector("#result-type-title").textContent = resultType.name;
    document.querySelector("#result-type-message").textContent = resultType.message;
    document.querySelector("#job-message").textContent = `${selectedJob.label}なら：${data.jobMessages[selectedJob.id]}`;
    typeBubble.classList.remove("is-pop");
    showScreen("result");

    window.setTimeout(() => {
      typeBubble.classList.add("is-pop");
      animatePercentage(percentage);
    }, 1000);
  }

  function goBack() {
    if (currentQuestionIndex === 0) {
      showScreen("jobs");
      return;
    }
    answers.splice(currentQuestionIndex - 1, 1);
    currentQuestionIndex -= 1;
    renderQuestion();
  }

  document.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => {
      const destination = button.dataset.go;
      if (destination === "top") {
        selectedJob = null;
        answers = [];
        currentQuestionIndex = 0;
      }
      showScreen(destination);
    });
  });

  document.querySelector("#back-question").addEventListener("click", goBack);

  renderJobs();
  renderQuestion();

  /*
   * 計算確認例（全15問の点数合計を使用）:
   * 全問0点・補正+10 = 10%、全問0点・補正-10 = 5%（下限）。
   * 全問3点・補正-10 = 90%、全問3点・補正+10 = 95%（上限）。
   * 職種補正の最大は+10（事務・経理、カスタマーサポート）、最小は-10。
   */
})();

