PUBLIC_KEY = "7fa605c741f09836731d1fddf05680de";

/* What is the abstraction of a promise? */

/* Step 1 */
/*
  + https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
  + https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition
  + [2021-10-10 19:48] There exists a small dialog notification that pops
    out at the top of the firefox window. A message asks whether we want
    to allow something to know our location. It asks me every time that I make
    a call and perhaps there is a checkbox to /always allow/.
  
*/

/* Boilerplate */{
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  /*
  navigator.geolocation.getCurrentPosition(success, error, options);

    19:56:17.129 Your current position is:   code.js:24:11
    19:56:17.130 Latitude : 39.9924981       code.js:25:11
    19:56:17.130 Longitude: -105.14479       code.js:26:11
    19:56:17.130 More or less 23.543 meters. code.js:27:11
  */
/* Boilerplate */}

// xi=undefined; navigator.geolocation.getCurrentPosition( (lambda) =>{ xi=lambda } )

/* Step 2 
  Example Query: 
   https://flickr.com/services/rest/ \
    ?api_key=993fake589fake6cdfakefcb \
    &format=json&nojsoncallback=1 \
    &method=flickr.photos.search \
    &safe_search=1&per_page=5 \
    &lat=39.76574 \
    &lon=-86.1579024  \
    &text=dog   # the search term
  
  Same Query sent to a CORS proxy:
  https://shrouded-mountain-15003.herokuapp.com/  \
    https://flickr.com/services/rest/  \
      ?api_key=993c9d05898cfd6cd16b4fcb18401be0 \
      &format=json \
      &nojsoncallback=1 \
      &method=flickr.photos.search \
      &safe_search=1 \
      &per_page=5 \
      &lat=39.76574 \
      &lon=-86.1579024 \
      &text=dog \
*/