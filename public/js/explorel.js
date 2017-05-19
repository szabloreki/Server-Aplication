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


