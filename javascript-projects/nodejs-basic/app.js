// const server = new Server({
//   host: process.env.NODE_ENV !== "production" ? "localhost" : "dicoding.com",
// });

// const cpuInf = process.memoryUsage();
// console.log(cpuInf);

// const firstName = process.argv[2];
// const lastName = process.argv[3];
// console.log(`Hello ${firstName} ${lastName}`);

const coffee = require("./coffee");
console.log(coffee);

// menggunakan object destructuring untuk mengimport lebih dari satu nilai pada modul
const { firstName, lastName } = require("./user");
console.log(firstName);
console.log(lastName);
