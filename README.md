# Typechain

Learning Typescript by making a Blockchain with it.

# Installtion

1. Run _npm install typescript_: to install a typescript
2. Run _npx tsc_: to compile index.ts to index.js. > two files called index.js and index.js.map will be created.
3. To shorten a compiling process, you can create a script in the package.json.

```
  "scripts": {
    "start":"node index.js",
    "prestart":"tsc"
  }
```

4. Then, if you run _npm run start,_ it will execute "prestart" first, which compiles .ts to .js. Then, it starts the server using node.js.

# Progress report

## 1.0 Start TypeScript

-  Since this is a TypeScript, you have to type everything (strongly typed language).
-  This is a good part. This is actually good because the compiler

```ts
const name = "Nicolas",
   age = 24,
   gender = "male";

const sayHi = (name, age, gender) => {
   console.log(`HEllo ${name}, you are ${age}, you are a ${gender}`);
};

sayHi(name, age, gender);
// If you erase gender, it will give a warning saying that it is expecting three arguments instead of two. These notifications are protecting you from making a mistake.
export {};
```

## 1.1 Types

-  you can set the Type on the arguments that you pass inside the function.
-  This is a good check because TypeScript will know when the user puts a wrong type inside the function.
-  Also you can set the type what is going to be returned at the end of the function.

```ts
// set the types for arguments and returned value.
const sayHi = (name: string, age: number, gender: string): void => {
   console.log(`HEllo ${name}, you are ${age}, you are a ${gender}`);
};

sayHi("Nicolas", 24, "male");

export {};
```

-  since you are tired of doing npm start everytime the code updates, you can install 'tsc-watch'
-  set the script file in package.json as below:

```javascript
// set the types for arguments and returned value.
const sayHi = (name: string, age: number, gender: string): string => {
   return `Hello ${name}, you are ${age}, you are a ${gender}!`;
};

console.log(sayHi("Nicolas", 27, "male"));

export {};
```

-  Once you set up tsc-watch, it will automatically compile index.ts into index.js.

## 1.2 Interfaces

-  What if you want to pass an object.
-  If you want to pass an object to a function, you have to create an interface.
-  Within the interface, you can specify what value types should be as below:

```javascript
interface Human {
   name: string;
   age: number;
   gender: string;
}

const person = {
   name: "nicolas",
   age: 22,
   gender: "male",
};

// Interface becomes like a type of an object.
const sayHi = (person: Human): string => {
   return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!`;
};
console.log(sayHi(person));

export {};
```

-  Then, you can pass the interface instead of many arguments.

## 1.2 Class

-  The problem with an interface is that it does not change back to the JavaScript. It will remain within the TypeScript.
-  Therefore, instead, you can make a class.
-  Class needs a constructor and set them equal to the properties that you already have with .this.
-  However, if you set the properties private, it is not going to be compiled to javascript.

```javascript
class Human {
  public name: string;
  public age: number;
  public gender: string;
  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

  const lynn = new Human("Lynn", 18, "female");

  const sayHi = (person: Human): string => {
    return `Hello ${person.name}, you are ${person.age}, you are a ${
      person.gender
    }!`;
  };

console.log(sayHi(lynn));

export {};
// Output: Hello Lynn, you are 18, you are a female!
```

## 1.3 Create Block.

-  When you create a Block with a Class, set bunch of variables that you need.
-  Set constructors, types of variables.
-  Create a new constant called Block and initiate a new variable.
-  Then, create a block type array. Add a Block to that array.
-  Please refer to the below code:

```ts
class Block {
   public index: number;
   public hash: string;
   public previousHash: string;
   public data: string;
   public timestamp: number;
   constructor(
      index: number,
      hash: string,
      previousHash: string,
      data: string,
      timestamp: number
   ) {
      this.index = index;
      this.hash = hash;
      this.previousHash = previousHash;
      this.data = data;
      this.timestamp = timestamp;
   }
}

const genesisBlock: Block = new Block(0, "2020202020202", "", "Hello", 123456);

let blockchain: [Block] = [genesisBlock];

console.log(blockchain);
```

## 1.4 Create Block pt.2

-  To create a block, you need to calculate a hash. Hash combines all the properties into a complicated algorithm.
   Steps:

1. Run _npm install cryptojs_
1. import CryptoJs.

```
import * as CryptoJS from "crypto-js";
```

2. Create a method called CalculateHash.
3. This is a method that is in the class block. Therefore, the method can only be called only after the block is created.
4. Calculat block hash can be created using the cryptoJS.

```ts

// Using combination of four variables, it can create a complicated hash.
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
  CryptoJS.SHA256(index + previousHash+ timestamp +data).toString();
```

5. Block.caculateBlockHash() works.
6. Create three functions (getBlockchain, getLatestBlock, getNewTimeStamp)

```ts
// create a variable of Block array.
const getBlockchain = (): Block[] => blockchain;

// give the latest block.
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);
```

7. Create a createNewBlock function

-  this creatNewBlock takes one string element and it will be used to create the hash along with other 3 variables that are retrieved from the previous block and the system.

```ts
const createNewBlock = (data: string): Block => {
   const previousBlock: Block = getLatestBlock();
   const newIndex: number = previousBlock.index + 1;
   const newTimestamp: number = getNewTimeStamp();
   const newHash: string = Block.calculateBlockHash(
      newIndex,
      previousBlock.hash,
      newTimestamp,
      data
   );
   const newBlock: Block = new Block(
      newIndex,
      newHash,
      previousBlock.hash,
      data,
      newTimestamp
   );
   return newBlock;
};
```

8. Create a new function called _isBlockValid_ to validate the block.

-
