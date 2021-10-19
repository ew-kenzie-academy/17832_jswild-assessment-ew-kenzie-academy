const PUBLIC_KEY = "7fa605c741f09836731d1fddf05680de"               ;
const CORS_PRE   = "https://shrouded-mountain-15003.herokuapp.com/" ;
const IMGTAG      = document.querySelector(".pframe img");
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

function tupleToDouble(d,m,s){
    return d + m/60 + s/3600;
}

function getCity(city){
  city=city.toUpperCase();
  let t=tupleToDouble;
  const index={
      EDINBURGH    :[t(55.953 ,0 , 0), (-1)*t( 3.189 , 0 , 0)]
    , BELFAST      :[t(54 , 35,  47) , (-1)*t( 5 ,  55 , 48) ]
    , LONDON       :[t(51 , 30,  26) , (-1)*t( 0 ,   7 , 39) ]
    , BOSTON       :[t(42 , 21 , 29) , (-1)*t( 71 ,  3 , 49) ]
    , INDIANAPOLIS :[t(39 , 46 ,  7) , (-1)*t( 86 ,  9 ,  0) ]
    , SAN_DIEGO    :[t(32 , 42 , 54) , (-1)*t(117 ,  9 , 45) ]
    , SEATTLE      :[t(47 , 36 , 35) , (-1)*t(122 , 19 , 59) ]
    , LOS_ANGELES  :[t(34 ,  3 ,  0) , (-1)*t( 18 , 15 ,  0) ]
    , KYOTO        :[t(35 , 0 ,  42) , (+1)*t(135 , 46 ,  6) ]
    , MANHATTEN    :[t(40 , 47 ,  0) , (-1)*t( 73 , 58 ,  0) ]
    , BROOKLYN     :[t(40 , 41 , 34) , (-1)*t( 73 , 59 , 25) ]
    , THE_BRONX    :[t(40 , 50 , 14) , (-1)*t( 73 , 53 , 10) ]
    , NEW_YORK     :[t(40 , 42 , 46) , (-1)*t( 74 ,  0 , 22) ]
    , DENVER       :[t(39 , 44 , 21) , (-1)*t(104 , 69 ,  6) ]
    , PHILADELPHIA :[t(39 , 57 , 10) , (-1)*t( 75 ,  9 , 49) ]
    , BALTIMORE    :[t(37 , 17 , 22) , (-1)*t( 76 , 36 , 55) ]
    , MONTREAL     :[t(45 , 30 , 32) , (-1)*t( 73 , 33 , 15) ]
    , NOWHERE      :[t(90 , 00 , 00) , (-1)*t( 00 , 00 , 00) ]
  };
  return new Position( index[city][0] , index[city][1] );
}

/*watchPosition*/
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
    console.log( ":error: Use psrng instead");
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
    return (Math.random()>.5)?1:-1;
  }
  
  function rlat(){
    return rind()*Math.trunc(runif()*90)+runif(7);
  }
  
  function rlon(){
    return rind()*Math.trunc(runif()*180)+runif(7);
  }
/*watchPosition*/

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

const imgQueue=
  ["./turtle1.jpg"
  ,"./turtle2.jpg"
  ,"./turtle3.jpg"
  ,"./turtle4.jpg"
  ]
let pivot=0;

function clearQueue(){
  while(imgQueue.pop()!=undefined);
}

function refresh(){
    IMGTAG.src  = imgQueue[pivot];
}
function fillQueue(q){
  q.forEach(e => imgQueue.push(e));
}
function replaceQueue(q){
  clearQueue();
  fillQueue(q);
}
function rotR(){
  pivot=(pivot+1)%imgQueue.length;
  refresh();
}
function rotL(){
  pivot=(pivot-1+imgQueue.length)%imgQueue.length;
  refresh();
}

gvar=undefined;
jaja=[];
function main(){
  fetch(constructFetchURL())
    .then(re => re.json())
    .then(re => {
      gvar=re;
      console.log(":main: "+ re);
      arr=re.photos.photo;
      if(arr.length===0){
        console.log(":main: "+ "There are no photographs here :P");
        return;
      }
      newarr = arr.map( e=> constructImageURL(e));
      console.log ( ":main: [newarr] " + newarr );
      replaceQueue(  newarr );
      refresh();
      
  });
}

document.querySelector(".button.left"  ).addEventListener("click", rotL);
document.querySelector(".button.right" ).addEventListener("click", rotR);



// setTimeout(main,10000);
// currentLocation=getCity("INDIANAPOLIS");main()
// currentLocation=getCity("SAN_DIEGO");currentLocation.longitude+=1/60;currentLocation.latitude+=1;main()
// currentLocation=getCity("KYOTO");main()
// currentLocation=getCity("MONTREAL");main()
// currentLocation=getCity("EDINBURGH");main()
// currentLocation=getCity("kyoto");main()

function practice(e){
  if(e !== undefined)
    console.log(":practice: found ["+"undefined"+"]");
  else
    console.log(":practice: found ["+e+"]");
}