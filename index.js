// ----------------
// Global Variables
// ----------------

let first = ''  
let second = ''   
let op = ''    
let appendInFirst = true    
let opFirst = ''
let deletedOP = false
let deletedOPf = false

const numButtons = document.querySelectorAll('[data-number]')
const opButtons = document.querySelectorAll('[data-operator]')
const dot = document.querySelector('[data-dot]')
const equalButton = document.getElementById('equal')
const clearButton = document.getElementById('AC')
const delButton = document.getElementById('C')

//const resultCont = document.getElementById('res')
const inter = document.getElementById('inter')

// ----------------
// Functions
// ----------------

function appendNum(value) {
    let checkDot = false
    if(value === '.') {
        checkDot = true
    }
    if (appendInFirst) {
        if(checkDot) {
            if(first.includes('.')) {
                return
            } else {
                first += value
            }
        } else {
            first += value
        }
    }
    else {
        if(checkDot) {
            if(second.includes('.')) {
                return
            } else {
                second += value
            }
        } else {
            second += value
        }
    }
    inter.textContent += value
}

function appendOP(value) {
    if(deletedOPf) {
        opFirst = value
        inter.textContent += value
        deletedOPf = false
        return
    }
    if(deletedOP) {
        op = value
        inter.textContent += value
        deletedOP = false
        return
    }
    if(appendInFirst) {
        appendInFirst = false
        opFirst = value
    }
    else {
        op = value
        evaluate()
    }
    inter.textContent += value
}

function evaluate() {
    switch(opFirst) {
        case '+':
            sumFunc()
            break
        case '-':
            subFunc()
            break
        case '*':
            mulFunc()
            break
        case '/':
            divFunc()
            break  
        case '%':
            modFunc()
            break
    }
    opFirst = op
    inter.textContent = first
    //resultCont.textContent = first
}

function sumFunc() {
    let f 
    let s 
    if(first.toString().includes('.')) {
        f = parseFloat(first)
    } else {
        f = parseInt(first)
    }
    if(second.toString().includes('.')) {
        s = parseFloat(second)
    } else {
        s = parseInt(second)
    }

    //res = parseInt(first) + parseInt(second)
    res = f + s
    res = roundResult(res)
    second = ''
    first = res
}

function subFunc() {
    let f 
    let s 
    if(first.toString().includes('.')) {
        f = parseFloat(first)
    } else {
        f = parseInt(first)
    }
    if(second.toString().includes('.')) {
        s = parseFloat(second)
    } else {
        s = parseInt(second)
    }

    res = f - s
    res = roundResult(res)
    second = ''
    first = res
}

function mulFunc() {
    let f 
    let s 
    if(first.toString().includes('.')) {
        f = parseFloat(first)
    } else {
        f = parseInt(first)
    }
    if(second.toString().includes('.')) {
        s = parseFloat(second)
    } else {
        s = parseInt(second)
    }

    res = f * s
    res = roundResult(res)
    second = ''
    first = res
}

function modFunc() {
    let f 
    let s 
    if(first.toString().includes('.')) {
        f = parseFloat(first)
    } else {
        f = parseInt(first)
    }
    if(second.toString().includes('.')) {
        s = parseFloat(second)
    } else {
        s = parseInt(second)
    }

    res = f % s
    res = roundResult(res)
    second = ''
    first = res
}

function divFunc() {
    let f 
    let s 
    let zeroFlag = false
    if(first.toString().includes('.')) {
        f = parseFloat(first)
    } else {
        f = parseInt(first)
    }
    if(second.toString().includes('.')) {
        s = parseFloat(second)
        if(s === 0.0) zeroFlag = true
    } else {
        s = parseInt(second)
        if (s === 0) zeroFlag = true
    }


    if(zeroFlag) { 
        first = 'No.'
        numButtons.forEach((button) => {
            button.disabled = true
        })
        
        opButtons.forEach((button) =>{
            button.disabled = true
        })
        delButton.disabled = true
    
        dot.disabled = true
    
        equalButton.disabled = true
        return
    }
    res = f / s
    res = roundResult(res)
    second = ''
    first = res
}

function clearFunc() {
    first = ''
    second = ''
    op = ''
    appendInFirst = true
    opFirst = ''

    inter.textContent = ''
    //resultCont.textContent = ''

    numButtons.forEach((button) => {
        button.disabled = false
    })
    
    opButtons.forEach((button) =>{
        button.disabled = false
    })
    delButton.disabled = false

    dot.disabled = false

    equalButton.disabled = false
}

function delFunc() {
    let lastChar = inter.textContent.charAt(inter.textContent.length - 1);
    if(first[first.length-1] === lastChar) {
        first = first.slice(0, -1)
        inter.textContent = inter.textContent.slice(0, -1)
    } else if(second[second.length-1] === lastChar) {
        second = second.slice(0, -1)
        inter.textContent = inter.textContent.slice(0, -1)
    } else if(op[op.length-1] === lastChar) {
        deletedOP = true
        op = op.slice(0, -1)
        inter.textContent = inter.textContent.slice(0, -1)
    } else if(opFirst[opFirst.length-1] === lastChar) {
        deletedOPf = true
        opFirst = opFirst.slice(0, -1)
        inter.textContent = inter.textContent.slice(0, -1)
    }
}

function equalFunc() {
    evaluate()
    //resultCont.textContent = first
    numButtons.forEach((button) => {
        button.disabled = true
    })
    
    opButtons.forEach((button) =>{
        button.disabled = true
    })
    delButton.disabled = true

    dot.disabled = true

    equalButton.disabled = true
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

// ----------------
// Event Listeners
// ----------------

numButtons.forEach((button) => {
    button.addEventListener('click', () => appendNum(button.textContent))
})

opButtons.forEach((button) =>{
    button.addEventListener('click', () => appendOP(button.textContent))
})

clearButton.addEventListener('click', clearFunc)

delButton.addEventListener('click', delFunc)

dot.addEventListener('click', () => appendNum(dot.textContent))

equalButton.addEventListener('click', equalFunc)