function inserter(id, str) {
    document.querySelector(id).innerHTML= str;
}


function stats() {
// Step 1: Get user coordinates 
//var nativestate = "100";
//var nativedistrict = "";
function getCoordintes() { 
	var options = { 
		enableHighAccuracy: true, 
		timeout: 5000, 
		maximumAge: 0 
	}; 
	var coordinates = new Array;
	function success(pos) { 
		var crd = pos.coords; 
		var lat = crd.latitude.toString(); 
		var lng = crd.longitude.toString(); 
		coordinates = [lat, lng];
		 getCity(coordinates); 
		//console.log(coordinates);
		return; 

	} 

	function error(err) { 
		console.warn(`ERROR(${err.code}): ${err.message}`); 
	} 

	navigator.geolocation.getCurrentPosition(success, error, options); 
} 

// Step 2: Get city name 
function getCity(coordinates) { 
	var xhr = new XMLHttpRequest(); 
	var lat = coordinates[0]; 
	var lng = coordinates[1]; 

	// Paste your LocationIQ token below. 
	xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.abde77886487302d6bb71ddd12e95d8d&lat=" + 
	lat + "&lon=" + lng + "&format=json", true); 
	xhr.send(); 
	xhr.onreadystatechange = processRequest; 
	xhr.addEventListener("readystatechange", processRequest, false); 
	var count = 0;
	function processRequest(e) { 
		if (xhr.readyState == 4 && xhr.status == 200) { 
			  var response = JSON.parse(xhr.responseText); 
			  nativestate = response.address.state; 
			 if(count == 0){
			  	CasesNearYou(nativestate);
			}
			count++;
			  return; 
		} 
	}
}


function CasesNearYou(s){
 	let map = new Map();
	 map.set("Andhra Pradesh" , "2");
	     map.set("Arunachal Pradesh" , "27");
	     map.set("Assam" , "14");
	     map.set("Bihar" , "11");
	     map.set("Chhattisgarh" , "12");
	     map.set("Goa" , "21");
		 map.set("Karnataka" , "1");
	     map.set("Gujarat" ,"15");
	     map.set("Telangana" , "9");
	     map.set("Haryana" , "IN-HR");
	     map.set("Himachal Pradesh", "22");
	     map.set("Jammu and Kashmir" , "19");
	     map.set("Jharkhand" , "18");
	     map.set("Karnataka" ,"1");
	     map.set("Kerala" ,"4");
	     map.set("Madhya Pradesh" , "16");
	     map.set("Mizoram" , "33");
	     map.set("Nagaland" , "29");
	     map.set("Orissa" , "8");
	     map.set("Punjab" ,  "17");
	     map.set("Rajasthan" , "10");
	     map.set("Sikkim" , "31");
	     map.set("Tamil Nadu" , "3");
	     map.set("Tripura" , "24");
	     map.set("Uttarakhand" , "20");
	     map.set("Uttar Pradesh" , "6");
	     map.set("West Bengal" , "7");
	     map.set("Tamil Nadu" , "3");
	     map.set("Tripura"   , "IN-TR");
	     map.set("Andaman and Nicobar Islands" , "32");
	     map.set("Daman and Diu" , "34");
	     map.set("Delhi" , "25");
		 map.set("Manipur" , "5");
	     map.set("Lakshadweep" , "36");
	     map.set("Pondicherry" , "23");

	var x = map.get(s);
		// console.log(s);
		inserter("#state", s);
		fetch('https://api.covidindiatracker.com/state_data.json')
			.then(function (response) {
			return response.json();
		})
		
		.then(function(data){
			var p = data[x];
			// console.log("idhar aa raha h")
            var confirmed = (p["confirmed"]).toString() + "<br>";
            inserter("#total-conf", confirmed);
            var active = p["active"].toString() + "<br>";
            inserter("#active-case", active);
            var recovered = p["recovered"].toString() + "<br>";
            inserter("#rec-case", recovered);
            var deaths = p["deaths"].toString() + "<br>";
            inserter("#deaths", deaths);
            document.querySelector("#deaths").innerHTML = deaths;
			
            // document.querySelector("#stats").innerHTML = "Idhar aa raha h!!!"
            // inserter(confirmed) 
			// console.log("total confirmed cases " + p["confirmed"].toString());
			// inserter("total confirmed cases " + p["confirmed"].toString());
			// console.log("total acive cases" + p["active"].toString());
			// inserter("total acive cases" + p["active"].toString());
			// console.log("Total recovered cases" + p["recovered"].toString());
			// inserter("Total recovered cases" + p["recovered"].toString());
			// console.log("Total deaths cases" + p["deaths"].toString());
			// inserter("Total deaths cases" + p["deaths"].toString());
			// var username = prompt("Do you wish to access city wise data??\n if Yes :1 \n No : 0");
			
			
			// if(username == 0  ){
			// 	console.log("Ok fine!!");
			// 	inserter("Ok fine!!");
			// }else{
				// console.log("Here is your data");
				// inserter("Here is your data");
				// console.log(p["districtData"]);
				// inserter(p["districtData"]);
			// }
	
		});
		
}
getCoordintes();
}










document.addEventListener("DOMContentLoaded", stats());