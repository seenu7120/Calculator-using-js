
let operand1="";
let operand2="";
let operator="";
let decimalFlag=false;

/********************************************  display    ******************************************************************/

/************   display functions   ********/
let display=document.getElementById("display-content");
function currentDisplay(){  
    display.innerText=operand1 + operator + operand2;
    fontSizeAdjust(display.innerText);
}

/***********   font adjust in display  ************/
function fontSizeAdjust(fontAdj){
    if(fontAdj.length <= 14  ){
        display.style.fontSize="2rem";
    }
    else if(fontAdj.length <= 23){
        display.style.fontSize="1.2rem";
    }
    else{
       display.style.fontSize="0.8rem"; 
    }
}

/************************* evalute zero *************************/
// (if operand value has more than one zeros(0000)..then it gives single zero only )
function evaluteZero(){
    if(eval(operand1)===0){
        operand1=0;
    }
    else if(eval(operand2)===0){
        operand2=0;
    }
    currentDisplay();
}

/********************************************  digits and operators click     ******************************************************************/

/****************************** digit button click function **********************/ 
function digitFunction(num){
    if(!decimalFlag){     //bcoz, it will already call in decimal function...if again evaluateZero the decimal value is gone and returns >>>>>>>>> 0 only.
        evaluteZero();
    }
    console.log("typed ",num);
    if(operand1==="" || operator===""){
        if(operand1===0){
            operand1="";
        }
        operand1+=num;   
        console.log("operand1 ",operand1);
    }
    else{
        if(operand2===0){
            operand2="";
        }
        operand2+=num;
        console.log("operand2 ",operand2);
    }
    currentDisplay();
    return;
}

/******************  binary operator(+ - * / etc) click function  *********************/

// if opartor already exits ... try to equlate and then make... next operator  ######finished
function controlBinaryFunction(opratorInput){
    evaluteZero();  // use when value is 00 or 0000... then operator gives >>>>>>> 0
    if(operand1 !=="" && operator!=="" && operand2!==""){
        evaluateFunction();
    }
    if(operand1===""){
        operand1=0;
    }
    operator=opratorInput;
    console.log("operator ",operator);
    currentDisplay();
    return;
}

/*****************  unary operator(sqrt ,sqre, 1/x, %) click fuctions  *****************/
function controlUnaryFunction(unaryOprator){
    // simply return
    if(operand1 ===""){
        return;
    }
    else if(operand1 !=="" && operator !== "" && operand2==="" ){
        return;
    }

    // evaluate and then return...
    /*************** choose operand1   *****************/
    if(operand1 !== "" && operator ==="" && operand2===""){
        if(unaryOprator==="%"){
            operand1=operand1/100; 
            console.log("i am inner of %");
        }
        else if(unaryOprator === "sqrt"){
            operand1=Math.sqrt(operand1);  
            console.log("i am inner of square root");
        }
        else if(unaryOprator === "sqre"){
            operand1=Math.pow(operand1,2);
            console.log("i am inner of square");
        }
        else if(unaryOprator === "fraction"){
            operand1=1/operand1;
            console.log("i am inner of fraction");
        }
        currentDisplay();
        return;
    }
    /*************** choose operand2   *****************/
    else if(operand1 !== "" && operator !=="" && operand2!==""){
        if(unaryOprator==="%"){
            operand2=operand2/100; 
            console.log("i am inner of %");
        }
        else if(unaryOprator === "sqrt"){
            operand2=Math.sqrt(operand2);  
            console.log("i am inner of square root");
        }
        else if(unaryOprator === "sqre"){
            operand2=operand2**2;
            console.log("i am inner of square");
        }
        else if(unaryOprator === "fraction"){
            operand2=1/operand2;
            console.log("i am inner of fraction");
        }
        currentDisplay();
        return;
    }
    return;
}

/********************************************  decimal (.) operator ******************************************************************/

//   decimal fuction analysis and get crt output..  #####finished
function decimalFunction(decimal){
    evaluteZero(); 
    decimalFlag=true;
    //choose operand1 
    if(operand1===""){
        operand1=0+".";
    }
    else if(operand1!=="" && operator ==="" && !(isFloat(operand1))){
        operand1=operand1+".";
    }
    //choose operand2    
    else if(operator !=="" && operand2==="" ){
        operand2=0+".";
    }
    else if(operator !=="" && operand2!=="" && !(isFloat(operand2))){
        operand2=operand2+".";
    }
    currentDisplay();
    return;
}

function isFloat(number){
    return number % 1 !== 0;
}

/********************************************  evaluate (=) or equal     ******************************************************************/

/************ binary evaluate(=) function    *************/
function evaluateFunction(evaluate){
    if(operand1 === ""){
        operand1=0;
        alert("Invalid...! please give inputs...!");
    }
    else if(operand1 !== "" && operator !== "" && operand2 !==""){
        let parseOperand1 = parseFloat(operand1);
        let parseOperand2 = parseFloat(operand2);
        let answer= eval(parseOperand1 + operator + parseOperand2);
        console.log("Answer ",answer);
        
        operand1=answer;
        operand2="";
        operator="";
    }
    else if(operand1 !== "" && operator !== "" && operand2==="" ){
        operator="";
    }
    else if(eval(operand1) ===0){
        alert("Invalid...! please give inputs");
    }
    currentDisplay();
    return;
}

/********************************************  clear  or delete    ******************************************************************/

/********* clear one-by-one arguments  *************/
function clearFunction(clear){  
    if((operand1.length>0) && operand1 !== "" && operator ==="" ){
        operand1=operand1.slice(0,-1);
    }
    else if((operator.length>0) && operator !=="" && operand2 ===""){
        operator=operator.slice(0,-1);
    }
    else if((operand2.length>0) && operand1 !== "" && operator !=="" && operand2 !==""){
        operand2=operand2.slice(0,-1);
    } 

    if(operand1 === ""){
        operand1=0;
    }
    currentDisplay();
    return;
}

/********* clear everything and reset  *************/
function clearEverythingFunction(clearEverything){
    operand1=0;
    operand2="";
    operator="";
    answer="";
    currentDisplay();
    return;
}


/********************************************  button sounds     ******************************************************************/
/******  equal button sound  ****/
function evalButtonClick(){
    const audio1=new Audio();
    audio1.src="./click-sounds/equal-click.mp3";
    audio1.play();
    return;
}
let evalButton=document.getElementsByClassName("controls-evaluate-button")[0];
let evalButtonId=evalButton.addEventListener("click",evalButtonClick);

/****** digit and clear button sound  ****/
function ButtonClick(){
    const audio2=new Audio();
    audio2.src="./click-sounds/mouse-click.mp3";
    audio2.play();
    return;
}
/******  clear button sound  ****/
let clearButton=document.getElementsByClassName("clear-button");
let clearButtonId=clearButton[0].addEventListener("click",ButtonClick);
let clearButtonId2=clearButton[1].addEventListener("click",ButtonClick);

/******   digit button sounds *******/
// try to decrease the line of code...>>>>>>>addEventListerners
// maybe learn and  update in future...

// function digitSound(digitValue){
//     let digitBtn=document.getElementsByClassName("btn"+digitValue)[0];
//     let num=digitBtn.addEventListener("click",ButtonClick);
//     console.log("inner digit sound",typeof digitValue);
// }

/******   digit button sounds *******/
let digitBtn=document.getElementsByClassName("digits-button");
let num0=digitBtn[9].addEventListener("click",ButtonClick);
let num00=digitBtn[10].addEventListener("click",ButtonClick);
let num1=digitBtn[6].addEventListener("click",ButtonClick);
let num2=digitBtn[7].addEventListener("click",ButtonClick);
let num3=digitBtn[8].addEventListener("click",ButtonClick);
let num4=digitBtn[3].addEventListener("click",ButtonClick);
let num5=digitBtn[4].addEventListener("click",ButtonClick);
let num6=digitBtn[5].addEventListener("click",ButtonClick);
let num7=digitBtn[0].addEventListener("click",ButtonClick);
let num8=digitBtn[1].addEventListener("click",ButtonClick);
let num9=digitBtn[2].addEventListener("click",ButtonClick);
/********************************************/

/***************  operator click sound   ****************/
function OperatorClick(){
    const audio3=new Audio();
    audio3.src="./click-sounds/operator-click.mp3";
    audio3.play();
    return;
}
let opertorButton=document.getElementsByClassName("controls-button");
let modularBtn  =opertorButton[0].addEventListener("click",OperatorClick);
let sqtrBtn     =opertorButton[1].addEventListener("click",OperatorClick);
let sqreBtn     =opertorButton[2].addEventListener("click",OperatorClick);
let fractionBtn =opertorButton[3].addEventListener("click",OperatorClick);
let divideBtn   =opertorButton[4].addEventListener("click",OperatorClick);
let multiplyBtn =opertorButton[5].addEventListener("click",OperatorClick);
let minusBtn    =opertorButton[6].addEventListener("click",OperatorClick);
let plusBtn     =opertorButton[7].addEventListener("click",OperatorClick);
let decimalBtn  =opertorButton[8].addEventListener("click",OperatorClick);


/********************************************************/
/****************** Theme  **************/
function ThemeClick(){
    const audio4=new Audio();
    audio4.src="./click-sounds/theme-button.mp3";
    audio4.play();
    return;
}
let themeButton=document.getElementsByClassName("theme-button")[0];
let themebtn  =themeButton.addEventListener("click",ThemeClick);
