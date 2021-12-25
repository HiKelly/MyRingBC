const Register = artifacts.require("Register");
const Task = artifacts.require("Task");
const lrs = require("lrs");
const crypto = require('crypto');
const NodeRSA = require('node-rsa');

let key = new NodeRSA({b:1024});
var publicDer = key.exportKey('public');
var privateDer = key.exportKey('private');
var encrypted = key.encrypt("This is a secret");
var decrypted = key.decrypt(encrypted);
console.log("encrypted = " + encrypted.toString('base64'));
console.log("decrypted = " + decrypted.toString());
let registerInstance;
let taskInstance;
let usr0;

contract("Task", async function(accounts){
    before(async () => {
        registerInstance = await Register.deployed();
        taskInstance = await Task.deployed();
    })
    describe("success states", async () => {

        it("Should add a user ", async () => {
            usr0 = lrs.gen();
            let addr0 = usr0.publicKey;
            console.log("addr = " + addr0);
            console.log("private = " + usr0.privateKey);
            let count0 = await registerInstance.getCountOfUsers.call();
            console.log("count0 = " + count0)
            await registerInstance.addUser(addr0, {from:accounts[0]});
            let count1 = await registerInstance.getCountOfUsers.call();
            console.log("count1 = " + count1)

        });

        it("Should add a task ", async () => {
            let b = await taskInstance.addQuestion("test", "This is a test", {from:accounts[0], value:1e19});
            console.log(b);
            let title = await taskInstance.getTitle.call();
            console.log("title = " + title);
            assert.equal(title, "test");
        })

        it("Should submit an answer ", async () => {
            var group = await registerInstance.getUsers.call();
            //console.log("group: " + group);
            //var signed = lrs.sign(group, usr0, "This is a secret This is a secret This is a secret This is a secret This is a secret This is a secret This is a secret This is a secret This is a secret This is a secret");
            var signed = lrs.sign(group, usr0, "/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/readme");
            console.log("length = ", signed.length);
            var encrypted = key.encrypt(signed, 'base64');
            console.log("encrypted length : " + encrypted.length)

            let a = await taskInstance.answerQuestion(encrypted, {from:accounts[1]});
            console.log(a);
            let count = await taskInstance.collectAnswers.call();
            /*for (let i in count) {
                console.log(count[i]);
            }*/
            assert.equal(count.length, 1);
        })

    })
})
