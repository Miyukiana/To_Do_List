function newTd() {
  const a = document.querySelector("input").innerHTML;
  const b = document.getElementById("placeForToDos");
  b.innerHTML = a;
}