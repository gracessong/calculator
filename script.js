//Mathematical functions//
function add(x,y) {
    return sum = x+y;
}

function subtract(x,y) {
    return difference = x-y;
}

function multiply(x,y) {
    return product = Math.round(x*y * 100)/100;
}

function divide(x,y) {
    if (y === 0) result = 'Nope';
    else result = Math.round(x/y * 100)/100;
    return result
}

function calculate(operatorFunc, x, y) {
    return operatorFunc(x,y)
}

//NUMERIC BUTTONS//
//listen for 'click', access the value of the button clicked, and display in the display-container//
//numbers should be able to be concatenated if desired//
const display = document.querySelector('#display-container')
const buttonsNum = Array.from(document.querySelectorAll('button.input'));

buttonsNum.forEach(button => button.addEventListener('click', inputNumber));

function inputNumber() {
    clearResult();
    const numInput = this.textContent;
    const addNum = document.createElement('p');
    addNum.textContent = `${numInput}`;
    addNum.classList.add('number');
    display.appendChild(addNum);
}

//CLEAR BUTTON//
//listen for 'click', clear the display, initialize running result to zero and empty out the twoNumbers array//
const buttonClear = document.querySelector('button.clear');
buttonClear.addEventListener('click', () => {
    while (display.hasChildNodes()) display.removeChild(display.firstChild);
    runningResult = 0;
    twoNumbers.splice(0, twoNumbers.length);
    previousOperater = undefined;
});

//+/- BUTTON//
//listen for 'click', toggle a negative sign in front of the input number//
const buttonPlusMinus = document.querySelector('.plus-minus');
buttonPlusMinus.addEventListener('click', toggleNeg);

function toggleNeg() {
    const negSign = document.createElement('p');
    negSign.textContent='-';
    negSign.classList.add('negsign');
    if (display.firstChild.className === 'negsign') {
        display.removeChild(display.firstChild);
    } else {
    display.insertBefore(negSign, display.firstChild);
    }
}

//DELETE button//
//listen for 'click', remove the last digit from display//
const buttonDelete = document.querySelector('.delete');
buttonDelete.addEventListener('click', () => {
    display.removeChild(display.lastChild);
})

//'.' button//
//listen for 'click', add .//
const buttonDot = document.querySelector('.dot');
buttonDot.addEventListener('click', () => {
    const dot = document.createElement('p');
    dot.textContent = '.';
    display.appendChild(dot);
})

//for dealing with display

function clearDisplay() {
    while (display.hasChildNodes()) display.removeChild(display.firstChild);
}

function getNumber() {
    const displayChild = Array.from(display.querySelectorAll('.number'));
    const numValue = displayChild.map(child => child.textContent);
    const arrayToNum = numValue.reduce((previousNum, nextNum) => {
        return previousNum + nextNum;
    }, 0)
    return Number(arrayToNum)
}

function displayResult() {
    const addResult = document.createElement('p');
    addResult.textContent = `${runningResult}`;
    addResult.classList.add('result');
    display.appendChild(addResult);
}

function clearResult() {
    const result = display.querySelector('.result');
    if (result) result.remove();
}

//OPERATOR button//
//When operator button is clicked, save the number entered before the operator button in the array
//if this is the first operator clicked, then save the operator so that it can be executed when (=) clicked
//if this is the successive operator, then calculate the result using the previous operator and reassign the
//operator as the current operator clicked 
//also, when operator clicked, style changes (colors invert)

let twoNumbers = [];
let runningResult = 0;
let previousOperator;

function operatorClicked(currentOperator) {
    if (previousOperator === undefined) {
        previousOperator = currentOperator;
        twoNumbers.push(getNumber());
        return runningResult = twoNumbers[0];
    } else { 
        twoNumbers.push(getNumber()); 
        runningResult = calculate(previousOperator, twoNumbers[0], twoNumbers[1]);
        twoNumbers.splice(0, 2);
        twoNumbers.push(runningResult);
        previousOperator = currentOperator;
        return runningResult;
    }
}

function buttonInactive() {
    const activeButton = document.querySelectorAll('.active');
    if (activeButton.length > 0) {
        activeButton.forEach(button => button.classList.remove('active'));
    } 
}

//PLUS button//
const buttonPlus = document.querySelector('#add');

function whenOperatorClicked(operator) {
    operatorClicked(operator);
    clearDisplay();
    displayResult();
}

buttonPlus.addEventListener('click', function(e) {
    whenOperatorClicked(add)
    buttonInactive();
    e.target.classList.add('active')
})

//MINUS button//
const buttonMinus = document.querySelector('#subtract');
buttonMinus.addEventListener('click', function(e) {
    whenOperatorClicked(subtract)
    buttonInactive();
    e.target.classList.add('active')
})

//MULTIPLY button//
const buttonMultiply = document.querySelector('#multiply');
buttonMultiply.addEventListener('click', function(e) {
    whenOperatorClicked(multiply)
    buttonInactive();
    e.target.classList.add('active')
})

//DIVIDE button//
const buttonDivide = document.querySelector('#divide');
buttonDivide.addEventListener('click', function(e) {
    whenOperatorClicked(divide)
    buttonInactive();
    e.target.classList.add('active')
})

//EQUALS button//
const buttonEquals = document.querySelector('#equals');
buttonEquals.addEventListener('click', function(e) {
    buttonInactive();
    e.target.classList.add('active')
    twoNumbers.push(getNumber());
    runningResult = calculate(previousOperator, twoNumbers[0], twoNumbers[1]);
    clearDisplay();
    displayResult();
    twoNumbers.splice(0, 2);
    previousOperator = undefined;
    toggleClassResult();
});

function toggleClassResult() {
    const result = document.querySelector('.result');
    result.classList.remove('result')
    result.classList.add('number');
}

//footer - insert current year//
const footer = document.querySelector('#footer');
const currentYear = document.querySelector('#currentyear');
currentYear.textContent = `${(new Date().getFullYear())}`;
footer.appendChild(currentYear);