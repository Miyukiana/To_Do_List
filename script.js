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

    // li einfärben
    newElement1.style.backgroundColor = "rgb(122, 209, 122)";
    newElement1.style.border = "solid 0.5px rgb(38, 174, 38)";
    newElement1.style.margin = "5px";
    newElement1.style.borderRadius = "5px";

    // Wenn Checkbox geändert → <li> verschieben
    newElement2.addEventListener("change", function () {
        if (newElement2.checked) {
            document.getElementById("doneList").appendChild(newElement1);
            // li anders einfärben
            newElement1.style.backgroundColor = " rgb(241, 152, 152)";
            newElement1.style.border = "solid 0.5px rgb(202, 51, 51)";
            newElement1.style.textDecoration = "line-through";
            newElement1.style.textDecorationColor = "red";
            newElement1.style.margin = "5px";
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
    newElement1.addEventListener("touchstart", (e) => {
        touchTimer = setTimeout(() => {
            closeAllMenus();
            contextMenu.style.display = "block";
            contextMenu.style.left = e.touches[0].clientX + "px";
            contextMenu.style.top = e.touches[0].clientY + "px";
        }, 600);
    });
newElement1.addEventListener("touchend", () => clearTimeout(touchTimer));    
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
