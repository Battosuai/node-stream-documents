const XLSX = require("xlsx");

/* load 'fs' for readFile and writeFile support */
const fs = require("fs");

/* load 'stream' for stream support */
const { Readable } = require("stream");
XLSX.stream.set_readable(Readable);

const readerStream = fs.createReadStream("Learnings.xlsx");

process_RS(readerStream, streamCallback);

function process_RS(stream, callback) {
  let buffers = [];
  stream.on("data", function (data) {
    buffers.push(data);
  });
  stream.on("end", function () {
    let buffer = Buffer.concat(buffers);
    let workbook = XLSX.read(buffer);

    /* DO SOMETHING WITH workbook IN THE CALLBACK */
    callback(workbook);
  });
}

function streamCallback(workbook) {
  console.log("Sheets", workbook.SheetNames);
  console.log("workbook", XLSX.utils.sheet_to_json(workbook.Sheets["Sheet1"]));
}
