function newTd() {
    const addElement = document.querySelector("input").value.trim();
    if (!addElement) {
        alert("Please enter a valid task to do.");
        return;
    }
    const newElement1 = document.createElement("li");
    const newElement2 = document.createElement("input");
    newElement2.type = "checkbox";
    newElement1.appendChild(newElement2);
    newElement1.appendChild(document.createTextNode(addElement + " "));
    document.querySelector("ul").appendChild(newElement1);
}
function deleteAll(){
    const toDoList = document.querySelectorAll("li");
toDoList.forEach(li => li.remove());
}
