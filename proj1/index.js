console.log('Hello world!');

console.log(global.luckyNum);

global.luckyNum = '23';

console.log(global.luckyNum);

console.log('platform ' + process.platform);
console.log('linux username ' + process.env.USER);
console.log('windows username ' + process.env.USERNAME);

// its called only when exit is called, not right on
process.on('exit', function() {
    console.log('on exit the node');
})


const { EventEmitter } = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('lunch', () => {
    console.log('Eating yummy lunch');
})

eventEmitter.emit('lunch');
eventEmitter.emit('lunch');

// haha
/*const { readFile, readFileSync } = require('fs');
const txt = readFileSync('./hello.txt', 'utf8');

console.log(txt);
console.log('this wont be ASAP');

// toto prebehne ako callback rychlo
readFile('./hello.txt', 'utf8', (err, txt) => {
    console.log(txt);
});
console.log('this will be ASAP');
*/
// promises
/*const { readFile } = require('fs').promises;

async function citaj() {
    const file = await readFile('./hello.txt', 'utf8');
    console.log(file);
}

citaj();
console.log('dobre toto uz posledne');
*/
// modules
const myModule = require('./my-module');

console.log(myModule);

const express = require('express');
const { readFile } = require('fs').promises;
const app = express();

app.get('/', async (request, response) => {
    response.send( await readFile('./home.html', 'utf8'));
});


app.listen(process.env.PORT || 3000, () => console.log(`App available on http://localhost:3000`))