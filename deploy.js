const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(

    'inside funny dinner furnace push decorate digital buffalo bird volume assist need',
'https://rinkeby.infura.io/tBpwu3lhirVkld2XsMmt'
);

const web3 = new Web3(provider);

const deploy = async() =>{

    const  accounts = await web3.eth.getAccounts();

    console.log('Appempting to deploy from account' , accounts[0]);

    const  result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: '0x'+ bytecode, arguments: ['Hi Test !']})
        .send({gas: '1000000', from: accounts[0]});


    console.log('Contract deployed to :', result.options.address);
};

deploy();