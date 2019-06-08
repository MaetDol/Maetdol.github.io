function averageOfPixels( start, colSize, rowSize, Dot ) {
  var rgb = new Dot(),
      colorNumber = 0;
  for( var r=0; r<rowSize; r++ ) {
    for( var c=0; c<colSize; c++ ) {
      var pos = start + c + r*imgWidth;

      rgb.r += imgPixels[pos];
      rgb.g += imgPixels[pos+1];
      rgb.b += imgPixels[pos+2];

      colorNumber++;
    }
  }

  rgb.r = rgb.r / colorNumber;
  rgb.g = rgb.g / colorNumber;
  rgb.b = rgb.b / colorNumber;

  return [rgb.r, rgb.g, rgb.b];
  // 한 줄을 배열로 만드는 코드
}

onmessage = function(e) {
  e = e.data[0];
  imgPixels = e.imgPixels;
  imgWidth  = e.imgWidth;
  var pixelLine = [];
  var result = averageOfPixels( e.start, e.colSize, e.rowSize, e.Dot );

  postMessage(result);
}
