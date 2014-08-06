# JavaScript canvas-based image blurring engine

![alt tag](https://pbs.twimg.com/media/BuW9CdaIIAEM9N_.png:large)

## Installation

You can load it via AMD, CommonJS or the object will be available on the Blurred global variable

## How to use

```

// Instanciation
var myBlurredElement = new Blurred(document.getElementById('such-doge'));

// Blur radius/strength setting
myBlurredElement.setBlurStrength(3); 

// If there's no data-src attribute on your element or if you want to force the url, you can do it here
myBlurredElement.setUrl('http://wowsuchdoge.com/swag.jpg'); 

// Set mime type for better results
myBlurredElement.setMimeType('image/png');

// Perform rendering
myBlurredElement.render();

// Destroy blurred image
myBlurredElement.destroy();

/* 

All calls, except render(), are chainable.
That way you can do 
  myBlurredElement
    .setBlurStrength(3)
    .setUrl('http://yolo.com/dickbutt.jpg')
    .setMimeType('image/jpeg')
    .render();
    
*/

```

### Enjoy!
