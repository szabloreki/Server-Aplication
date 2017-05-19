class Ajax {
	send (){
		console.log(this);
        let peopleJson = JSON.stringify(people);
        if(people.length === 0){
        	information.changeInformation('Nie ma co wysłać!');
        	return;
        }
        console.log(peopleJson);
        let xml = new XMLHttpRequest();
        xml.open("POST", "/addToDataBase", true);
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(peopleJson);
	}
	download (){
		let xhr = new XMLHttpRequest();
	    xhr.onreadystatechange = function() {
	    if (xhr.readyState == XMLHttpRequest.DONE) {
	        var jsonObj = JSON.parse(xhr.responseText);

	        for(let i=0; i<jsonObj.length; i++){
	        jsonObj[i].checkIfWorkExisted   = function(work,arrayWork){
	                 for(let i =0; i < arrayWork.length; i++){
	                     if(arrayWork[i] === work){
	                         console.log(' on ma już tą robotę, kompletnie nie umiesz, zarządzać, dobrze, że masz ten system!');
	                         information.changeInformation('Użytkownik już to robi!');
	                         return false;
	                        }
	                    }
	               return true;   
	             }
	        }

	        people = jsonObj;
	        console.log(jsonObj);
	        alert(xhr.responseText);
	    }
			}
	    xhr.open('GET', '/server/ajax', true);
	    xhr.send(null);
	}
}
let ajax = new Ajax();
