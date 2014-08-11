# JavaScript canvas-based image blurring engine

![alt tag](http://s17.postimg.org/rdme1nyrj/Capture_d_cran_2014_08_11_21_39_17.png)

## Installation

You can load it via AMD, CommonJS or the object will be available on the Blurred global variable

## How to use

```

// Instanciation
var myBlurredElement = new Blurred(document.getElementById('such-doge'));

// Blur radius/strength setting
myBlurredElement.setBlurStrength(3); 

// If there's no data-blurred attribute on your element or if you want to force the url, you can do it here
myBlurredElement.setUrl('http://wowsuchdoge.com/swag.jpg'); 

// Set mime type for better results
myBlurredElement.setMimeType('image/png');

// Set callback function
myBlurredElement.setCallback(function() {
    // Hello world
});

// Perform rendering
myBlurredElement.render();

// Get used properties (element, url, mimeType, blurStrength)
myBlurredElement.getProps(['url', 'blurStrength']);

// Destroy blurred image
myBlurredElement.destroy();

/* 

All calls, except render(), are chainable.
That way you can do 
  myBlurredElement
    .setBlurStrength(3)
    .setUrl('http://yolo.com/dickbutt.jpg')
    .setMimeType('image/jpeg')
    .setCallback(function() {
        console.log(this.getProps(['imgContainer']);
    }).render();
    
*/

```

### Enjoy!
