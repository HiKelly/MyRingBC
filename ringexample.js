const Web3 = require("web3")
let provider = new Web3.providers.HttpProvider("http://localhost:7545")
let web3 = new Web3(provider)

var lrs = require("lrs");


// 3 parties generate their public and private key pairs
var alice = lrs.gen();
var bob = lrs.gen();
var eve = lrs.gen();


for (let key in alice) {
    console.log(key + " : " + alice[key]);
}

for (let key in bob) {
    console.log(key + " : " + bob[key]);
}

for (let key in eve) {
    console.log(key + " : " + eve[key]);
}
console.log("\n");
// The list of public key is known and distributed
// We are getting all the public keys and storing it in "group"
var group = [alice, bob, eve].map((m) => m.publicKey);

for (let key in group) {
    console.log(key + " : " + group[key]);
}

// Alice signs a message in behalf of one of the 3
var signed = lrs.sign(group, alice, "The body is buried on the backyard.");
console.log("signed: " + signed)

// Anyone is able to verify that one of them signed that message
var verified = lrs.verify(group, signed, "The body is buried on the backyard.");
console.log("The sign has been verified as " , verified);

// If that same person signs another message...
var signed2 = lrs.sign(group, alice, "Just kidding, he is alive.");
//var signed2 = lrs.sign(group, bob, "Just kidding, he is alive.");

var verified2 = lrs.verify(group, signed2, "Ther");
console.log("verify: " + verified2);

// We are able to tell the signature came from the same person By comparing signed and signed2
var compared = lrs.link(signed, signed2);

if (compared == true) {
    console.log("Both signatures are from the same person.");
} else {
    console.log("Both signatures are not from the same person.");
}
