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
        this.explorel = document.querySelector('#explorel');

        //register
        this.userName = document.querySelector('#userName');
        this.lastName = document.querySelector('#lastName');
        this.email = document.querySelector('#email');
        this.password = document.querySelector('#password');
        this.login = document.querySelector('#login');
        this.register = document.querySelector('#register');
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


function getRegister(name,lastName,email,password,login){

    let registery = {
        UserName: name,
        lastName: lastName,
        email: email,
        password: password,
        login: login,
    }
    return registery;
}


listener.addListener(listener.register, function (){
    console.log(this);
    console.log(listener.userName);
    console.log(listener.lastName);
    console.log(listener.email);
    console.log(listener.password);
    console.log(listener.login);

    let userName = listener.userName.value;
    let lastName = listener.lastName.value;
    let email = listener.email.value;
    let login = listener.login.value;
    let password = listener.password.value;

    let date = getRegister(userName, lastName, email, login, password);
    console.log(date);

    ajax.register(date, '/register');

});
