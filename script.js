function newTd() {
    const addElement = document.querySelector("input").value.trim();
    if (!addElement) {
        alert("Please enter a valid task to do.");
        return;
    }
    const newElement1 = document.createElement("li");
    const newElement2 = document.createElement("input");
    newElement2.type = "checkbox";
    // add Event: if checkbox is checked, li is moved to doneList
    newElement2.addEventListener("change", function() {
        if (newElement2.checked) {
            document.getElementById("doneList").appendChild(newElement1);
        } else {
            document.getElementById("toDoList").appendChild(newElement1);
        }
    });
    newElement1.appendChild(newElement2);
    newElement1.appendChild(document.createTextNode(addElement + " "));
    document.getElementById("toDoList").appendChild(newElement1);
}
function deleteAll(){
    const toDoList = document.querySelectorAll("#doneList li");
toDoList.forEach(li => li.remove());
}
function checkAll(){
    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change')); //Trigger change event to move to doneList
    });
}
