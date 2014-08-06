# JavaScript canvas-based image blurring engine

## Installation

You can load it via AMD, CommonJS or the object will be available on the Blurred global variable

## How to use

```

// Instanciation
var myBlurredElement = new Blurred(document.getElementById('such-doge'));

// Blur radius/strength setting
myBlurredElement.setBlurStrength(3); 

// If there's no data-blur attribute on your element or if you want to force the url, you can do it here
myBlurredElement.setUrl('http://wowsuchdoge.com/'); 

// Set mime type for better results
myBlurredElement.setMimeType('image/png');

// Perform rendering
myBlurredElement.render();

/* 

All calls, except render(), are chainable.
That way you can do 
  myBlurredElement
    .setBlurStrength(3)
    .setUrl('http://yolo.com/')
    .setMimeType('image/jpeg')
    .render();
    
*/

```

### Enjoy!
