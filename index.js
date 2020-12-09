// toggle function

function toggleElement(){
 var checkBox = document.getElementById("toggleId");
 var mapData = '<iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=18.786881%2C%2072.885363&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe> <h2>Goteshwar Mandir Map</h2>';
 var imgData ='<img src="img/temple.jpg" style="width:600px;height:500px;" />';
 var mapDiv = document.getElementById("mapDiv");
 var imgDiv = document.getElementById("imgDiv");
 
 if (checkBox.checked == true){
	 imgDiv.innerHTML="";
	 mapDiv.innerHTML = mapData; 
 }else{
	 mapDiv.innerHTML ="";
	 imgDiv.innerHTML = imgData;
 }
 
}

function imgLoad(){
 var imgData ='<img src="img/temple.jpg" style="width:600px;height:500px;" /> <h2>Goteshwar Mandir</h2>';
 var imgDiv = document.getElementById("imgDiv");
	 imgDiv.innerHTML = imgData;
}