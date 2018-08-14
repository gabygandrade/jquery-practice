$(document).ready(function () {
    var validateCreditCardNumber = function (numberAsString) {
        let numArray = numberAsString.replace(/\s+/g, '').split('');
        // we will use "newArray" to do calculations
        let newArray = [];

        /* STEP 1: double every second digit & add it to the array
            if we have an ODD number of characters, we want to double ODD indices
            if we have an EVEN number of characters, double EVEN indices */
        let doubleOddIndices = numArray.length % 2 !== 0;

        for (var index = numArray.length - 1; index >= 0; index--) {
            let num = numArray[index];
            let isOddNumber = index % 2 !== 0;
            let numToAddToArray;

            if (doubleOddIndices) {
                numToAddToArray = isOddNumber ? parseInt(num) * 2 : parseInt(num);
            } else {
                numToAddToArray = !isOddNumber ? parseInt(num) * 2 : parseInt(num);
            }

            /* Step 2: if there are any two digit numbers (ie any nums greater than 9), sum them 
            ie. 16 = 1+6 = 7 */
            if ((numToAddToArray > 9)) {
                let sumArray = numToAddToArray.toString().split('');
                let sum = sumArray.reduce(function (acc, currVal) {
                    return parseInt(acc) + parseInt(currVal)
                });
                numToAddToArray = sum;
            }

            newArray.unshift(numToAddToArray);
        }

        /* Step 3: sum all the nums */
        let sumOfFinalNums = newArray.reduce(function (acc, currVal) {
            return acc + currVal
        });

        /* Step 4: check if sum is a multiple of 10 - if so, return true; else return false */
        return sumOfFinalNums % 10 === 0;
    }

    $('.hamburger-icon').click(function () {
        $('.nav-links-container').toggleClass('nav-links-vertical-column');
    });

    $('form').submit(function (e) {
        var value = $('#credit-card').val();
        // let invalid = '3982';
        // let valid = '79927398713';
        let isValid = validateCreditCardNumber(value)
        if (!isValid) {
            $('form').after('<p style="color:red">That is an invalid credit card number.</p>');
        } else {
            $('form').after('<p style="color:green">Thank you!</p>');
        }

        e.preventDefault();
    })

})

/*
Luhn algorithm steps:
1. Starting from the last digit, double the value of every second digit
    
    index: [0, 1, 2, 3]
with array [3, 9, 8, 2]
        -->  [6, 9, 16, 2]
2. if #'s are double digits, sum them:
            [6, 9, 1+6, 2]
        --> [6, 9, 7, 2]
3. take sum of all digits
            6+9+7+2
        --> 24
4. if sum of all digits is a a multiple of 10, number is valid
        --> 24 % 10 !== 0, therefore number is not valid

*/