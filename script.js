// ── Initial hard-coded tasks ──
var tasks = [
  { id: 1, title: "Set up project repository",     description: "Create GitHub repo and push initial files.", status: "Done",        due: "2026-03-10" },
  { id: 2, title: "Design HTML skeleton",           description: "Write semantic HTML structure for dashboard.", status: "Done",     due: "2026-03-15" },
  { id: 3, title: "Apply CSS styling",              description: "Style the layout using Flexbox and classes.",  status: "In Progress", due: "2026-03-22" },
  { id: 4, title: "Implement JavaScript logic",     description: "Add DOM manipulation and event handlers.",     status: "In Progress", due: "2026-03-26" },
  { id: 5, title: "Record demo video",              description: "Screen-record and upload 30-90 second demo.",  status: "Todo",       due: "2026-03-26" }
];

var nextId = 6;


function getBadgeClass(status) {
  if (status === "Todo")        return "badge badge-todo";
  if (status === "In Progress") return "badge badge-progress";
  if (status === "Done")        return "badge badge-done";
  return "badge badge-todo";
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  var parts = dateStr.split("-");
  return parts[2] + "/" + parts[1] + "/" + parts[0];
}

function renderTasks() {
  var list = document.getElementById("task-list");
  var countBadge = document.getElementById("task-count");
  list.innerHTML = "";
  countBadge.textContent = tasks.length;

  if (tasks.length === 0) {
    list.innerHTML = '<div class="empty-state">No tasks yet. Create one using the form!</div>';
    return;
  }

  for (var i = 0; i < tasks.length; i++) {
    var t = tasks[i];
    var item = document.createElement("div");
    item.className = "task-item";
    item.setAttribute("data-id", t.id);

    var dueHtml  = t.due         ? '<span class="task-due">Due ' + formatDate(t.due) + '</span>' : '';
    var descHtml = t.description ? '<div class="task-desc-text">' + t.description + '</div>'      : '';

    item.innerHTML =
      '<div class="task-info">' +
        '<div class="task-title-text">' + t.title + '</div>' +
        descHtml +
        '<div class="task-meta">' +
          '<span class="' + getBadgeClass(t.status) + '">' + t.status + '</span>' +
          dueHtml +
        '</div>' +
      '</div>' +
      '<button class="btn-delete" onclick="deleteTask(' + t.id + ')">Delete</button>';

    list.appendChild(item);
  }
}


function addTask() {
  var titleInput  = document.getElementById("task-title");
  var descInput   = document.getElementById("task-desc");
  var statusInput = document.getElementById("task-status");
  var dueInput    = document.getElementById("task-due");
  var titleError  = document.getElementById("title-error");


  if (titleInput.value.trim() === "") {
    titleInput.classList.add("error");
    titleError.classList.add("show");
    titleInput.focus();
    return;
  }


  titleInput.classList.remove("error");
  titleError.classList.remove("show");


  var newTask = {
    id:          nextId++,
    title:       titleInput.value.trim(),
    description: descInput.value.trim(),
    status:      statusInput.value,
    due:         dueInput.value
  };

  tasks.push(newTask);
  renderTasks();
  clearForm();
}


function deleteTask(id) {
  tasks = tasks.filter(function(t) { return t.id !== id; });
  renderTasks();
}


function clearForm() {
  document.getElementById("task-title").value  = "";
  document.getElementById("task-desc").value   = "";
  document.getElementById("task-status").value = "Todo";
  document.getElementById("task-due").value    = "";
  document.getElementById("task-title").classList.remove("error");
  document.getElementById("title-error").classList.remove("show");
}


document.getElementById("btn-create").addEventListener("click", addTask);
document.getElementById("btn-clear").addEventListener("click", clearForm);


document.getElementById("task-title").addEventListener("input", function() {
  if (this.value.trim() !== "") {
    this.classList.remove("error");
    document.getElementById("title-error").classList.remove("show");
  }
});


var navLinks = document.querySelectorAll(".navbar a");
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function(e) {
    e.preventDefault();
    for (var j = 0; j < navLinks.length; j++) navLinks[j].classList.remove("active");
    this.classList.add("active");
  });
}

renderTasks();
