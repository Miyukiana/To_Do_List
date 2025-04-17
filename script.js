function newTd() {
    const addElement = document.querySelector("input").value.trim();
    if (!addElement) {
        alert("Please enter a valid task to do.");
        return;
    } else {
        document.querySelector("input").value = ""; // Eingabe leeren
    }

    // Neues <li>
    const newElement1 = document.createElement("li");
    newElement1.classList.add("new-task");

    // Custom Checkbox
    const label = document.createElement("label");
    label.classList.add("custom-checkbox");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("ToDo");

    const span = document.createElement("span");
    span.classList.add("checkbox-style");

    label.appendChild(checkbox);
    label.appendChild(span);

    // Checkbox Event
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            document.getElementById("doneList").appendChild(newElement1);
            newElement1.classList.remove("new-task");
            newElement1.classList.add("done-task");
            checkbox.classList.remove("ToDo");
            checkbox.classList.add("notToDo");
        } else {
            document.getElementById("toDoList").appendChild(newElement1);
            newElement1.classList.remove("done-task");
            newElement1.classList.add("new-task");
            checkbox.classList.remove("notToDo");
            checkbox.classList.add("ToDo");
        }
    });

    // Kontextmenü
    const contextMenu = document.createElement("div");
    contextMenu.className = "menu";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️ Löschen";
    deleteBtn.addEventListener("click", () => {
        newElement1.remove();
        contextMenu.style.display = "none";
    });

    contextMenu.appendChild(deleteBtn);

    // Zusammenbauen
    newElement1.appendChild(label);
    newElement1.appendChild(document.createTextNode(" " + addElement));
    newElement1.appendChild(contextMenu);

    document.getElementById("toDoList").appendChild(newElement1);

    // Kontextmenü über Touch
    let touchTimer;
    newElement1.addEventListener("touchstart", (e) => {
        touchTimer = setTimeout(() => {
            closeAllMenus();
            contextMenu.style.display = "block";
            if (e.touches && e.touches.length > 0) {
                contextMenu.style.left = e.touches[0].clientX + "px";
                contextMenu.style.top = e.touches[0].clientY + "px";
            }
        }, 600);
    });

    newElement1.addEventListener("touchend", () => clearTimeout(touchTimer));
}

// Menü-Funktionen
function closeAllMenus() {
    document.querySelectorAll(".menu").forEach(menu => {
        menu.style.display = "none";
    });
}
document.addEventListener("click", closeAllMenus);

function deleteDoneTasks() {
    const doneList = document.querySelectorAll("#doneList li");
    doneList.forEach(li => li.remove());
}

function checkAll() {
    document.querySelectorAll("#toDoList input[type='checkbox']").forEach(checkbox => {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change'));
    });
}
