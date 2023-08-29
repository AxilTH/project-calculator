let firstOperand = '',
    secondOperand = '',
    sign = '',
    finish = false;

const arrOfDigits = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const arrOfSigns = ['-', '+', 'X', '/'];

const resultElement = document.querySelector('.calc-screen p');

let clearAll = () => {
    firstOperand = '';
    secondOperand = '';
    sign = '';
    finish = false;
    resultElement.textContent = '0';
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    if (!event.target.classList.contains('btn')) {
        return;
    }
    if (event.target.classList.contains('ac')) {
        return;
    }

    const key = event.target.textContent;

    if (arrOfDigits.includes(key)) {
        if (secondOperand === '' && sign === '') {
            firstOperand += key;
            resultElement.textContent = firstOperand;
        } else if (firstOperand !== '' && secondOperand !== '' && finish) {
          secondOperand = key;
          finish = false;
          resultElement.textContent = secondOperand;
        } else {
            secondOperand += key;
            resultElement.textContent = secondOperand;
        }
        console.log(firstOperand, secondOperand, sign);
        return;
    }

    if (arrOfSigns.includes(key)) {
        sign = key;
        console.log(firstOperand, secondOperand, sign);
        resultElement.textContent = sign;
    }

    if (key === '=') {
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
        }
        finish = true;
        resultElement.textContent = firstOperand;
    }
}