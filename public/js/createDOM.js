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
