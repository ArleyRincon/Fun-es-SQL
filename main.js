var pageCounter = 1;
var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("btn");
btn.addEventListener("click", function(){
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET','https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');
	ourRequest.onload = function(){
		if (ourRequest.status >= 200 && ourRequest.status < 400){
		var ourData = JSON.parse(ourRequest.responseText);
		renderHTML(ourData);
		} else {
			console.log("Conectado ao servidor, porem retornou ERROR.");
		}
	};
	
	ourRequest.onerror = function(){
		console.log("Erro de conexão");
	};
	ourRequest.send();
	pageCounter++;
	if (pageCounter > 3) {
		btn.classList.add("hide");
	}
});
	
function renderHTML(data) {
	var htmlString = "";
	for (i = 0 ; i < data.length; i++){
		htmlString +="<p> nome: " + data[i].name + " especie: " + data[i].species + " gosta ";
		for (ii = 0; ii < data[i].foods.likes.length; ii++) {
			if (ii == 0){
				htmlString += data[i].foods.likes[ii];
			} else {
				htmlString += " e de " + data[i].foods.likes[ii];
			}
		}
		htmlString += " não gosta de ";
		for (ii = 0; ii < data[i].foods.dislikes.length; ii++) {
			if (ii == 0){
				htmlString += data[i].foods.dislikes[ii];
			} else {
				htmlString += " nem de " + data[i].foods.dislikes[ii];
			}
		}
		htmlString += ".</p>";
	}
	animalContainer.insertAdjacentHTML('beforeend',htmlString);
}
