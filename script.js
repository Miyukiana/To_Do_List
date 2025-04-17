function newTd() {
    const addElement = document.querySelector("input").value.trim();
    if (!addElement) {
        alert("Please enter a valid task to do.");
        return;
    }
    else{
        document.querySelector("input").value = ""; // Eingabe leeren
    }
    // Neues <li> & Checkbox
    const newElement1 = document.createElement("li");
    const newElement2 = document.createElement("input");
    newElement2.type = "checkbox";

    // li einfärben
    newElement1.classList.add("new-task");

    // Wenn Checkbox geändert → <li> verschieben
    newElement2.addEventListener("change", function () {
        if (newElement2.checked) {
            document.getElementById("doneList").appendChild(newElement1);
            // li anders einfärben
            newElement1.classList.remove("new-task"); 
            newElement1.classList.add("done-task"); 
        }
    else {
        document.getElementById("toDoList").appendChild(newElement1);
        // li anders einfärben
        newElement1.classList.remove("done-task");
        newElement1.classList.add("new-task");
    }
});
    // Kontextmenü erstellen
    const contextMenu = document.createElement("div");
    contextMenu.className = "menu";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️ Löschen";
    deleteBtn.addEventListener("click", () => {
        newElement1.remove(); // Nur dieses li löschen
        contextMenu.style.display = "none";
    });

    contextMenu.appendChild(deleteBtn);
    newElement1.appendChild(newElement2);
    newElement1.appendChild(document.createTextNode(" " + addElement));
    newElement1.appendChild(contextMenu);

    document.getElementById("toDoList").appendChild(newElement1);

    let touchTimer;

    newElement1.addEventListener("touchstart", (e) => {
        touchTimer = setTimeout(() => {
            closeAllMenus();
            contextMenu.style.display = "block";
    
            // Position fürs Kontextmenü
            if (e.touches && e.touches.length > 0) {
                contextMenu.style.left = e.touches[0].clientX + "px";
                contextMenu.style.top = e.touches[0].clientY + "px";
            }
        }, 600);
    });
    
    newElement1.addEventListener("touchend", () => clearTimeout(touchTimer));
} 
// Alle Menüs schließen
function closeAllMenus() {
    document.querySelectorAll(".menu").forEach(menu => {
        menu.style.display = "none";
    });
}

// Menü schließen wenn woanders geklickt wird
document.addEventListener("click", closeAllMenus);

function deleteDoneTasks() {
    const toDoList = document.querySelectorAll("#doneList li");
    toDoList.forEach(li => li.remove());
}

function checkAll() {
    document.querySelectorAll("#toDoList input[type='checkbox']").forEach(checkbox => {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change'));
    });
}


