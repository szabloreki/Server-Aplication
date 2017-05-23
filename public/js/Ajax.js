class Ajax {

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

   addWorker (worker){
        this.shorter(worker, "/addToDataBase");
   }
   removeWorker (workerToRemove){
        this.shorter(workerToRemove, "/removeWorker");
   }
   updateWorker (workerToUpdate){
        this.shorter(workerToUpdate, "/updateWorker")
   }

   shorter (date, url){
        let Json = JSON.stringify(date);
        console.log(Json);
        let xml = new XMLHttpRequest();
        xml.open("POST",url, true);
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(Json);
   }

   register (date){
   		this.shorter(date, "/register")
   }

   toRegister(date){


   	this.shorter(date ,'/toRegister');

   }





}
let ajax = new Ajax();
