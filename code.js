const PUBLIC_KEY = "7fa605c741f09836731d1fddf05680de";

/* Step 1 */
/*mdn::watchPosition*/{
  const WATCH_OPTS = {
    enableHighAccuracy: false,
    timeout: 8000,
    maximumAge: 0
  };
  
  let currentLocation = {
    latitude :  -1,
    longitude:  -1,
    stamp:      -1
  };

  function w_success(pos) {
    let crd = pos.coords;
    currentLocation.latitude  = crd.latitude;
    currentLocation.longitude = crd.longitude;    
    currentLocation.stamp     = Date.now();
    printCurrent();
  }
  
  function w_failure(){
    currentLocation.latitude  = rlat();
    currentLocation.longitude = rlon;    
    currentLocation.stamp     = Date.now();
    printCurrent();     
  }
  
  function w_error(err) {
    console.warn(':error: [' + err.code + '] ' + err.message);
    setInterval(function(){ 
          console.log("There was an error"); 
      }, 
      3000
    );
  }
  
  function printCurrent(){
      timeid =      String(Date.now()).substr(7,10);
      console.log( `:print: <${timeid}> [lat] `  + currentLocation.latitude  );
      console.log( `:print: <${timeid}> [lon] `  + currentLocation.longitude );
      console.log( `:print: <${timeid}> [tim] `  + currentLocation.stamp     );
  }

  function runif(n=-1){
    if(n==-1 || typeof n !== "number")
      return Math.random();
    return Number(Math.random().toString().substr(0,n+2));
  }
  
  function rind(){
    if(Math.random()>.5)
      return 1;
    return -1;
  }
  
  function rlat(){
    return rind()*Math.trunc(runif()*90)+runif(7);
  }
  
  function rlon(){
    return rind()*Math.trunc(runif()*180)+runif(7);
  }
  
  /* Begin Watching */
  let w_id = navigator.geolocation.watchPosition(w_success, w_error, WATCH_OPTS);

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
