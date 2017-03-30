( ( $ ) => {
  let canvas;
  let colors = [];
  let originalPixels = [];
  let pixelsRgbCache = [];

  function setOriginalPixels() {
    $( this ).setPixels({
      x: 0, y: 0,
      width: canvas.width() * 2, height: canvas.height() * 2,
      each ( px ) {
        originalPixels.push( px );
      }
    });
  }

  function preparePixelsColorCache ( saturation ) {
    let self = this;
    let colorCounter = 0;
    let hsl;

    for ( let color of  colors ) {

      pixelsRgbCache.push( [] );

      $( self ).setPixels( {
        x: 0, y: 0,
        width: canvas.width() * 2, height: canvas.height() * 2,
        each ( px ) {
          hsl = tinycolor( px ).toHsl();
          hsl.h = color.hsl.h;
          hsl.s = saturation;
          pixelsRgbCache[ colorCounter ].push( tinycolor( hsl ).toRgb() );
        }
      } );

      colorCounter++;
    }
  }

  function setImagePixelsColor( source ) {
    let counter = 0;
    let coloredPixels = [];
    canvas.setPixels({
      x: 0, y: 0,
      width: canvas.width() * 2, height: canvas.height() * 2,
      each ( px ) {
        let cachedPixel = source[counter];
        if( !( !px.r && !px.g && !px.b ) ) {
          px.r = cachedPixel.r;
          px.g = cachedPixel.g;
          px.b = cachedPixel.b;

          coloredPixels.push( px );
        }

        counter++;
      }
    });

    console.log( coloredPixels.length );
  }

  function drawImage () {
    canvas.drawImage( {
      source: './../images/shirt.png',
      x: canvas.width() / 2, y: canvas.height() / 2,
      load: function () {
        setOriginalPixels.call( this );
        preparePixelsColorCache.call( this, 50 );
      }
    } );
  }

  function generateColors ( n ) {
    let abs = Math.floor( Math.abs( n ) );
    let part = Math.floor( 360 / abs );

    for (var i = 0; i < n; i++) {
      let color = tinycolor( { h: i * part, s: 90, l: 60 } );

      let hsl = color.toHsl();
      let rgb = color.toRgb();

      colors.push( { hsl, rgb, hslString: color.toHslString(), rgbString: color.toRgbString() } );
    }

    return colors;
  }

  function addColorsToDom ( n ) {
    let context = generateColors( n );
    let container = $('#colors');

    let index = 0;
    for ( let color of context ) {
      container.append( `<li class="color e-color" data-index="${index}" style="background-color: ${color.rgbString};"></li>` );
      index++;
    }

    $('.e-color').click( function ( event ) {
      let index = event.target.dataset.index;
      console.log( pixelsRgbCache[ index ].length );
      if ( pixelsRgbCache[ index ] ) setImagePixelsColor( pixelsRgbCache[ index ] );
    } );

    $('.e-reset').click( () => setImagePixelsColor( originalPixels ) );
  }

  function start () {
    canvas = $( 'canvas' );
    drawImage();
    addColorsToDom( 7 );
    preparePixelsColorCache( 1 );
  }

  $( document ).ready( start );
} )( $ );
