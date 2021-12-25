const Register = artifacts.require("Register");
var contractInstance;
var lrs = require("lrs");

contract("Register", async function(accounts){
    before(async () => {
        contractInstance = await Register.deployed();
    })
    describe("success states", async () => {

        it("Should add a user ", async () => {
            let usr0 = lrs.gen();
            let addr0 = usr0.publicKey;
            console.log("addr = " + addr0);
            console.log("private = " + usr0.privateKey);
            let count0 = await contractInstance.getCountOfUsers.call();
            console.log("count0 = " + count0)
            await contractInstance.addUser(addr0, {from:accounts[0]});
            let count1 = await contractInstance.getCountOfUsers.call();
            console.log("count1 = " + count1)
            assert.equal(count1.valueOf(), 1);

        });

        it("Should get users", async () => {
            let users = await contractInstance.getUsers.call();
            for (var i = 0; i < users.length; i++) {
                console.log("i = " + i);
                console.log(users[i].add);
                for (var key in users[i]) {
                    console.log(key + " : " + users[i][key])
                }
                console.log("\n")
            }
        });

    })
})

