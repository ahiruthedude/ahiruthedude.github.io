document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('.button button');

    let currentOperand = '';
    let previousOperand = '';
    let currentOperator = null;

    function clearDisplay() {
        display.textContent = '0';
        currentOperand = '';
        previousOperand = '';
        currentOperator = null;
    }

    function appendNumber(number) {
        if (currentOperand === '0') {
            currentOperand = number;
        } else {
            currentOperand += number;
        }
        display.textContent = currentOperand;
    }

    function chooseOperator(operator) {
        if (currentOperator !== null) {
            calculate();
        }
        currentOperator = operator;
        previousOperand = currentOperand;
        currentOperand = '';
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (currentOperator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        display.textContent = result;
        currentOperand = result.toString();
        previousOperand = '';
        currentOperator = null;
    }

    function changeSign() {
        currentOperand = (parseFloat(currentOperand) * -1).toString();
        display.textContent = currentOperand;
    }

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;
            if (buttonText >= '0' && buttonText <= '9') {
                appendNumber(buttonText);
            } else if (buttonText === '.') {
                if (!currentOperand.includes('.')) {
                    currentOperand += buttonText;
                    display.textContent = currentOperand;
                }
            } else if (buttonText === '=') {
                calculate();
            } else if (buttonText === 'Clear') {
                clearDisplay();
            } else if (buttonText === '±') {
                changeSign();
            } else {
                chooseOperator(buttonText);
            }
        });
    });

    const pageSelect = document.getElementById('pageSelect');
    const calculatorContainer = document.getElementById('calculatorContainer');
    const gasPressure = document.getElementById('gasPressure');
    const gasPressureForm = document.getElementById('gasPressureForm');
    const pressureResult = document.getElementById('pressureResult');

    function togglePage() {
        const selectedPage = pageSelect.value;
        if (selectedPage === 'calculator') {
            calculatorContainer.style.display = 'block';
            gasPressure.style.display = 'none';
        } else if (selectedPage === 'gasPressure') {
            calculatorContainer.style.display = 'none';
            gasPressure.style.display = 'block';
        }
    }

    function calculateGasPressure(event) {
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        const volume = parseFloat(document.getElementById('volumeInput').value);
        const moles = parseFloat(document.getElementById('molesInput').value);
        const temperature = parseFloat(document.getElementById('temperatureInput').value);

        const pressure = (moles * 0.0821 * temperature) / volume; // Расчет давления газа

        pressureResult.textContent = `Pressure: ${pressure.toFixed(2)} atm`;
    }

    pageSelect.addEventListener('change', togglePage);
    togglePage();

    gasPressureForm.addEventListener('submit', calculateGasPressure);
});
