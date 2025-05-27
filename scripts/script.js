const courses = [
  { name: "Web Development", credits: 3, completed: true },
  { name: "Software Development", credits: 4, completed: false },
  { name: "Artificial Intelligence", credits: 4, completed: true },
  { name: "Database Systems", credits: 3, completed: false }
];

const courseList = document.getElementById("courseList");
const totalCreditsEl = document.getElementById("totalCredits");
const courseFilter = document.getElementById("courseFilter")

function renderCourses(filterText = "") {
  courseList.innerHTML = "";

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(filterText.toLowerCase())
  );

  filteredCourses.forEach(course => {
    const li = document.createElement("li");
    li.textContent = `${course.name} (${course.credits} credits)`;
    if (course.completed) {
      li.classList.add("completed");
    }
    courseList.appendChild(li);
  });

  const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
  totalCreditsEl.textContent = totalCredits;
}

courseFilter.addEventListener("input", (e) => {
  renderCourses(e.target.value);
});