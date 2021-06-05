"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
// calculate BlockHash with 4 properties.
Block.calculateBlockHash = (index, previousHash, timestamp, data) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.validateStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";
// Test block creating with four dummy arguments.
const genesisBlock = new Block(0, "2020202020202", "", "Hello", 123456);
let blockchain = [genesisBlock];
// create a variable of Block array.
const getBlockchain = () => blockchain;
// give the latest block.
const getLatestBlock = () => blockchain[blockchain.length - 1];
// function - TimeStamp
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimestamp = getNewTimeStamp();
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
    return newBlock;
};
// Check Block for validity.
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    // Check for validity of the order of the block.
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if ()
        ;
};
//# sourceMappingURL=index.js.map