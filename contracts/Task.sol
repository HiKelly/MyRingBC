//SPDX-License-Identifier: SimPL-2.0
pragma solidity ^0.8.0;
import "./Register.sol";

contract Task {
    address payable[] workers;   // 记录workers，方便转账
    address requester;  // 记录 requester
    string title;   // 任务标题
    string descriptionOfTask;    // 任务描述
    mapping(address => string) answerList;  // 答案列表
    string[] list;
    uint answerCount;   // 已完成答案数
    uint award;    // 酬金
    uint numberOfWorkersNeeded;   // 需要完成的工人数
    uint unitAward; // 单个工人获得的酬金数

    modifier onlyRequester {    // 创建限定符
        require(isRequester(), "Only requester can do that!");
        _;
    }

    constructor() public {
        title = "default";
        descriptionOfTask = "default";
        answerCount = 0;
        award = 0;
        numberOfWorkersNeeded = 0;
        unitAward = 0;
    }

    function addQuestion(string memory _title, string memory _descriptionOfTask) payable public {
        require(msg.value > 0 ether, "Must have award!"); // 必须预存酬金
        requester = msg.sender;
        title = _title;
        descriptionOfTask = _descriptionOfTask;
        award = msg.value;
    }

    function getTitle() public returns(string memory) {
        return title;
    }

    function ifAnswered(address sender) public returns(bool){
        if (keccak256(bytes(answerList[sender]))  == keccak256(bytes("")))
            return true;
        return false;
    }

    // 回答问题
    function answerQuestion(string memory _answer) public {
        answerList[msg.sender] = _answer;
        list.push(_answer);
        answerCount++;
    }

    // 收集答案
    function collectAnswers() onlyRequester public view returns(string[] memory) {
        return list;
    }

    function isRequester() view private returns(bool) { //  对外不可见
        return msg.sender == requester;
    }
}
