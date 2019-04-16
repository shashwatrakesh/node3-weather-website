const request= require('request')

const geocode=(address, callback)=>{
const geoCodeurl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic3Jha2VzaCIsImEiOiJjanR0dzFreGkxYm1iNGRsbDE2Y3o0YnlwIn0.dqdJtlNoUZ8Uc5Y3X7TP3A&limit=1'


request({url: geoCodeurl, json:true}, (error, response)=>{
    if(error){
        callback('Unable to connect to internet', undefined)

    }
    else if(response.body.features.length===0){
        callback("Something went wrong", undefined)
    }
    else{
   const latitude=(response.body.features[0].center[1])
   const longitude=(response.body.features[0].center[0])
   const location=(response.body.features[0].place_name)

   callback(undefined, {
       latitude: latitude,
       longitude: longitude,
       location: location,
   })
    
   
    
}
})
}



module.exports={
    geocode: geocode,
}


