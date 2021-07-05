var expr = new Array()

var numbool = true
var number = ''
var exprindex = 0
var dot = true
var minus = false
var minuscount = 0
var minusbool = true
var opbool = false
var plusbool = false
var crossbool = false
var divbool = false
var powbool = false
var factbool = false
var rootbool = true
var closePar = false

var minusdouble = 0
var ans = 0
var allowNum = true

var disp = document.getElementById('input')

/* --------------------------------------------------------------------------------------------------------------- */

function display(inp) {

    if (inp == '=') {
        if (number != '') {
            if (minus == true && expr[exprindex - 1] != '√' && expr[exprindex - 1] != '∛') { number *= -1 }
            expr[exprindex] = Number(number)
        }
    }
    else if (inp == '-' && (number == '' || expr[exprindex - 1] == '+' || expr[exprindex - 1] == '*' || expr[exprindex - 1] == '/' || expr[exprindex - 1] == '^')) {
        minus = true
        if (expr[exprindex - 1] == '√') { minus = false }
    }

    /* to let only one decimal point for every number */
    if ((inp == '.' && dot == false)) {
        return false
    }
    else if (inp == 'fans') {
        expr[exprindex] = Number(ans)
        exprindex++
        opbool = true
        plusbool = true
        minusbool = true
        crossbool = true
        divbool = true
        powbool = true
        factbool = true
        return false
    }

    /* check if input is real number */
    if (Number.isInteger(inp) == true || inp == '.') {
        numbool = true
        /* to stop next decimal point */
        if (inp == '.') {
            dot = false
        }
    }
    /* check if input is operator */
    else if (inp == '+' || inp == '-' || inp == '*' || inp == '/' || inp == '^' || inp == '√' || inp == '∛' || inp == '!') {
        numbool = false
    }
    /* check if input is trigonometric function */
    else if (inp == 'sin' || inp == 'cos' || inp == 'tan' || inp == 'sinh' || inp == 'cosh' || inp == 'tanh' || inp == 'log' || inp == 'ln') {
        numbool = false
    }
    else if (inp == '(') {
        if (number != '') {
            expr[exprindex] = Number(number)
            exprindex++
            number = ''
        }
        expr[exprindex] = inp
        exprindex++
        disp.value = disp.value + inp
        return false
    }
    else if (inp == ')') {
        if (number != '') {
            if (minus == true) {
                number = number * -1
            }
            expr[exprindex] = Number(number)
            exprindex++
            number = ''
        }
        expr[exprindex] = inp
        exprindex++
        disp.value = disp.value + inp
        allowNum = false
        return false
    }


    if (inp == '-' && (expr[exprindex - 1] == ')' || expr[exprindex - 1] == '!')) {
        expr[exprindex] = '-'
        exprindex++
        disp.value = disp.value + inp
        numbool = true
        minus = false
        return false
    }
    /* ----------------------------------------------------------------------------------------------------------- */

    /* after number is accessed, permission for operator entry is given */
    if (numbool == true && inp != '=') {
        number = number + inp
        opbool = true
        plusbool = true
        minusbool = true
        crossbool = true
        divbool = true
        powbool = true
        factbool = true

        minus = false
        minuscount = 0
        disp.value = disp.value + inp
    }

    else if (numbool == false) {
        /* to enter a negative value at the beginning of the expression; -4+2 */
        if (minuscount <= 1 && inp == '-') {
            minuscount++
            if (expr[exprindex - 1] != '√' && expr[exprindex - 1] != '∛') {
                disp.value = disp.value + inp
            }
            if (expr[exprindex - 1] == '√' && number != '') {
                disp.value = disp.value + inp
            }
            if (minuscount == 2)
                minusdouble = 2
            if (number != '') {
                /* 1+-2 ==> [1, '+', -2] and does not allow - within roots*/
                if (minusdouble == 2 && expr[exprindex - 1] != '√' && expr[exprindex - 1] != '∛') {
                    number *= -1
                    minusdouble = 0
                }

                expr[exprindex] = Number(number)
                exprindex++
                minus = false
                expr[exprindex] = inp
                exprindex++
            }
        }
        /* to enter ! symbol only after a number, not after an operator */
        else if (inp == '!' && factbool == true) {
            disp.value = disp.value + inp
            if (number != '') {
                if (minusdouble == 2 && expr[exprindex - 1] != '√' && expr[exprindex - 1] != '∛') { number *= -1 }
                expr[exprindex] = Number(number)
                exprindex++
            }
            expr[exprindex] = '!'
            exprindex++
        }
        else if (inp == '√' || inp == '∛') {
            disp.value = disp.value + inp
            if (number != '') {
                expr[exprindex] = Number(number)
                exprindex++
            }
            expr[exprindex] = inp
            exprindex++

        }
        else if (inp == 'sin' || inp == 'cos' || inp == 'tan' || inp == 'sinh' || inp == 'cosh' || inp == 'tanh' || inp == 'log' || inp == 'ln') {
            disp.value = disp.value + inp + '('
            if (number != '') {
                expr[exprindex] = Number(number)
                exprindex++
            }
            expr[exprindex] = inp
            exprindex++
            expr[exprindex] = '('
            exprindex++
            minuscount = 0
        }

        /* when operator is pressed the number and the operator is entered into the array */
        else if (opbool == true && inp != '=') {
            if (minusdouble == 2 && expr[exprindex - 1] != '√' && expr[exprindex - 1] != '∛') {
                number *= -1
            }

            if (number != '') {
                expr[exprindex] = Number(number)
                exprindex++
            }
            minus = false
            expr[exprindex] = inp
            exprindex++
            disp.value = disp.value + inp
            allowNum = true
            minuscount++
        }

        /* ------------------------------------------------------------------------------------------------------- */

        /* check if an operator is entered and to avoid another operator entry */
        if (inp == '+' && plusbool == true) {
            opbool = false
            plusbool = false
            factbool = false
        }
        else if (inp == '-' && minusbool == true) {
            opbool = false
            minusbool = false
            factbool = false
        }
        else if (inp == '*' && crossbool == true) {
            opbool = false
            crossbool = false
            factbool = false
        }
        else if (inp == '/' && divbool == true) {
            opbool = false
            divbool = false
            factbool = false
        }
        else if (inp == '^' && powbool == true) {
            opbool = false
            powbool = false
            factbool = false
        }
        number = ''
        dot = true
        numbool = true
    }
}

/* --------------------------------------------------------------------------------------------------------------- */

function calculate() {
    for (let i = 0; i < expr.length; i++) {
        if ((expr[i] == '√' || expr[i] == '∛' || expr[i] == '(') && (Number.isFinite(expr[i - 1]) || expr[i - 1] == '!' || expr[i - 1] == ')')) {
            for (let j = expr.length; j >= i + 1; j--) {
                expr[j] = expr[j - 1]
            }
            expr[i] = '*'
        }

        else if ((expr[i] == ')' || expr[i] == '!') && (Number.isFinite(expr[i + 1]) || expr[i + 1] == '√' || expr[i + 1] == '∛' || expr[i + 1] == 'sin' || expr[i + 1] == 'cos' || expr[i + 1] == 'tan' || expr[i + 1] == 'sinh' || expr[i + 1] == 'cosh' || expr[i + 1] == 'tanh' || expr[i + 1] == 'log' || expr[i + 1] == 'ln')) {
            for (let j = expr.length; j >= i + 1; j--) {
                expr[j] = expr[j - 1]
            }
            expr[i + 1] = '*'
        }

        else if ((expr[i] == 'sin' || expr[i] == 'cos' || expr[i] == 'tan' || expr[i] == 'sinh' || expr[i] == 'cosh' || expr[i] == 'tanh' || expr[i] == 'log' || expr[i] == 'ln') && Number.isFinite(expr[i - 1])) {
            for (let j = expr.length; j >= i + 1; j--) {
                expr[j] = expr[j - 1]
            }
            expr[i] = '*'
        }
    }
    var left = 0
    var right = 0
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] == '(') {
            left++
        }
        else if (expr[i] == ')') {
            right++
        }
    }
    if (left != right) {
        disp.value = 'Invalid Input'
        document.getElementById('message_content').value = ''
        return false
    }
    expr.unshift('(');
    expr[expr.length] = ')'

    var open, close

    for (var i = 0; i <= expr.length; i++) {
        for (var oc = 0; oc < expr.length; oc++) {
            if (expr[oc] == ')') {
                close = oc
                break
            }
            else {
                close = 0
            }
        }
        for (var j = oc; j >= 0; j--) {
            if (expr[j] == '(') {
                open = j
                break
            }
            else {
                open = 0
            }
        }

        var res
        for (var z = open + 1; z < close; z++) {
            if (expr[z] == '!') {
                res = factorial(expr[z - 1])
                expr.splice(z - 1, 2, res)
                z = z - 1
                close = close - 1
            }
        }
        for (let z = close - 1; z >= open + 1; z--) {
            if (expr[z] == '√') {
                res = Math.sqrt(expr[z + 1])
                expr.splice(z, 2, res)
                close = close - 1
            }
            else if (expr[z] == '∛') {
                res = Math.cbrt(expr[z + 1])
                expr.splice(z, 2, res)
                close = close - 1
            }
        }

        for (var z = open + 1; z < close; z++) {
            if (expr[z] == "sin") {
                res = Math.sin(expr[z + 1])
                expr.splice(z, 2, res)
                close = close - 1
            }
            else if (expr[z] == "cos") {
                res = Math.cos(expr[z + 1])
                expr.splice(z, 2, res)
                close = close - 1
            }
            else if (expr[z] == "tan") {
                res = Math.tan(expr[z + 1])
                expr.splice(z, 2, res)
                close = close - 1
            }
            else if (expr[z] == "sinh") {
                res = Math.sinh(expr[z + 1])
                expr.splice(z, 2, res)
                close = close - 1
            }
            else if (expr[z] == "cosh") {
                res = Math.cosh(expr[z + 1])
                expr.splice(z, 2, res)
                close = close - 1
            }
            else if (expr[z] == "tanh") {
                res = Math.tanh(expr[z + 1])
                expr.splice(z, 2, res)
                close = close - 1
            }
            else if (expr[z] == "log") {
                res = Math.log10(expr[z + 1])
                expr.splice(z, 2, res)
                close = close - 1
            }
            else if (expr[z] == "ln") {
                res = Math.log(expr[z + 1])
                expr.splice(z, 2, res)
                close = close - 1
            }
        }

        for (var z = open + 1; z < close; z++) {
            if (expr[z] == '^') {
                res = Math.pow(expr[z - 1], expr[z + 1])
                expr.splice(z - 1, 3, res)
                close = close - 2
            }
        }

        for (var z = open + 1; z < close; z++) {
            for (var z = open + 1; z < close; z++) {
                if (expr[z] == '/') {
                    res = (expr[z - 1] / expr[z + 1])
                    expr.splice(z - 1, 3, res)
                    close = close - 2
                    break
                }
                if (expr[z] == '*') {
                    res = (expr[z - 1] * expr[z + 1])
                    expr.splice(z - 1, 3, res)
                    close = close - 2
                    break
                }
            }
        }

        for (var z = open + 1; z < close; z++) {
            for (var z = open + 1; z < close; z++) {
                if (expr[z] == '+') {
                    res = (expr[z - 1] + expr[z + 1])
                    expr.splice(z - 1, 3, res)
                    close = close - 2
                    break
                }
                if (expr[z] == '-') {
                    res = (expr[z - 1] - expr[z + 1])
                    expr.splice(z - 1, 3, res)
                    close = close - 2
                    break
                }
            }
        }

        /* ['(', 21, ')'] = [21] */
        if (open == close - 2) {
            if (Math.sign(expr[open + 1]) == -1 && expr[close + 1] == '!') {
                disp.value = 'Invalid Input'
                return false
            }
            expr.splice(open, 3, expr[open + 1])
        }
    }

    if (Number.isFinite(expr[0])) {
        document.getElementById("message_content").value = disp.value
        disp.value = expr
        disp.disabled = "disabled"
        ans = expr[0]
        expr[0] = ''
        exprindex = 0
        number = ans.toString()
    }
    else {
        disp.value = "Invalid Input"
    }
    minus = false
}

/* --------------------------------------------------------------------------------------------------------------- */

function factorial(n) {
    f = 1
    for (let i = 2; i <= Math.abs(n); i++) {
        f = f * i
    }
    if (Math.sign(n) >= 0)
        return f
    else if (Math.sign(n) == -1)
        return -1 * f
}

/* --------------------------------------------------------------------------------------------------------------- */

function storeAnswer() {
    disp.value = disp.value + ans
}
/* --------------------------------------------------------------------------------------------------------------- */

function back() {
    var ele = disp.value
    var len = ele.length

    if (ele.slice(-3) == 'ln(') {
        disp.value = ele.slice(0, len - 3)
        expr[exprindex - 1] = ''
        exprindex--
    }
    else if (ele.slice(-4) == 'sin(' || ele.slice(-4) == 'cos(' || ele.slice(-4) == 'tan(' || ele.slice(-4) == 'log(') {
        disp.value = ele.slice(0, len - 4)
        expr[exprindex - 1] = ''
        exprindex--
    }
    else if (ele.slice(-5) == 'sinh(' || ele.slice(-5) == 'cosh(' || ele.slice(-5) == 'tanh(') {
        disp.value = ele.slice(0, len - 5)
        expr[exprindex - 1] = ''
        exprindex--
    }
    else if ((ele[len - 1] > 0 && ele[len - 1] < 9) || ele[len - 1] == '.') {
        disp.value = ele.slice(0, len - 1)
        var temp = number.toString()
        temp = temp.slice(0, temp.length - 1)
        number = temp
        if ((expr[exprindex - 1] == '(' || expr[exprindex - 1] == '+' || expr[exprindex - 1] == '-' || expr[exprindex - 1] == '*' || expr[exprindex - 1] == '/' || expr[exprindex - 1] == '^' || expr[exprindex - 1] == '√' || expr[exprindex - 1] == '∛') && number == '') {
            opbool = false
            plusbool = false
            minusbool = false
            crossbool = false
            divbool = false
            powbool = false
            factbool = false
        }
    }
    else if (ele.slice(-1) == '+' || ele.slice(-1) == '*' || ele.slice(-1) == '/' || ele.slice(-1) == '^') {
        disp.value = ele.slice(0, len - 1)
        if (Number.isFinite(expr[exprindex - 2])) {
            var temp = expr[exprindex - 2]
            number = temp.toString()
            expr[exprindex - 2] = ''
            exprindex--
        }
        expr[exprindex - 1] = ''
        exprindex--
        opbool = true
        plusbool = true
        minusbool = true
        crossbool = true
        divbool = true
        powbool = true
        factbool = true
    }
    else if (ele.slice(-1) == '√' || ele.slice(-1) == '∛' || ele.slice(-1) == '!' || ele.slice(-1) == '(' || ele.slice(-1) == ')') {
        disp.value = ele.slice(0, len - 1)
        if (Number.isFinite(expr[exprindex - 2])) {
            var temp = expr[exprindex - 2]
            number = temp.toString()
            expr[exprindex - 2] = ''
            exprindex--
        }
        expr[exprindex - 1] = ''
        exprindex--
    }

    else if (ele.slice(-1) == '-') {
        disp.value = ele.slice(0, len - 1)
        if (expr[exprindex - 1] == '*') {
            number = ''
            minus = false
        }
        else {
            if (Number.isFinite(expr[exprindex - 2])) {
                var temp = expr[exprindex - 2]
                number = temp.toString()
                expr[exprindex - 2] = ''
                exprindex--
            }
            expr[exprindex - 1] = ''
            exprindex--
        }
        minuscount--
        opbool = true
        plusbool = true
        minusbool = true
        crossbool = true
        divbool = true
        powbool = true
        factbool = true
    }
    allowNum = false
}

/* --------------------------------------------------------------------------------------------------------------- */

function clearInput() {
    disp.value = ''
    document.getElementById('message_content').value = ''
    number = ''
    expr = []
    exprindex = 0
}