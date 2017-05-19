class OptionsPeople {   
 addHuman (name){
        let human = new PEOPLE(name);
        people.push(human);
        console.log(people);
        information.changeInformation('Dodano pracownika ' + name + '!');
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
             people.splice(i, 1);
             console.log(people);
             information.changeInformation(`Usunięto pracownika ${name}' !` );
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
