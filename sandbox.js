/*
  + https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
  + https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition
  + https://www.w3schools.com/JS//js_async.asp
  + https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
  + What is the abstraction of a promise? 
  + [2021-10-10 19:48] There exists a small dialog notification that pops
    out at the top of the firefox window. A message asks whether we want
    to allow something to know our location. It asks me every time that I make
    a call and perhaps there is a checkbox to /always allow/.
  + https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition
  + https://stackoverflow.com/questions/46879570/call-a-javascript-function-infinitely
  + https://en.wikipedia.org/wiki/Latitude
  + https://en.wikipedia.org/wiki/Longitude
*/

/* MDN Boilerplate */{  
  let options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    let crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }


  navigator.geolocation.getCurrentPosition(success, error, options);
  
  /*
    19:56:17.129 Your current position is:   code.js:24:11
    19:56:17.130 Latitude : 39.9924981       code.js:25:11
    19:56:17.130 Longitude: -105.14479       code.js:26:11
    19:56:17.130 More or less 23.543 meters. code.js:27:11
  */
  
/* Boilerplate */}

/* Assign a variable  in the outer scope */{
  xi=undefined;
  navigator.geolocation.getCurrentPosition( (lambda) =>{ xi=lambda } )
/* Assign */}

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
      console.log(  "[lat] "  + current.latitude  );
      console.log(  "[lon] "  + current.longitude );
      console.log(  "[time] " + current.stamp     );
    
  }

  id = navigator.geolocation.watchPosition(success, error, options);

/*mdn::watchPosition*/}







// test="https://www.flickr.com/services/rest/?api_key=7fa605c741f09836731d1fddf05680de&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=-12.0775241&lon=161.3727767&text=turtle"



async function getPos(){
    let lat=0;
    let lon=0;
    await navigator.geolocation.getCurrentPosition( (pos) =>{
      lat=pos.coords.latitude;
      lon=pos.coords.longitude;
      console.log("[lat] "+ lat);
      console.log("[lon] "+ lon);
    });
    console.log("[lat] "+ lat);
    console.log("[lon] "+ lon);
    return {lat,lon};
}

xi=null;
getPos().then(r => r).then(r => xi = r);



/* Step 2 /*
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

/* Step 3 */
/*
  + A confusing workflow descended from exception mechanics.
  + https://javascript.info/fetch
  + https://www.flickr.com/services/api/flickr.photos.search.html
  + https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  + https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
*/

async function lambda(src="https://shrouded-mountain-15003.herokuapp.com/https://www.yahoo.com"){
  response = await fetch(src);
  json=undefined;
  if (response.ok)// if HTTP-status is 200-299
    // get the response body
    json = await response.json();
  else 
    alert("HTTP-Error: " + response.status);
  return json;
}

src = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
response = await fetch(src);
commits = await response.json(); 

src = "https://shrouded-mountain-15003.herokuapp.com/https://www.yahoo.com/";
response = await fetch(src);
commits = await response.json();

async function getDocument(src = "https://www.yahoo.com/",cors=true){
  if(cors)
    src="https://shrouded-mountain-15003.herokuapp.com/"+src;
  lambda=undefined;
  fetch(src)
    .then(response => response.text())
    .then(result => {lambda=result});
  return Promise.resolve(lambda);
}

/*<save 0>*/{
/* NoScript gets in the way of fetching sometimes.
*/
lambda=undefined;
source = "https://www.google.com/"
cors=true
  if(cors)
    source="https://shrouded-mountain-15003.herokuapp.com/"+source;
  lambda=undefined;
  fetch(source)
    .then(response => response.text())
    .then(result => {console.log(result);});
/*<save>*/}

/*<save 1>*/{
/* NoScript gets in the way of fetching sometimes.
*/
lambda=undefined;
source = "https://www.yahoo.com/"
cors=true
  if(cors)
    source="https://shrouded-mountain-15003.herokuapp.com/"+source;
  lambda=undefined;
  fetch(source)
    .then(response => response.text())
    .then(result => {console.log(result);});
/*<save>*/}

/*<save 2>*/{
/* NoScript gets in the way of fetching sometimes.
*/
lambda=undefined;
source = "https://www.yahoo.com/"
cors=true
  if(cors)
    source="https://shrouded-mountain-15003.herokuapp.com/"+source;
  lambda=undefined;
  fetch(source)
    .then(response => response.text())
    .then(result => {lambda=result;});
/*<save>*/}

/*<save 3>*/{
  target="https://www.yahoo.com/"
  CORS_PRE="https://shrouded-mountain-15003.herokuapp.com/";
  fetch(CORS_PRE+target)
    .then(response => response.text())
    .then(data => console.log(data));
/*<save 3>*/}
  
 /*<save 4>*/{
  target="https://www.yahoo.com/"
  CORS_PRE="https://shrouded-mountain-15003.herokuapp.com/";
  url=CORS_PRE+target;
  response = await fetch(url);
  typeof response; // Object
  text = await response.text();
  document.innerHTML=text;
/*<save>*/}

 /*<save 4>*/{
  target="https://developer.mozilla.org/en-US/docs/Tools/Web_Console/The_command_line_interpreter";
  CORS_PRE="https://shrouded-mountain-15003.herokuapp.com/";
  url=CORS_PRE+target;
  response = await fetch(url);
  typeof response; // Object
  text = await response.text();
  document.innerHTML=text;
/*<save>*/} 

/*<save 5>*/{
  async function lambda(){
    target="https://developer.mozilla.org/en-US/docs/Tools/Web_Console/The_command_line_interpreter";
    CORS_PRE="https://shrouded-mountain-15003.herokuapp.com/";
    url=CORS_PRE+target;
    response = await fetch(url);
    typeof response; // Object
    promise = await response.text();
    return promise;
  }
  mu=lambda();
  mu.then(v => console.log(v));
  lambda().then(v => console.log(v))
/*<save>*/}

/*<save 6>*/{
  /* about:blank */
  async function lambda(){
    target="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch";
    CORS_PRE="https://shrouded-mountain-15003.herokuapp.com/";
    url=CORS_PRE+target;
    response = await fetch(url);
    typeof response; // Object
    promise = await response.text();
    return promise;
  }
  lambda().then(v => console.log(v))
/*<save>*/}