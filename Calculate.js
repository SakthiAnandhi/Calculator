var period
function display(num) {
    entry = document.getElementById("input")
    var len = entry.value.length
    console.log(num)


    if (entry.value == "" && (num == "+" /* || num == "-" */ || num == "!" || num == "*" || num == "/" || num == "^")) {
        entry.focus()
    }

    else if ((num == "+" || num == "-" || num == "!" || num == "*" || num == "/" || num == "^") && (entry.value[len - 1] == "+" || entry.value[len - 1] == "-" || entry.value[len - 1] == "*" || entry.value[len - 1] == "/" || entry.value[len - 1] == "^" || entry.value[len - 1] == '√')) {
        entry.focus()
    }
    else if (num == "." && period == true) {
        entry.focus()
    }
    else if (entry.value[len - 1] == "!" && num == "!") {
        entry.focus()
    }
    else if (num == ")") {
        entry.focus()
    }

    // mispacled paranthesis;  not getting misplaced check later

    //  decimal numbers

    /* else if (num == "(") {
        entry.value = entry.value + "("
        entry.focus()
        // var pos=--positionX
        entry.value = entry.value + ")"
    } */
    else if (num == "back") {
        var temp = entry.value
        if (temp[len - 1] == '.')
            period = false
        // console.log(temp[len - 2] + "-----------" + period)
        // console.log(temp.slice(0,len-1))
        entry.value = temp.slice(0, len - 1)

    }
    else {
        // console.log(period)
        if (num == ".") {
            period = true
        }
        entry.value = entry.value + num
        entry.focus()
        if (num == "+" || num == "-" || num == "!" || num == "*" || num == "/" || num == "^")
            period = false
    }

    /* var lp = 0
    var rp = 0;
    for (let i = 0; i < len; i++) {
        if (entry.value[i] == "(") {
            lp++
        }
        else if (entry.value[i] == ")") {
            rp++
        }
    }
    if (lp > rp)
        for (let i = 0; i < lp - rp; i++)
            entry.value = entry.value + ")"
    else if (rp > lp) {
        entry.style.color = "red"
    } */
}

function calculate() {
    ele = document.getElementById("input")
    val = ele.value
    period = false
    // console.log(val)
    var temp = ''
    var sum = 0
    var op
    var arr = new Array()
    var count = 0
    var flag = true
    var f1 = true
    var f2 = true
    // console.log("Length = " + val.length)
    for (let i = 0; i < val.length; i++) {
        // console.log(val[i] + "  ------>   " + typeof (val[i]))
        if (val[i] >= '0' && val[i] <= '9') {
            // temp = temp * 10 + (Number)(val[i])
            temp=temp+val[i]
            f2 = false
            // console.log(temp+"-----")
            // console.log(temp + " num temp " + typeof (temp))
        }
        else if (val[i] == '.') {
            if(val[i-1]>=0 && val[i-1]<=9)
            temp = temp + val[i]
            else
            temp='0'+val[i]
            
        }
        else {
            temp=Number(temp)
            if (val[i] == '√') {
                if (temp > 0) {
                    arr[count] = temp
                    count++
                }
                temp = val[i]
                arr[count] = temp
                count++
                temp = ''
                f2 = true
            }
            else if (val[i] == '!') {
                arr[count] = temp
                count++
                temp = val[i]
                arr[count] = temp
                count++
                temp = ''
                f1 = false
                f2 = true
            }
            else {
                if (f1 == true) {
                    arr[count] = temp
                    count++
                }
                temp = val[i]
// console.log(temp)
                arr[count] = temp
                // console.log(arr[count])
                temp = ''
                count++
                f1 = true
                f2 = true
            }
            // sum = temp
        }
    }
    if (f2 == false) {
        arr[count] = temp
    }
    temp=Number(temp)
    // console.log(temp+" ------ > "+typeof(temp))
    // console.log("expression" + arr + "----->" + arr.length)
    var l = arr.length
    /* If only a number a entered, display the number as result */
    if (l == 1)
        if (arr[0] == '√')
            flag = false
        else
            sum = arr[0]
    for (var i = 0; i < l; i++) {
        if (arr[i] == '√') {
            if (i != 0 && arr[i - 1] >= 0 && arr[i - 1] <= 9) {
                flag = false
            }
            else {
                sum = Math.sqrt(arr[i + 1])
                arr[i] = sum
                for (var j = i + 1; j < l; j++) {
                    arr[j] = arr[j + 1]
                }
            }
        }
    }
    for (var i = 0; i < l; i++) {
        // console.log(arr[i])
        if (arr[i + 1] == '!') {
            if (arr[i + 2] >= 0 && arr[i + 2] <= 9) {
                flag = false
            }
            else {
                sum = factorial(arr[i])
                arr[i] = sum
                for (var j = i + 1; j < l; j++) {
                    arr[j] = arr[j + 1]
                }
            }
        }
    }
    for (var i = 0; i < l; i++) {
        if (arr[i + 1] == "^") {
            sum = Math.pow(arr[i], arr[i + 2])
            arr[i] = sum
            for (var j = i + 1; j < l; j++) {
                arr[j] = arr[j + 2]
            }
        }
    }
    l = arr.length
    for (let count = 0; count < l; count++) {
        for (var i = 0; i < l; i++) {
            if (arr[i + 1] == '*') {
                sum = arr[i] * arr[i + 2]
                arr[i] = sum
                for (var j = i + 1; j < l; j++) {
                    arr[j] = arr[j + 2]
                }
            }
            i = -1
            l = l - 2
        }
        l = arr.length
        for (var i = 0; i < l; i++) {
            if (arr[i + 1] == '/') {
                sum = ((Number(arr[i])*10000000000) / (Number(arr[i + 2])*10000000000))
                arr[i] = sum
                for (var j = i + 1; j < l; j++) {
                    arr[j] = arr[j + 2]
                }
            }
            i = -1
            l = l - 2
        }
        l = arr.length
    }
    for (let count = 0; count < l; count++) {
        for (var i = 0; i < l; i++) {
            // console.log(arr[i]+" - "+arr[i+1]+" - "+arr[i+2])
            if (arr[i + 1] == '+') {
                sum = Number(arr[i]) + Number(arr[i + 2])
                arr[i] = sum
                for (var j = i + 1; j < l; j++) {
                    arr[j] = arr[j + 2]
                }
            }
            i = -1
            l = l - 2
        }
        l = arr.length
        for (var i = 0; i < l; i++) {
            if (arr[i + 1] == '-') {
                sum = (Number(arr[i])*10000000000 - Number(arr[i + 2])*10000000000)/10000000000
                arr[i] = sum
                // console.log(arr[i])
                for (var j = i + 1; j < l; j++) {
                    arr[j] = arr[j + 2]
                }
            }
            i = -1
            l = l - 2
        }
        l = arr.length
    }
    // console.log(arr)
    if (flag == true)
        ele.value = sum
    else {
        ele.value = ""
        document.getElementById("input").placeholder = "invalid input";
    }
}

function clearInput() {
    document.getElementById("input").value = ""
    document.getElementById("input").placeholder = "0"
    period = false
}


function factorial(n) {
    var fact = 1
    for (var i = 2; i <= n; i++) {
        fact = fact * i
    }
    return fact
}

/* function windowSize() {
    var w=window.innerWidth
    var h=window.innerHeight
    console.log(w +"---------" +h)
} */
