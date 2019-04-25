import './general';

const deviceWidth = window.innerWidth;

class Memes {
  constructor() {
    console.log("Memes JS File");
    this.$topTextInput = document.querySelector('#topText');
    this.$bottomTextInput = document.querySelector('#bottomText');
    this.$imageInput = document.querySelector('#image');
    this.$downloadButton = document.querySelector('#downloadMeme');
    this.$defaultImage = document.querySelector('#defaultImage');
    this.image = this.$defaultImage;

    this.$canvas = document.querySelector('#imgCanvas');
    this.$context = this.$canvas.getContext('2d');
    this.deviceWidth = window.innerWidth;

    this.createCanvas();
    this.createMeme();
    this.addEventListeners();
  }

  createCanvas() {
    const canvasHeight = Math.min(480, this.deviceWidth-30);
    const canvasWidth = Math.min(640, this.deviceWidth-30);

    this.$canvas.height = canvasHeight;
    this.$canvas.width = canvasWidth;
  }

  createMeme(){
    // clear the image
    this.$context.clearRect(0, 0, this.$canvas.height, this.$canvas.width);

    // draw the image
    this.$canvas.height = this.image.height;
    this.$canvas.width = this.image.width;
    //this.resizeCanvas(this.$canvas.height, this.$canvas.width);
    this.$context.drawImage(this.image, 0, 0);
 
     // setup the text for drawing
    const fontSize = ((this.$canvas.width+this.$canvas.height)/2)*4/100;
    this.$context.font = `${fontSize}pt sans-serif`;
    this.$context.textAlign = 'center';
    this.$context.textBaseline = 'top';
    this.$context.lineJoin = 'round';
    this.$context.lineWidth  = fontSize/5;
    this.$context.strokeStyle = 'black';
    this.$context.fillStyle = 'white';

    // get the default text from the UI
    const topText = this.$topTextInput.value.toUpperCase();
    const bottomText = this.$bottomTextInput.value.toUpperCase();
    this.$context.strokeText(topText, this.$canvas.width/2, this.$canvas.height*(5/100));
    this.$context.fillText(topText, this.$canvas.width/2, this.$canvas.height*(5/100));
    this.$context.strokeText(bottomText, this.$canvas.width/2, this.$canvas.height*(90/100));
    this.$context.fillText(bottomText, this.$canvas.width/2, this.$canvas.height*(90/100)); 
  }

  addEventListeners() {
    this.createMeme = this.createMeme.bind(this);
    this.downloadMeme = this.downloadMeme.bind(this);
    //this.loadImage = this.loadImage.bind(this);
    this.resizeCanvas = this.resizeCanvas.bind(this);
    let inputNodes = [this.$topTextInput, this.$bottomTextInput];
    inputNodes.forEach(element => element.addEventListener('keyup', this.createMeme));
    inputNodes.forEach(element => element.addEventListener('change', this.createMeme));
    this.$downloadButton.addEventListener('click', this.downloadMeme);
  }    

  downloadMeme() {
    const imageSource = this.$canvas.toDataURL('image/png');
    this.$downloadButton.setAttribute('href', imageSource);
  }

  resizeCanvas(canvasHeight, canvasWidth) {
    let height = canvasHeight;
    let width = canvasWidth;
    this.$canvas.style.height = `${height}px`;
    this.$canvas.style.width = `${width}px`;
    while(height > Math.min(1000, deviceWidth-30) && width > Math.min(1000, deviceWidth-30)) {
      height /= 2;
      width /= 2;
      this.$canvas.style.height = `${height}px`;
      this.$canvas.style.width = `${width}px`;
    }
  }

  loadImage() {

  }
}
new Memes();

/*  
Create a class called Memes
- Part 1 - Setup the canvas and draw the default meme
  - Initialize instance variables for all of the ui elements in the constructor
      this.$topTextInput = 
      this.$bottomTextInput = 
      this.$imageInput = 
      this.$downloadButton = 
      this.$canvas = 
      // these are not in the book
      this.$defaultImage = document.querySelector('#defaultImage');
      this.image = this.$defaultImage
      this.$context = this.$canvas.getContext('2d');
      this.deviceWidth = window.innerWidth;
  - Write the method createCanvas
    - set the width of the canvas to the minimum of 640 and deviceWidth - 30
    - set the height of the canvas to the min of 480 and the deviceWidth
    - add a call to this method in the constructor
  - Write the method createMeme.  It should
    - clear the previous image from the page
    - draw the image
      - initialize the height and width of the canvas to the height and width of the (default) image
      - draw the image on the context
    - setup text drawing
      - initialize a local constant for the font size.  Here's the calculation   
        this.$canvas.width+this.$canvas.height)/2)*4/100;
      - set the font of the context to `${fontSize}pt sans-serif`
        Notice the template literal instead of concatenation!
      - set the textAlign property to center
      - set the textBaseline property to top
      - set the lineWidth property to 1/5 of the fontSize
      - set the strokeStyle (outline) property to black
      - set the fillStyle to white
    - draw the text
      - get the default top and bottom text from the ui and put both in a variable
      - make sure both of them are all caps
      - write them on the context 
      - don't forget to outline the text in black!
    - add a call to this method in the constructor
  END OF PART 1 - TEST AND DEBUG YOUR CODE - YOU SHOULD SEE THE MEME ON THE PAGE

- PART 2 - Change the code as the user types
  - Write the method addEventListeners
    - bind this to the class for the method createMeme
    - add the keyup event and the change event to the top and bottom text input elements
      - You can do this in the usual way OR you could create an array that contains the elements
        and then use the arrayName.forEach method and an arrow function
  - Add a call to this method in the constructor
  END OF PART 2 - TEST AND DEBUG YOUR CODE - YOU SHOULD SEE THE MEME CHANGE WHEN YOU TYPE

- PART 3 - Download the meme
  - Write the method downloadMeme
    - declare a constant imageSource and set it to the canvas converted to data
    - set the href attribute of the download button to the imageSource
  - Change the addEventListers method to include downloading
    - bind the class to the downloadMeme method
    - add an event handler to the click event for the download button
END OF PART 3 - TEST AND DEBUG YOUR CODE - YOU SHOULD BE ABLE TO DOWNLOAD THE MEME

- PART 4 - Choose an image
  - Write the method loadImage
    - if there's something in the file input on the page
      - declare and instantiate a FileReader object
      - set it's onload hander to an anonymous function that
        - set the image instance variable to a new image
        - set it's onload handler to an anonymou function that
          - calls the createMeme method
        - set the src property of the image to the result from reading the file
      - read the file
  - Change the addEventListeners
    - bind the class to the loadImage method
    - add an event handler to the change event for the file input element on the page
END OF PART 4 - TEST AND DEBUG YOUR CODE - YOU SHOULD BE ABLE TO PICK AN IMAGE FOR THE MEME

- Part 5 - Resize the image if the user picks a really big image
  - Write the method resizeImage
    resizeCanvas(canvasHeight, canvasWidth) {
      let height = canvasHeight;
      let width = canvasWidth;
      while(height > Math.min(1000, this.deviceWidth-30) && width > Math.min(1000, this.deviceWidth-30)) {
        height /= 2;
        width /= 2;
      }
      this.$canvas.style.height = `${height}px`;
      this.$canvas.style.width = `${width}px`;
    }
  - Change the method addEventListener
    - bind the class to the resizeImage method
    - call resizeCanvas in createMeme just before you draw the image
END OF PART 5 - TEST AND DEBUG YOUR CODE - YOU SHOULD BE ABLE TO PICK A REALLY LARGE IMAGE
*/
