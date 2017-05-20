class Listeners {
    constructor () {
        this.userAdd = document.querySelector('#AddUser');
        this.inputText = document.querySelector('#AddUserText');
        this.showWorkers = document.querySelector('#CheckWorkers');
        this.workText = document.querySelector('#WorkText');
        this.workTextMulitple = document.querySelector('#WorkTextMultiple')
        this.addWork = document.querySelector('#AddWork');
        this.User = document.querySelector('#User');
        this.userWork = document.querySelector('#UserWork');
        this.allWorks = document.querySelector('#AllWorks');
        this.removeUserText = document.querySelector('#RemoveUserText');
        this.removeUser = document.querySelector('#RemoveUser');
        this.target = document.querySelector('#Target');
        this.targetLoop = document.querySelector('#TargetLoop');
        this.multipleWork = document.querySelector('#multipleWork');
        this.removeUsers = document.querySelector('#RemoveUsers');
        this.explorel = document.querySelector('#explorel')
    }
    addListener (element,functioN){
        element.addEventListener('click',functioN,false);
    }
    showElement(element){
        console.log(element);
    }   
    targeting (li){
        li.addEventListener('click' ,function (){
                if(target === true){
                    console.log(this);
                    let li = this;
                    if(li.className === "Targeted"){
                        li.className = "workers";
                    }
                    else
                    {
                        li.className = "Targeted";    
                    }
                }
                if(loop === true){
                    gui.showOneWorker(this);
                }
        } ,false);
        return li;
    }   
    removeMultiple (){
    if(target){
        let ol = document.querySelector('#listOfElements');
        if(target){
            information.changeInformation('Okej!...')
        }
        for(let i = 0; i<ol.children.length; i++){
        if (ol.children[i].classList.contains("Targeted")) {
                     console.log(ol.children[i]);
                     let name = ol.children[i].textContent;
                     console.log(name);
                     optionsPeople.removeUser(name);
                     
                     ol.removeChild(ol.children[i]);
                     continue;
                } 
        }
    }
}
    removeOne (name){
        optionsPeople.removeUser(name);
    }
    addMultipleWork (){
        if(target){
        let ol = document.querySelector('#listOfElements');
        let work = this.workTextMulitple.value;
        let names =[];
        console.log(work);
        for(let i = 0; i<ol.children.length; i++){
        if (ol.children[i].classList.contains("Targeted")){
                    let name = ol.children[i].textContent;
                    names.push(name);
                } 
        }
        console.log(names);
        optionsPeople.addWork(names, work)
                } 
    }
    checkwhoIsDoingWork (li){
        li.addEventListener('click', function (){
            let work = li.textContent;
            let whoIsDoingWork = optionsPeople.checkWhoisDoingWork(work);
            gui.showNameWhenUserIsCheckingWhoIsDoingWork(whoIsDoingWork);
        },false)
    }
    addOnKey (element, Function){
        element.addEventListener('keyup', Function,false);
    }
    addOfFocus (element, Function){
        element.addEventListener('focusout', Function, false);
    }
    addOnFocus (element, Function){
        element.addEventListener('focus', Function, false);
    }
    
    addOnoOnFocus (element, Function){
        element.addEventListener('mousein', Function, false);
    }
} 
let listener = new Listeners();
listener.addListener(listener.userAdd, function (){
        let name = listener.inputText.value;
        if(name.length === 0)
            {
                console.log('Nie podałeś Nazwy!');
                information.changeInformation('Nie podałeś nazwy!');
                console.log(people)
                return;
            }
        else if(optionsPeople.checkIfExisting(name)){
            information.changeInformation('Taki użytkownik już istnieje!');
            return;
        }
        optionsPeople.addHuman(name);
        console.log(people);
});
listener.addListener(listener.showWorkers, function(){
        optionsPeople.showEveryName();
        let arrayDOM = genereteDOM.nameWorkers();    
        gui.showDOM(arrayDOM);
});
listener.addListener(listener.userWork, function(){
    let UserName = listener.User.value;
    optionsPeople.checkWork(UserName);
    let arrayWork = genereteDOM.work(UserName);
    gui.showWork(arrayWork);
});
listener.addListener(listener.allWorks, function (){
    console.log(this);
    let ArrayDOM = genereteDOM.allWorks();
    console.log(ArrayDOM);
    ArrayDOM.sort();
    console.log(ArrayDOM);
    gui.showWork(ArrayDOM);
});
listener.addListener(listener.target , function(){
    let button = this;
    button.style.backgroundColor = "#66DF46";
    listener.targetLoop.style.backgroundColor = "";
    loop = false;
    target = true;
});
listener.addListener(listener.targetLoop, function (){
    listener.target.style.backgroundColor = "";
    listener.targetLoop.style.backgroundColor = "#66DF46"
    loop = true;
    target = false; 
});
listener.addListener(listener.multipleWork, function (){
    if(target){
    listener.addMultipleWork();
    console.log('ok');
    }
    else
    {
        information.changeInformation('Nie masz zaznaczenia!');
    }
});
listener.addListener(listener.removeUsers, function (){
        listener.removeMultiple();
});

listener.addOnKey(listener.explorel, function (){
        let text = listener.explorel.value;
        let looked =  optionsPeople.showWhenExplorel(text);
       // gui.showDOM(looked);
        if(text.length === 0){
        //optionsPeople.showEveryName();
        let arrayDOM = genereteDOM.nameWorkers();
        gui.showDOM(arrayDOM);
        }    
        gui.showDOM(looked);
});
listener.addOfFocus(listener.explorel, function (){
        gui.clear();
});
listener.addOnFocus(listener.explorel, function (){
        optionsPeople.showEveryName();
        let arrayDOM = genereteDOM.nameWorkers();    
        gui.showDOM(arrayDOM)
});




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
}
let ajax = new Ajax();

class Console {
    constructor (){
        this.changeText = document.querySelector('#Information')
        this.changeInformation = function (string){
        this.changeText.innerHTML = string;
        }
    }
}
let information = new Console();

class GenerateDOM {
        nameWorkers (){
            gui.clear();
            let nameArrayDOM = [];
            for(let i=0; i<people.length; i++){
                let name = people[i].name;
                let li = this.createLi(name);       
                nameArrayDOM.push(li);
            }
            return nameArrayDOM;
        }
        work (name){
        let workArray = [];
        for( let i =0; i<people.length; i++){
        if(people[i].name === name){
            let work = people[i].work;
         for(let number =0; number < work.length ; number++){
             let worked = work[number];
             let li = this.createLi(worked);
             workArray.push(li);
                    }       
                }
          } 
         return workArray;
        }
        allWorks () {
        let allWorks = [];
        let worksString =  [];
            for(let i=0; i < people.length; i++){
            let  works = people[i].work;
                for(let i =0; i < works.length; i ++){
                    let work = works[i]
                    console.log(work);
                    if(works != ""){
                        worksString.push(work);
                    }
                }   
            }
            let uniqueArray = worksString.filter(function(item, pos) {
            return worksString.indexOf(item) == pos;
                        })
            worksString = uniqueArray;
            for(let i =0; i < worksString.length; i++){
                let li = this.createLi(worksString[i])
                allWorks.push(li)
            }
    return allWorks;
        }
    createLi (textcontent){
        let li = document.createElement('li');
        li.innerHTML = textcontent;
        li.classList = "workers";
        
        return li;
    }
    }
let  genereteDOM = new GenerateDOM();    

class DataBase {
    load (){
        let getPeople = localStorage.getItem('people');
        let toObject = JSON.parse(getPeople);
        for(let i=0; i<toObject.length; i++){
        toObject[i].checkIfWorkExisted   = function(work,arrayWork){
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
        if(toObject.length === 0){
            information.changeInformation('Nie wczytuję bo nie ładuje!')
        }
        people = toObject;
        information.changeInformation('Załadowano!');
    }
    save (){
        let peopleJSON = JSON.stringify(people);
        console.log(peopleJSON);
        localStorage.setItem('people', peopleJSON);
        information.changeInformation('Zapisano!');
    }    
}
let dataBase = new DataBase();

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

class OptionsPeople {   
 addHuman (name){
        let human = new PEOPLE(name);
        people.push(human);
        console.log(people);
        information.changeInformation('Dodano pracownika ' + name + '!');
        ajax.addWorker(human);
     }   
 showName (){
      for(let i =0; i<people.length; i++){
          console.log(people[i].name)
      }
  }
 addWork (human,work){
      for (let number  =0; number< people.length; number++){
          for (let i =0; i< human.length ; i++){
                if(people[number].name === human[i]){
                    if(people[number].checkIfWorkExisted(work, people[number].work))
                        {
                            people[number].work.push(work);
                            console.log(people[number].name   + ' Dostał robotę' + ' ' + people[number].work);
                            information.changeInformation(people[number].name + ' dostał pracę!');
                            ajax.updateWorker(people[number]);
                        }
                }   
          }
      }
 }
 checkWork (name){
    let toReturn = "Undefineted" 
    for( let i =0; i<people.length; i++){
        if(people[i].name === name){
            console.log(people[i].name + ' ma robotę: ' + people[i].work);
           toReturn = people[i].work;
        }
    }
    return toReturn;
}
 checkIfExisting (name){
      let bool = false
      for( let i =0; i<people.length; i++){
        if(people[i].name === name){
            console.log(people[i].name + ' istnieje');
            bool = true;
            return bool;
        }
    }    
    console.log('Nie ma nikogo o takim imienu');
}
 checkWhoisDoingWork(work){
    let whoDoingWork = []; 
    for(let i =0; i<people.length; i++){
        for (let works = 0; works < people[i].work.length; works ++){
            if(people[i].work[works] === work){
                console.log(people[i].name + 'aktualnie wykonuje ta pracę');
                let whoIsdoing =  people[i].name + ' aktualnie wykonuje ta pracę';
                let li = document.createElement('li');
                li.textContent = whoIsdoing;
                li.classList = "workers";
                whoDoingWork.push(li);
                continue;
                }
            }
        }
    return whoDoingWork;
    }
 showEveryName (){
    for(let i =0; i<people.length; i++){
        console.log(people[i].name);
    } 
}
 removeUser (name){
     for(let i=0; i < people.length; i++){
         if(people[i].name === name){
             information.changeInformation(`Usunięto pracownika ${name}' !` );
             ajax.removeWorker(people[i]);
             people.splice(i, 1);
             return;
         }
     }
     information.changeInformation('Nie ma takiego użytkownika!');
            }
  showWhenExplorel(name){
      let arrayName = [];
      if(name.length === 0 ){
          return arrayName;
      }
      for(let i =0; i< people.length; i++){
          if(people[i].name.startsWith(name, 0)){
              let li = document.createElement('li');
              li.textContent = people[i].name;
              li.classList = "workers";
              arrayName.push(li);
          }
      }
      return arrayName;
  }   
}
let optionsPeople =  new OptionsPeople();

class PEOPLE {
     constructor (name){
         this.name = name;
         this.work = [];
         this.checkIfWorkExisted = function(work,arrayWork){
                 for(let i =0; i < arrayWork.length; i++){
                     if(arrayWork[i] === work){
                         information.changeInformation('Użytkownik już to robi!');
                         return false;
                        }
                    }
               return true;   
             }   
     }
 }   
let people = [];
let target = null;
let loop = null;


