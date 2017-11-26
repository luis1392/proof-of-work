const SHA256 = require("crypto-js/sha256"); //call sha256-lib
var program = require('commander');         //call commander-lib    

class Proofwork {
    constructor(index, timestamp, message) {
        this.index = index
        this.timestamp = timestamp;
        this.message = message;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }


    //return hash SHA-256 
    calculateHash() {
        return SHA256( (this.index*2) + this.timestamp + this.message + this.nonce ).toString();
    }

    //
    mineBlock(difficulty) {

        try{

            var startTime = new Date(); 

            //loop to calculate the hash depending on the difficulty
            while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
                this.nonce++;
                this.hash = this.calculateHash();
            }

            console.log("POW Hash: " + this.hash);    //print hash
            console.log("NONCE USED: " + this.nonce); //print nonce 
            
            var endTime = new Date();
            var timeDiff = endTime - startTime; // calculate time exe
            console.log('Finished after ' + (timeDiff /= 1000) + ' Seconds') //print time 
        }
        catch(err){ 
            console.log(err); //print errors, if exists
        }
        
    }
}

/*
* Class Blockchain
*/
class Blockchain{

    addBlock(newBlock, difficulty) {    
        newBlock.mineBlock(difficulty);    
    }

}



/*
*
* Hi! :)
*
* Init the script 
*
*/

program
  .version('0.1.0')  
  .command('pow <message> <difficulty>')            //define cmd and required arguments
  .action(function (pow, message, difficulty) {     // assign values
    powValue        = pow;
    messageValue    = message;
    difficultyValue = difficulty;
  });


// display help menu
program.on('--help', function(){
    console.log('  Examples:');
    console.log('');
    console.log('    node main.js --help');
    console.log('    node main.js -h');
    console.log("    node main.js pow 'Hello, world!' 3 ");
    console.log('');
});
//end help menu

program.parse(process.argv);

//validations of arguments and command
if (typeof powValue === 'undefined') {
   console.error('no command  given!');
   process.exit(1); 
}
if (typeof messageValue === 'undefined') {
   console.error('no message given!');
   process.exit(1);
}
if (typeof difficultyValue === 'undefined') {
   console.error('no difficulty given!');
   process.exit(1);
}
//end validations


//if the validations are correct
try {
    var startTime = new Date(); //init timer
    var message    = messageValue;
    var difficulty = difficultyValue;

    let hashcash = new Blockchain(); //new obj class Blockchain

    console.log('Hashcash Proof of Work Algorithm');
    hashcash.addBlock(new Proofwork(parseInt(difficulty), startTime , message ) , parseInt(difficulty) );
}
catch(err) {
    console.log(err);
}








