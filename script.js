function newTd() {
    const addElement = document.querySelector("input").value.trim();
    if (!addElement) {
        alert("Please enter a valid task to do.");
        return;
    }

    // Neues <li> & Checkbox
    const newElement1 = document.createElement("li");
    const newElement2 = document.createElement("input");
    newElement2.type = "checkbox";

    // Wenn Checkbox geändert → <li> verschieben
    newElement2.addEventListener("change", function () {
        if (newElement2.checked) {
            document.getElementById("doneList").appendChild(newElement1);
        } else {
            document.getElementById("toDoList").appendChild(newElement1);
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

    // Rechtsklick zeigt Menü (Desktop)
    newElement1.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        closeAllMenus();
        contextMenu.style.display = "block";
        contextMenu.style.left = e.offsetX + "px";
        contextMenu.style.top = e.offsetY + "px";
    });

    // Langes Drücken zeigt Menü (Mobile)
    let touchTimer;
    newElement1.addEventListener("touchstart", () => {
        touchTimer = setTimeout(() => {
            closeAllMenus();
            contextMenu.style.display = "block";
        }, 600); // 0.6 Sekunden gedrückt halten
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

function deleteAll() {
    const toDoList = document.querySelectorAll("#doneList li");
    toDoList.forEach(li => li.remove());
}

function checkAll() {
    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change'));
    });
}
