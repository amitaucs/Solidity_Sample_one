const path = require('path');
const fs = require('fs');
const solc = require('solc');

const supplyPath = path.resolve(__dirname,'contract','Supply.sol');
const source = fs.readFileSync(supplyPath,'utf8');


module.exports = solc.compile(source,1).contracts[':Supply'];
