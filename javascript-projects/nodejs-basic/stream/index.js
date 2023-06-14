const fs = require("fs");
const readableStream = fs.createReadStream("./input.txt", {
  highWaterMark: 15,
});

readableStream.on("readable", () => {
  try {
    process.stdout.write(`[${readableStream.read()}]`);
  } catch (error) {
    // catch the error when the chunk cannot be read
  }
});

readableStream.on("end", () => {
  console.log("Done");
});

const writeableStream = fs.createWriteStream("output.txt");
writeableStream.write("Lorem ipsum dol\n");
writeableStream.write("or sit amet, co\n");
writeableStream.write("nsectetur adipi\n");
writeableStream.end();
