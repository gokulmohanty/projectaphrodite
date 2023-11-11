const fs = require("fs");
const {readFile} = require("node:fs/promises")
const {lookup} = require("mime-types")
const { Readable } = require('stream');
const { finished } = require('stream/promises');
const path = require("path");

const imagePath = "C:/Users/ryana/Downloads/Screenshot 2023-11-11 112448.png"
const saveTo = "C:/Users/ryana/Downloads/result5.jpg"

async function getOutline(imagePath, saveTo){

  const file = new Blob([await readFile(imagePath)], { type: lookup(imagePath) });

  var formdata = new FormData();
  formdata.append("upload_file", file, imagePath);
  formdata.append("line_type", "g_pen");
  formdata.append("line_size", "2");
  formdata.append("noise_reduction", "10");
  formdata.append("background", "white");

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  const generatedResponse = await fetch("https://tech-lagoon.com/canvas/image-to-edge?id=861fde88-abbf-499d-bf59-8c1106746ec0&new_file=true", requestOptions)

  requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  const imageResponse = fetch("https://tech-lagoon.com/imagechef/image-to-edge/" + await generatedResponse.text(), requestOptions)

  const fileStream = fs.createWriteStream(saveTo, { flags: 'wx' });
  await finished(Readable.fromWeb((await imageResponse).body).pipe(fileStream));

  console.log("Downloaded image")
}

getOutline(imagePath, saveTo)