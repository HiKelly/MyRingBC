const Web3 = require("web3")
let provider = new Web3.providers.HttpProvider("http://localhost:7545")
let web3 = new Web3(provider)
let dataOne = "Hello world"
let dataTwo = "Schoolbus"
// let accounts = web3.eth.getAccounts();
console.log(web3.utils.utf8ToHex(dataOne))
web3.eth.sign(web3.utils.utf8ToHex(dataOne), "0x54E84FC343923c3E1e6700cBF7beD3749e711125").then(function (result) {
    console.log(result)
}).catch(function (err) {
    console.log(err)
})
web3.eth.sign(dataOne, "0x54E84FC343923c3E1e6700cBF7beD3749e711125").then(function (result) {
    console.log(result)
}).catch(function (err) {
    console.log(err)
})


