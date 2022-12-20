const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

//Aqui conseguimos que MULTER envie el archivo a especifico destino.
//const upload = multer({ dest: "uploads/" });
const storageStrategy = multer.memoryStorage();
const upload = multer({ storage: storageStrategy });

const app = express();

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hola Luis Gomez");
});

app.post("/imagen", upload.single("imagen"), async function (req, res) {
  const body = req.body;
  const imagen = req.file;
  const fs = require("fs");

  const processedImage = sharp(imagen.buffer).resize(400, 800, {
    fit: "contain",
    background: "#FFF",
  });

  const resizeImage = processedImage.resize(800, 200);

  //esta variable nos arroja una promesa de que se ejecutara alguna vez
  const resizedImageBuffer = await resizeImage.toBuffer();

  fs.writeFileSync("nuevaruta/prueba.png", resizedImageBuffer);

  console.log(resizedImageBuffer);

  res.send({ resizeImage: resizedImageBuffer });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log("Servidor escuchando en el puerto", PORT);
});
