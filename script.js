function reverseStr(str){
    return str.split('').reverse().join('')
}

function ThisDate(str){
    let reverse = reverseStr(str);

    return reverse === str
}

// console.log(ThisDate("mom"))

function dateToString(date){

    let dateStr = {day: "", month:"", year:""}

    if(date.day <10){
        dateStr.day = "0"+ date.day
    }else{
        dateStr.day = date.day.toString();
    }

     if(date.month <10){
        dateStr.month = "0"+ date.month
    }else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr
}

// console.log(date.day)

function getAllDateFormats(date){
    let dateStr = dateToString(date);

    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2)
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day

    return[ddmmyyyy, mmddyyyy, yyyymmdd, mmddyy, yymmdd]
}

// console.log(getAllDateFormats(date));

function checkPalindromeForAllDateFormats(date){
    let listOfPalindrome = getAllDateFormats(date)

    let setPalindrome = false

    for(let i=0; i<listOfPalindrome.length; i++){
        if(ThisDate(listOfPalindrome[i]))
            setPalindrome = true
            break
    }

    return setPalindrome
}

function isLeapYear(year){
    if(year % 400 === 0){
        return true
    }else if ( year % 100 === 0){
        return false
    }else if ( year % 4 === 0){
        return true
    }else return false
}

function getNextDate(date){

    let day = date.day + 1
    let month = date.month
    let year = date.year
    
    let daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if(month === 2){
        if(isLeapYear(year)){
            if(day>29){
                day = 1
                month++
            }
        }else{
            if(day>28){
                day = 1
                month++
            }
        }
    }else{
        if(day > daysInMonths[month - 1]){
            day = 1
            month++
        }
    }

    if(month > 12){
        month = 1
        year++
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getPreviousDate(date){
    let day = date.day -1
    let month = date.month
    let year = date.year
    let daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if(isLeapYear(year)){
        daysInMonths[1] = 29
    }
    if(day<1){
        day = daysInMonths[month-2]
        month --
    }
    if(month < 1){
        day = 31
        month = 12
        year --
    }
     return {
         day: day,
         month: month,
         year: year
     }
}

function getNextPalindromeDate(date){
    let count = 0
    let nextDate = getNextDate(date)

    while(1){
        count++
        let isThisDatePalindrome =  checkPalindromeForAllDateFormats(nextDate)
        if(isThisDatePalindrome){
            break
        } 
        nextDate = getNextDate(nextDate)
    }

    return [count, nextDate]
}

function getPreviousPalindromeDate(date){
    count = 0
    let previousDate = getPreviousDate(date)

    while(1){
        count++
        let isThisDatePalindrome = checkPalindromeForAllDateFormats(previousDate)
        if(isThisDatePalindrome){
            break
        }
        previousDate = getPreviousDate(previousDate)

    }

    return[count, previousDate]

}

// console.log("date: ", date);

// console.log("previous date: ",getPreviousDate(date));

// console.log("previous palindrome: ", getPreviousPalindromeDate(date));

// console.log(checkPalindromeForAllDateFormats(getPreviousDate(date)))


let dateInput = document.querySelector("#birthday-input")
let showBtn = document.querySelector("#show-btn")
let resultRef = document.querySelector("#result")

function clickHandler(e){
    let bdayString = dateInput.value

    if(bdayString !== ""){

        let listOfDate = bdayString.split('-');

        let date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        }

        let [count, nextDate] = getNextPalindromeDate(date)
        let [prevCount, previousDate] = getPreviousPalindromeDate(date)

        console.log(nextDate);

        let isPalindrome = checkPalindromeForAllDateFormats(date)

        if(isPalindrome){
            resultRef.innerText = "'Yay!' your birthday is a palindrome.🎉"
        }
        else{

            resultRef.innerText = `Sorry😕, your birthday is not a palindrome.
            
            The next Palindrome date is on ${nextDate.day}-${nextDate.month}-${nextDate.year}, ${count} day(s) later than your birthday.
        
            The previous birthday was on ${previousDate.day}-${previousDate.month}-${previousDate.year}, ${prevCount} day(s) before your birthday`
        }

        console.log("next palindrome: ",getNextPalindromeDate(date)[1].day);

    }


    
}

showBtn.addEventListener("click", clickHandler)