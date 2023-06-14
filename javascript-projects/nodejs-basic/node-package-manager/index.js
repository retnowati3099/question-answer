// const _ = require("lodash");
// const myOddEvenArray = _.partition([1, 2, 3, 4, 5, 6], (n) => n % 2);
// console.log(myOddEvenArray);

const employees = [
  {
    id: 1,
    nama: "kamu",
    profesi: "be",
    domisili: "sleman",
    agama: "islam",
  },
  {
    id: 2,
    nama: "dia",
    profesi: "fe",
    domisili: "gunungkidul",
    agama: "atheis",
  },
];


const arrayEmployee = []
employees.forEach((employee) => {
    const { id, nama, profesi } = employee;
    const newItem = {
        id, nama, profesi,
    };
    arrayEmployee.push(newItem)
})

console.log(arrayEmployee)