let firstOperand = '',  // first operand
    secondOperand = '', // second operand
    sign = '',          // sign
    finish = false;     // calculation completed or not

const arrOfDigits = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const arrOfDigitsSecond = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9'];
const arrOfSigns = ['-', '+', 'X', '/', '%'];

const resultElement = document.querySelector('.calc-screen p');

let clearAll = () => {
    firstOperand = '';
    secondOperand = '';
    sign = '';
    finish = false;
    resultElement.textContent = '';
}

// the button 'ac' was pressed
document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    // the button wasn't pressed
    if (!event.target.classList.contains('btn')) {
        return;
    }
    // the button 'ac' was pressed
    if (event.target.classList.contains('ac')) {
        return;
    }

    // get pressed button
    const key = event.target.textContent;

    // number limit "0" in front of number
    if (firstOperand === '0' && arrOfDigitsSecond.includes(key)) {
        firstOperand = '';
    }
    if (secondOperand === '0' && arrOfDigitsSecond.includes(key)) {
        secondOperand = '';
    }
    // if the button is a number or '.'
    if (arrOfDigits.includes(key)) {
        // enter the first value
        if (secondOperand === '' && sign === '') {
            firstOperand += key;
            resultElement.textContent = firstOperand;
        } // enter the second value (if the result is calculated)
          else if (firstOperand !== '' && secondOperand !== '' && finish) {
          secondOperand = key;
          finish = false;
          resultElement.textContent = secondOperand;
        } // enter the second value (if the result isn't calculated)
          else {
            secondOperand += key;
            resultElement.textContent = secondOperand;
        }
        console.log(firstOperand, secondOperand, sign);
        return;
    }
    // if the button is a sign
    if (arrOfSigns.includes(key)) {
        sign = key;
        console.log(firstOperand, secondOperand, sign);
        resultElement.textContent = sign;
        return;
    }
    // if the button is a '+/-'
    if (key === '+/-') {
        // if the first value is '0' or '-0'
        if (firstOperand === '0' || firstOperand === '-0') {
            firstOperand = resultElement.textContent;
            if (firstOperand === '0') {
                firstOperand = '-0';
                resultElement.textContent = firstOperand;
            } else if (firstOperand === '-0') {
                firstOperand = '0'
                resultElement.textContent = firstOperand;
            }
            resultElement.textContent = firstOperand;
            return;
        } // if the first value is any number
          else if (firstOperand !== '' && secondOperand === '') {
            firstOperand = -firstOperand;
            resultElement.textContent = firstOperand;
            return;
        } // if the second value is '0' or '-0'
          else if (secondOperand === '0' || secondOperand === '-0') {
            secondOperand = resultElement.textContent;
            if (secondOperand === '0') {
                secondOperand = '-0';
                resultElement.text = secondOperand;
            } else if (secondOperand === '-0') {
                secondOperand = '0';
                resultElement.textContent = secondOperand;
            }
            resultElement.textContent = secondOperand;
            return;
        } // if the second value is any number
          else if (secondOperand !== '' && firstOperand !== ''){
            secondOperand = -secondOperand;
            resultElement.textContent = secondOperand;
            return;
        }
    }
    // if the button is a '='
    if (key === '=') {
        // press equal after the operator
        if (secondOperand === '') {
            secondOperand = firstOperand;
        }
        switch (sign) {
            case '+':
                firstOperand = +firstOperand + +secondOperand;
                break;
            case '-':
                firstOperand = firstOperand - secondOperand;
                break;
            case 'X':
                firstOperand = firstOperand * secondOperand;
                break;
            case '/':
                if (secondOperand === '0') {
                    resultElement.textContent = 'Error';
                    firstOperand = '';
                    secondOperand = '';
                    sign = '';
                    return;
                }
                firstOperand = firstOperand / secondOperand;
                break;
            case '%':
                firstOperand = firstOperand * (secondOperand / 100);
                break;
        }
        finish = true;
        resultElement.textContent = firstOperand;
    }
}