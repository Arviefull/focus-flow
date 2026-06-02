const MODES = {
  focus: { label: "Focus", seconds: 25 * 60 },
  short: { label: "Break", seconds: 5 * 60 },
  long: { label: "Long break", seconds: 15 * 60 },
};

const STORAGE_KEY = "focus-flow-state";
const CIRCUMFERENCE = 603;

const state = loadState();
let currentMode = "focus";
let remainingSeconds = MODES[currentMode].seconds;
let timerId = null;

const timeDisplay = document.querySelector("#timeDisplay");
const modeLabel = document.querySelector("#modeLabel");
const ringProgress = document.querySelector("#ringProgress");
const startPause = document.querySelector("#startPause");
const resetTimer = document.querySelector("#resetTimer");
const modeButtons = document.querySelectorAll("[data-mode]");
const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const taskCounter = document.querySelector("#taskCounter");
const focusCount = document.querySelector("#focusCount");
const completedCount = document.querySelector("#completedCount");
const focusMinutes = document.querySelector("#focusMinutes");
const themeToggle = document.querySelector("#themeToggle");

applyTheme();
renderTimer();
renderTasks();
renderStats();

startPause.addEventListener("click", () => {
  if (timerId) {
    pauseTimer();
    return;
  }

  startTimer();
});

resetTimer.addEventListener("click", () => {
  pauseTimer();
  remainingSeconds = MODES[currentMode].seconds;
  renderTimer();
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentMode = button.dataset.mode;
    remainingSeconds = MODES[currentMode].seconds;
    pauseTimer();
    renderTimer();
    renderModeButtons();
  });
});

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = taskInput.value.trim();

  if (!title) {
    return;
  }

  state.tasks.unshift({
    id: crypto.randomUUID(),
    title,
    done: false,
  });

  taskInput.value = "";
  saveState();
  renderTasks();
});

taskList.addEventListener("click", (event) => {
  const item = event.target.closest("[data-id]");

  if (!item) {
    return;
  }

  const task = state.tasks.find((entry) => entry.id === item.dataset.id);

  if (event.target.matches("[data-toggle]") && task) {
    const wasDone = task.done;
    task.done = event.target.checked;

    if (!wasDone && task.done) {
      state.completedTasks += 1;
    }

    saveState();
    renderTasks();
    renderStats();
  }

  if (event.target.matches("[data-remove]")) {
    state.tasks = state.tasks.filter((entry) => entry.id !== item.dataset.id);
    saveState();
    renderTasks();
  }
});

themeToggle.addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  saveState();
  applyTheme();
});

function startTimer() {
  startPause.textContent = "Pause";
  timerId = window.setInterval(() => {
    remainingSeconds -= 1;

    if (remainingSeconds <= 0) {
      completeSession();
      return;
    }

    renderTimer();
  }, 1000);
}

function pauseTimer() {
  window.clearInterval(timerId);
  timerId = null;
  startPause.textContent = "Start";
}

function completeSession() {
  pauseTimer();

  if (currentMode === "focus") {
    state.focusSessions += 1;
    state.focusMinutes += Math.round(MODES.focus.seconds / 60);
    saveState();
    renderStats();
  }

  remainingSeconds = MODES[currentMode].seconds;
  renderTimer();
}

function renderTimer() {
  const minutes = Math.floor(remainingSeconds / 60).toString().padStart(2, "0");
  const seconds = (remainingSeconds % 60).toString().padStart(2, "0");
  const total = MODES[currentMode].seconds;
  const progress = remainingSeconds / total;

  modeLabel.textContent = MODES[currentMode].label;
  timeDisplay.textContent = `${minutes}:${seconds}`;
  ringProgress.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - progress));
}

function renderModeButtons() {
  modeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === currentMode);
  });
}

function renderTasks() {
  const total = state.tasks.length;
  const done = state.tasks.filter((task) => task.done).length;
  taskCounter.textContent = `${done} / ${total}`;

  if (!state.tasks.length) {
    taskList.innerHTML = '<li class="empty">No tasks yet. Add one clear next step.</li>';
    return;
  }

  taskList.innerHTML = state.tasks
    .map(
      (task) => `
        <li class="${task.done ? "done" : ""}" data-id="${task.id}">
          <input data-toggle type="checkbox" ${task.done ? "checked" : ""} aria-label="Toggle task" />
          <span>${escapeHtml(task.title)}</span>
          <button class="remove-task" data-remove type="button" aria-label="Remove task">×</button>
        </li>
      `,
    )
    .join("");
}

function renderStats() {
  focusCount.textContent = String(state.focusSessions);
  completedCount.textContent = String(state.completedTasks);
  focusMinutes.textContent = String(state.focusMinutes);
}

function applyTheme() {
  document.documentElement.classList.toggle("dark", state.theme === "dark");
}

function loadState() {
  const fallback = {
    tasks: [],
    focusSessions: 0,
    completedTasks: 0,
    focusMinutes: 0,
    theme: "light",
  };

  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(value) {
  const element = document.createElement("span");
  element.textContent = value;
  return element.innerHTML;
}
