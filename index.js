const calculator = {
  valueDisplay:'0',
  operation:[]
}; 

// update the screen values
function output() {
  const val = document.querySelector('.calculator-output');
  val.value = calculator.valueDisplay;
}
output();

// display values and the operation array
const keys = document.querySelector('.calculator-container');
let operand;
keys.addEventListener('click',(event)=> {
  if(event.target.className === 'operator') {
    if(calculator.operation.length === 1) {
      calculator.operation.push(event.target.value); 
    }
    if(operand) {
      calculator.operation.push(operand);
      calculator.operation.push(event.target.value);
    }
    operand = null; 
    document.querySelector('.calculator-history').value += event.target.value
  }else if (event.target.className === 'equal') {
      if(operand) {
        calculator.operation.push(operand);
      }
      operand = null;
      document.querySelector('.calculator-history').value = calculator.operation.join("")
      calculator.valueDisplay = calc(calculator.operation);
      output();
      calculator.operation = [calculator.valueDisplay];
  }
  else if (event.target.className ==='number') { 
    if(operand) {
      operand += event.target.value;
    }else {
      operand = event.target.value;
    }
    calculator.valueDisplay = operand;
    output(); 
    document.querySelector('.calculator-history').value += event.target.value
  }
  else if(event.target.className === 'clear'){
    document.querySelector('.calculator-history').value = ""
    operand = "";
    calculator.valueDisplay = '0';
    calculator.operation = [];
    output();   
  } 
});

//  basic operator functions 
function add(num1,num2){
  return num1 + num2
}
function substract(num1,num2){
  return num1 - num2
}
function multiply(num1,num2){
  return num1 * num2
}
function divide(num1,num2){
  if (num2 == 0){
    document.querySelector(".clear").click()
    alert ("you cannot divide by zero, please click clear and retry your calculation!")
  }
  else{
    return num1 / num2
  }
}
function operate(op,num1,num2){
  return op(num1,num2)
}


// calculation function
function calc(arr) {
  let result;
  for(let i=0; i<arr.length; i++) {
    if(arr[i]==='*') {
      if(arr.indexOf('*')<arr.indexOf('/') || arr.indexOf('/') === -1 ) {
        result = operate(multiply,arr[i-1],arr[i+1]);
        arr.splice(i-1,3,result)
        i--
      }else {
        let a = arr.indexOf('/');
        result = operate(divide,arr[a-1],arr[a+1]);
        arr.splice(a-1,3,result);
        i = a - 1
      }
    }
  } 
  for(let i=0; i<arr.length;i++) {
    if(arr[i]==='/'||arr[i]==='*') {
      if(arr.indexOf('/')<arr.indexOf('*')|| arr.indexOf('*') === -1 ) {
        result = operate(divide,arr[i-1],arr[i+1]);
        arr.splice(i-1,3,result);
        i-- 
      }else {
        let a = arr.indexOf('*');
        result = operate(multiply,arr[a-1],arr[a+1]);
        arr.splice(a-1,3,result)
        i= a - 1
      }
    }
  }
  for(let i=0; i<arr.length; i++){
    if(arr[i]==='+'){
      if(arr.indexOf('+')<arr.indexOf('-') || arr.indexOf("-") === -1 ) {
        result = operate(add,Number(arr[i-1]),Number(arr[i+1]));
        arr.splice(i-1,3,result)
        i--
      }else {
        let x = arr.indexOf('-');
        result = operate(substract,arr[x-1],arr[x+1]);
        arr.splice(x-1,3,result)
        i=x-1
      }
    }
  }
  for(let i=0; i<arr.length; i++) {
    if(arr[i]==='-'||arr[i]==='+'){
      if(arr.indexOf('-')<arr.indexOf('+') || arr.indexOf('+') === -1) {
      result = operate(substract,arr[i-1],arr[i+1]);
      arr.splice(i-1,3,result)
      } else {
        let a = arr.indexOf('*');
        result =operate(add,arr[a-1],arr[a+1]);
        arr.splice(a-1,3,result);
        i = a-1
      }
    }
  }
  return Number((arr.join('')));
}


//  converting curency
document.querySelector("#convert-bt1").addEventListener("click", function shekelsToDollars(x) {
  x = calculator.valueDisplay
  
  calculator.valueDisplay = x*0.30
  output()
  calculator.valueDisplay = "0"
  document.querySelector('.calculator-history').value = `${x} Shekels = ${x*0.30} Dollars`
  
})
document.querySelector("#convert-bt2").addEventListener("click", function dollarsToShekels(x) {
  x = calculator.valueDisplay
  calculator.valueDisplay = x*3.30
  output()
  document.querySelector('.calculator-history').value = `${x} Dollars = ${x*3.30} Shekels`
})
document.querySelector("#convert-bt3").addEventListener("click", function shekelsToEuros(x) {
  x = calculator.valueDisplay
  calculator.valueDisplay = x*.25
  output()
  document.querySelector('.calculator-history').value = `${x} Shekels = ${x*.25} Euros`
})
document.querySelector("#convert-bt4").addEventListener("click", function eurosToShekels(x) {
  x = calculator.valueDisplay
  calculator.valueDisplay = x*3.94
  output()
  document.querySelector('.calculator-history').value = `${x} Euros = ${x*3.94} Shekels`
})



