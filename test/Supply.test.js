const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);


const { interface, bytecode } = require('../compile');
const INITIAL_STRING = 'Hi There!';



let accounts;
let supply;

beforeEach( async () =>{

    //Get list of all accounts

     accounts = await web3.eth.getAccounts();

     //deploy contract using the account

    supply = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments:[INITIAL_STRING]})

        .send({from: accounts[0], gas: '1000000'});

    supply.setProvider(provider);


});

describe('Supply', ()=>{

    it('deploys a contract', ()=> {

        assert.ok(supply.options.address);

    });

    it('has a default message',  async () =>{

        const message = await supply.methods.message().call();
        assert.equal(message,INITIAL_STRING)
    });

    it('can change the message', async() =>{

        await supply.methods.setMessage('Bye,There!').send({from: accounts[0]});
        const message = await supply.methods.message().call();
        assert.equal(message,'Bye,There!');

    });
});