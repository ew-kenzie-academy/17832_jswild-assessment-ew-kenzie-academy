const PUBLIC_KEY = "7fa605c741f09836731d1fddf05680de"               ;
const CORS_PRE   = "https://shrouded-mountain-15003.herokuapp.com/" ;
const history    = []                                               ;
let   currentLocation=null;

class Position{
  latitude  = null;
  longitude = null;
  stamp     = null;
  constructor(lat,lon){
    this.latitude  = lat;
    this.longitude = lon;
    this.stamp     = Date.now();
  }
}

const SCOTLAND     = new Position(57 + 57/60 + 11/3600 , -(11  + 20/60           ));
const BOSTON       = new Position(42 + 21/60 + 29/3600 , -(71  +  3/60 + 49/3600 ));
const INDIANAPOLIS = new Position(39 + 46/60 +  7/3600 , -(86  +  9/60           ));
const SAN_DIEGO    = new Position(32 + 42/60 + 54/3600 , -(117 +  9/60 + 45/3600 ));

/*mdn::watchPosition*/
  function w_default(lat,lon){
    currentLocation=new Position(lat,lon);
    history.push(currentLocation);
    printCurrent();
  }

  function w_success(pos) {    
    w_default(pos.coords.latitude,pos.coords.longitude);
  }
  
  function w_failure(){
    w_default(rlat(),rlon());
  }
  
  function w_error(err) {
    console.warn(':error: [' + err.code + '] ' + err.message);
    console.log( ":error: Use random psrng instead");
    w_failure();
    setInterval( w_failure , 16000);
  }
  
  function printCurrent(){
      timeid =      String(Date.now()).substr(7,10);
      console.log( `:at: <${timeid}> [lat] `  + currentLocation.latitude  );
      console.log( `:at: <${timeid}> [lon] `  + currentLocation.longitude );
      console.log( `:at: <${timeid}> [tim] `  + currentLocation.stamp     );
  }
  
  const w_OPTS = {
    enableHighAccuracy : false ,
    timeout            : 9999 ,
    maximumAge         : 0     ,
  };
  
  /* Begin Watching */
  console.log(":global: [thread-block] Please set location permission to Allow")
  let w_id = navigator.geolocation.watchPosition(
      w_success
    , w_error
    , w_OPTS
  );
  
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
/*mdn::watchPosition*/

function constructImageURL (photoObj) {
  return    "https://farm"
          + photoObj.farm 
          + ".staticflickr.com/" 
          + photoObj.server 
          + "/" + photoObj.id 
          + "_" + photoObj.secret 
          + ".jpg";
}

function constructFetchURL(){
  let srcURL
    =`https://flickr.com/services/rest/`
    +`?api_key=`+PUBLIC_KEY
    +`&format=json&nojsoncallback=1` 
    +`&method=flickr.photos.search` 
    +`&safe_search=1&per_page=5` 
    +`&lat=${currentLocation.latitude}` 
    +`&lon=${currentLocation.longitude}`  
    +`&text=turtle`;
  return CORS_PRE+srcURL;
}

let gvar   = undefined;
function main(){
  fetch(constructFetchURL())
    .then(re => re.json())
    .then(re => {
      console.log(re);
      gvar     = re;
      imageUrl = constructImageURL(gvar.photos.photo[0]);
      body     = document.querySelector(   "body" );
      lambda   = document.createElement( "img"  );
      lambda.src=imageUrl;
      body.append(lambda);
  });
}

// setTimeout(main,10000);
// currentLocation=INDIANAPOLIS;main()