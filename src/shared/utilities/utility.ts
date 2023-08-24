export class Utility{

    public static getCurrentLocationCoordinates(){
        const coords = {longitude: 0, latitude: 0}
        if(!navigator.geolocation){
            console.log("please allow location access");
          }else{
            navigator.geolocation.getCurrentPosition((pos)=>{
                coords.latitude =  pos.coords.latitude;
                coords.longitude = pos.coords.longitude;

            }, err=>{
                console.log(err);
              });
          }
          return coords;
    }

    
}