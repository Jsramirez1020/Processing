import { matrix, zeros, forEach, subset, index as _index, range, dot, sum } from 'mathjs';
import Jimp, { read } from 'jimp';

// Cargar una imagen en escala de grises
read('imagen.png')
  .then(img => {
    img = img.grayscale();

    // Convertir la imagen en una matriz de Math.js
    const imgMatrix = matrix(img.bitmap.data, [img.bitmap.height, img.bitmap.width]);

    // Crear una matriz de convolución
    const kernel = matrix([[0, -1, 0], [-1, 5, -1], [0, -1, 0]]);

    // Aplicar la matriz de convolución a la imagen
    const resultMatrix = zeros(imgMatrix.size());
    forEach(resultMatrix, (value, index) => {
      if (index[0] > 0 && index[0] < imgMatrix.size()[0] - 1 && index[1] > 0 && index[1] < imgMatrix.size()[1] - 1) {
        const subMatrix = subset(imgMatrix, _index(range(index[0] - 1, index[0] + 2), range(index[1] - 1, index[1] + 2)));
        const product = dot(subMatrix, kernel);
        resultMatrix.set(index, sum(product));
      }
    });

    // Convertir la matriz de Math.js en una imagen Jimp
    const resultBuffer = new Buffer.from(resultMatrix.toArray());
    const resultImg = new Jimp({ data: resultBuffer, width: resultMatrix.size()[1], height: resultMatrix.size()[0] });

    // Guardar la nueva imagen
    resultImg.write('imagen_procesada.png');
  })
  .catch(err => {
    console.error(err);
  });
  const input = document.getElementById('input-file');
  const originalImg = document.getElementById('original-img');
  const processedImg = document.getElementById('processed-img');
  const processBtn = document.getElementById('process-btn');
  
  processBtn.addEventListener('click'), () => {
    const file = input.files[0];
  
    if (file.type !== 'image/png') {
      alert('El archivo seleccionado no es una imagen PNG');
      return;
    }
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
  
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
  
      img.onload = () => {
        const jimpImg = new Jimp(img.width, img.height);
  
        jimpImg.bitmap.data = new Buffer.from(img.src.replace(/^data:image\/png;base64,/, ''), 'base64');
  
        // Convertir la imagen en una matriz de Math.js
        const imgMatrix = matrix(jimpImg.bitmap.data, [jimpImg.bitmap.height, jimpImg.bitmap.width]);
  
        // Crear una matriz de convolución
        const kernel = matrix([[0, -1, 0], [-1, 5, -1], [0, -1, 0]]);
  
        // Aplicar la matriz de convolución a la imagen
        const resultMatrix = zeros(imgMatrix.size());
        forEach(resultMatrix, (value, index) => {
          if (index[0] > 0 && index[0] < imgMatrix.size()[0] - 1 && index[1] > 0 && index[1] < imgMatrix.size()[1] - 1) {
            const subMatrix = subset(imgMatrix, _index(range(index[0] - 1, index[0] + 2), range(index[1] - 1, index[1] + 2)));
            const product = dot(subMatrix, kernel);
            resultMatrix.set(index, sum(product));
          }
        });
  
        // Convertir la matriz de Math.js en una imagen Jimp
        const resultBuffer = new Buffer.from(resultMatrix.toArray());
        const resultImg = new Jimp({ data: resultBuffer, width: resultMatrix.size()[1], height: resultMatrix.size()});
      }
    }
  }
  
