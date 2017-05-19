class Gui {
    constructor(){
        this.ol = document.querySelector('#listOfElements');
    }
    showAllName (arrayDOM) {
        this.clear();
        for(let i=0; i<arrayDOM.length; i++){
            let nameList = arrayDOM[i]
            this.ol.innerHTML += nameList;
        }
    }
    showWork (ArrayWork){
        this.clear();
        for(let i=0; i<ArrayWork.length; i++){
            this.ol.appendChild(ArrayWork[i]);
            listener.checkwhoIsDoingWork(this.ol.children[i]);
        }
    }
    showDOM(Array){
        if(Array.length === 0){
            return;
        }
        this.clear();
        for(let i=0; i<Array.length; i++){
            this.ol.appendChild(Array[i]);
            listener.targeting(this.ol.children[i]);        
        }
    }
    clear () {
        this.ol.innerHTML = "";
    }    
    showOneWorker (element){
        let noToRemove = element;
        let name = noToRemove.textContent;
        let arrayElementToRemove = [];
        for(let i = 0; i < this.ol.children.length; i ++){
            if(this.ol.children[i].textContent === name){
                continue;
            }
            else
            {
                 arrayElementToRemove.push(this.ol.children[i]);
            }
        }
        for(let i =0; i<arrayElementToRemove.length; i++){
            this.ol.removeChild(arrayElementToRemove[i]);
            }
        let  work = optionsPeople.checkWork(name);
        let inner = `<div class = "infoWorker> ${name} </div>
                     <div class = "work"> Aktualne zadania: ${work} </div>
                     `
        this.ol.innerHTML += inner;
    }
    showNameWhenUserIsCheckingWhoIsDoingWork(arrayDOM) {
        this.clear();
        for(let i=0; i<arrayDOM.length; i++){
            let nameList = arrayDOM[i];
            this.ol.appendChild(nameList);
        }
    }
};
let gui = new Gui();