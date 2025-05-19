const fs = require('fs');

// sync ..

// fs.writeFileSync('./test.txt','Hello World')
// const result = fs.readFileSync('./test.txt','utf-8')
// console.log(result);

//  Async..

console.log("0");

fs.writeFile("./test1.txt", "Hello World Async",(err) => {} )

fs.readFile('./test1.txt','utf-8', (err,res) => {
    if(err){
        console.log("Error ", err);
    }else{
        console.log(res);
        
    }
})

console.log("1");
console.log("2");
console.log("3");




// fs.appendFileSync('./test.txt', new Date().getDate().toLocaleString());

// fs.cpSync("./test.txt",'./copy.txt');

// fs.unlinkSync('./copy.txt');
