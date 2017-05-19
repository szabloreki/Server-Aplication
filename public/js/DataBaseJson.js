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
