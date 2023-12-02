const fs = require('fs');
const assert = require('assert');

const filename = "input.txt";

let sum = 0;
fs.readFile(filename, 'utf-8', (err, data) => {
    if(err) return;
    const fileLine = data.split(/[\n\r]+/);
    for(line of fileLine) {
        try {
            sum += getNumberInLine(line);
        } catch (error) {
            console.log(error);
        }
    }
    console.log(sum);
});

function getDigit(digit) {
    if(!isNaN(parseInt(digit))) return digit;
    if(digit === 'on') return '1';
    if(digit === 'tw') return '2';
    if(digit === 'thre') return '3';
    if(digit === 'four') return '4';
    if(digit === 'fiv') return '5';
    if(digit === 'six') return '6';
    if(digit === 'seven') return '7';
    if(digit === 'eigh') return '8';
    if(digit === 'nin') return '9';
    throw new Error("Le chiffre n'a pas pu être vérifié : " + digit);
}

function getNumberInLine(line) {
    const numbers = line.match(/\d|(on(?=e)|tw(?=o)|thre(?=e)|four|fiv(?=e)|six|seven|eigh(?=t)|nin(?=e)|zer(?=o))/gi);
    if(numbers) {
        const firstNumber = getDigit(numbers[0]);
        const lastNumber = getDigit(numbers[numbers.length - 1]);
        const number = firstNumber + lastNumber;
        console.log(firstNumber + " + " + lastNumber + " = " + number)
        return parseInt(number);
    }
    throw new Error("La ligne n'a pas pu être lue : " + line);
}

assert(getNumberInLine('1abc2') === 12, "Le résultat doit être 12. Obtenu: " + getNumberInLine('1abc2'));
assert(getNumberInLine('pqr3stu8vwx') === 38, "Le résultat doit être 38. Obtenu: " + getNumberInLine('pqr3stu8vwx'));
assert(getNumberInLine('a1b2c3d4e5f') === 15, "Le résultat doit être 15. Obtenu: " + getNumberInLine('a1b2c3d4e5f'));
assert(getNumberInLine('treb7uchet') === 77, "Le résultat doit être 77. Obtenu: " + getNumberInLine('treb7uchet'));

assert(getNumberInLine('two1nine') === 29, "Le résultat doit être 29. Obtenu: " + getNumberInLine('two1nine'));
assert(getNumberInLine('eightwothree') === 83, "Le résultat doit être 83. Obtenu: " + getNumberInLine('eightwothree'));
assert(getNumberInLine('abcone2threexyz') === 13, "Le résultat doit être 13. Obtenu: " + getNumberInLine('abcone2threexyz'));
assert(getNumberInLine('xtwone3four') === 24, "Le résultat doit être 24. Obtenu: " + getNumberInLine('xtwone3four'));
assert(getNumberInLine('4nineeightseven2') === 42, "Le résultat doit être 42. Obtenu: " + getNumberInLine('4nineeightseven2'));
assert(getNumberInLine('zoneight234') === 14, "Le résultat doit être 14. Obtenu: " + getNumberInLine('zoneight234'));
assert(getNumberInLine('7pqrstsixteen') === 76, "Le résultat doit être 76. Obtenu: " + getNumberInLine('7pqrstsixteen'));
assert(getNumberInLine('seven72cqslvzpgj') === 72, "Le résultat doit être 72. Obtenu: " + getNumberInLine('seven72cqslvzpgj'));
assert(getNumberInLine('sixfourfourseven6rzdkfour') === 64, "Le résultat doit être 64. Obtenu: " + getNumberInLine('sixfourfourseven6rzdkfour'));
assert(getNumberInLine('twoh8') === 28, "Le résultat doit être 28. Obtenu: " + getNumberInLine('twoh8'));
assert(getNumberInLine('eightwo ') === 82, "Le résultat doit être 82. Obtenu: " + getNumberInLine('eightwo'));


