class Console {
    constructor (){
        this.changeText = document.querySelector('#Information')
        this.changeInformation = function (string){
        this.changeText.innerHTML = string;
        }
    }
}
let information = new Console();
