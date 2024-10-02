const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButtons = document.querySelector('[data-equals]');
const deleteButtons = document.querySelector('[data-delete]');
const allClearButtons = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')



class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return

        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return
        if (this.currentOperand !== "") {
            this.compute()
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = ""
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case "+":
                computation = prev + current;
                break
            case "-":
                computation = prev - current;
                break
            case "*":
                computation = prev * current;
                break
            case "/":
                computation = prev / current;
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ""
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        }
    }
}



const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerText)
        calculator.updateDisplay()
    })
})


operationButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerText)
        calculator.updateDisplay()
    })
})

equalsButtons.addEventListener("click", btn => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButtons.addEventListener("click", btn => {
    calculator.clear()
    calculator.updateDisplay()
})


deleteButtons.addEventListener("click", btn => {
    calculator.delete()
    calculator.updateDisplay()
})