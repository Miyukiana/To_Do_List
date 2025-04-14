function newTd() {
const addElement = document.querySelector("input").value.trim();
if (!addElement) {
    alert("Please enter a valid task to do.");
    return;
}
const newElement = document.createElement("li");
document.querySelector("ol").appendChild(newElement);
newElement.textContent = addElement;
}
function deleteAll(){
    const toDoList = document.querySelectorAll("li");
toDoList.forEach(li => li.remove());
}