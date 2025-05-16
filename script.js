const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthRadius = 130;
const dateRadius = 200;
const centerX = 250;
const centerY = 250;

function createCircleItems(container, count, radius, className, labels, activeIndex) {
  for (let i = 0; i < count; i++) {
    const angle = ((i - 6) / count) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    const item = document.createElement("div");
    item.className = `${className}`;
    if (i === activeIndex) item.classList.add("active");

    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    item.style.transform = "translate(-50%, -50%)";
    item.textContent = labels[i];
    container.appendChild(item);
  }
}

function updateClock() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

  // Clear previous items
  const clock = document.getElementById("clock");
  clock.innerHTML = `<div class="center-year" id="year">${year}</div>`;

  // Create month circle
  createCircleItems(clock, 12, monthRadius, "month", months, month);

  // Create date circle (1–31)
  const dates = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  createCircleItems(clock, 31, dateRadius, "date", dates, date - 1);

  // Update time
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  document.getElementById("time").textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();
