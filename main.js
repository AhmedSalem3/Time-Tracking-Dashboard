const btns = document.querySelectorAll("nav span");
const allStats = document.querySelectorAll(".box");
const titles = document.querySelectorAll(".stat-name");

checkStorage();

async function fetchJson() {
  let response = await fetch("data.json");
  let data = await response.json();

  updateContent(data, getActiveElement());

  function getActiveElement() {
    let className;
    btns.forEach((btn) => {
      if (btn.classList.contains("active")) {
        let time = btn.getAttribute("class").split(" ")[0];
        className = time;
      }
    });
    return className;
  }

  btnClickedAction(data);
}
fetchJson();

function btnClickedAction(data) {
  btns.forEach((btn) => {
    btn.addEventListener("click", btnAction);
    btn.addEventListener("click", toggleActive);
    btn.addEventListener("click", setLocal);
  });

  function btnAction() {
    const timestamp = this.getAttribute("class");

    updateContent(data, timestamp);
  }
}

function updateContent(data, timestamp) {
  data.forEach((dataSection) => {
    let sectionName = dataSection.title.toLowerCase();

    allStats.forEach((stat) => {
      if (stat.getAttribute("name") === sectionName) {
        const statTitle = stat.querySelector(".stat-name");
        const statCurrent = stat.querySelector(".current");
        const statPrevious = stat.querySelector(".previous");

        statTitle.innerHTML = dataSection.title;
        statCurrent.innerHTML = `${dataSection.timeframes[timestamp].current}hrs`;
        statPrevious.innerHTML = `Last week was: ${dataSection.timeframes[timestamp].previous}hrs`;
      }
    });
  });
}

function toggleActive() {
  btns.forEach((btn) => btn.classList.remove("active"));
  this.classList.add("active");
}

function setLocal() {
  localStorage.setItem(
    "activeElement",
    this.getAttribute("class").split(" ")[0]
  );
}

function checkStorage() {
  let activeElement = localStorage.getItem("activeElement");
  if (activeElement) {
    btns.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.classList.contains(activeElement)) {
        btn.classList.add("active");
      }
    });
  }
}
