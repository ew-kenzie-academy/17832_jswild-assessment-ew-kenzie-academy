PUBLIC_KEY = "7fa605c741f09836731d1fddf05680de";

/* What is the abstraction of a promise? */

/* Step 1 */
/*mdn::watchPosition*/{
  let id, target, current, options;
  target = {
    latitude : 0,
    longitude: 0
  };
  current = {
    latitude :         -1,
    longitude:         -1,
    stamp:             -1
  };
  options = {
    enableHighAccuracy: false,
    timeout: 8000,
    maximumAge: 0
  };

  function success(pos) {
    let crd = pos.coords;
    if (target.latitude === crd.latitude 
        && target.longitude === crd.longitude){
      console.log('Congratulations, you reached the target');
      navigator.geolocation.clearWatch(id);
    }
    else{
      current.latitude  = crd.latitude;
      current.longitude = crd.longitude;    
      current.stamp     = Date.now();
      printCurrent();
    }
  }
  function error(err) {
    console.warn(':error: <' + err.code + '> ' + err.message);
  }
  
  function printCurrent(){
      timeid =      String(Date.now()).substr(9);
      console.log( `:print: <${timeid}> [lat] `  + current.latitude  );
      console.log( `:print: <${timeid}> [lon] `  + current.longitude );
      console.log( `:print: <${timeid}> [tim] `  +  current.stamp     );
    
  }

  /* Begin Watching */
  id = navigator.geolocation.watchPosition(success, error, options);

/*mdn::watchPosition*/}

/* Step 2 */


 queryURL=`https://flickr.com/services/rest/`
          +`?api_key=993fake589fake6cdfakefcb` 
          +`&format=json&nojsoncallback=1` 
          +`&method=flickr.photos.search` 
          +`&safe_search=1&per_page=5` 
          +`&lat=39.76574` 
          +`&lon=-86.1579024`  
          +`&text=dog`;
    
 /*
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
