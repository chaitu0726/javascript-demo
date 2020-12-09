//create elements
function createImageElement(){
 var node = document.createElement("IMG");
	 node.src = "img/temple.jpg";
     node.classList.add("card-size");
	 
 return node;
}

function createMapElement(){
var node = document.createElement("IFRAME");
	node.src = "https://maps.google.com/maps?q=18.786881%2C%2072.885363&t=&z=13&ie=UTF8&iwloc=&output=embed";
	node.classList.add("card-size");

return node;
}

function createH2Element(){	
var node  =  document.createElement("H2");
var	nodeData = document.createTextNode("Goteshwar Mandir Map");
	node.appendChild(nodeData);
	
return node;
}
// toggle function
function toggleElement(){
 var checkBox = document.getElementById("toggleId");
 var mapDiv = document.getElementById("mapDiv");
 var imgDiv = document.getElementById("imgDiv");
 
 if (checkBox.checked == true){
	 imgDiv.innerHTML="";
	 var mapElement = createMapElement();
	 var H2Element = createH2Element();
	 mapDiv.appendChild(mapElement);
	 mapDiv.appendChild(H2Element);
 }else{
	 mapDiv.innerHTML ="";
	 imgDiv.appendChild(createImageElement());
 }
 
}
//on load image
function imgLoad(){
 var imgDiv = document.getElementById("imgDiv");
	 imgDiv.appendChild(createImageElement());
}