import axios from "axios";

const URL ='https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'






 export const getPlacesData = async (type,sw,ne) => {
    try{
    const { data : {data}} =await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
        
            params: {
                bl_latitude: sw.lat ,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
              'X-RapidAPI-Key': 'ae2d36b64cmshfbea10d7436e0eep1bc842jsnb7a7060ef86b',
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
          
    });

    return data;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getWeatherData = async (lat, lng) => {
    try {
      if (lat && lng) {
        const { data } = await axios.get('https://weather1395.p.rapidapi.com/temperature', {
            params: {url: 'Casablanca'},
            headers: {
              'X-RapidAPI-Key': 'ae2d36b64cmshfbea10d7436e0eep1bc842jsnb7a7060ef86b',
              'X-RapidAPI-Host': 'weather1395.p.rapidapi.com'
            }
        });
  
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };