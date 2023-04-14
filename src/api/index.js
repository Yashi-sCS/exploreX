import axios from "axios";

const URL ='https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'



const options = {
  params: {
    bl_latitude: '11.847676',
    tr_latitude: '12.838442',
    bl_longitude: '109.095887',
    tr_longitude: '109.149359',
  },
  headers: {
    'X-RapidAPI-Key': 'ae2d36b64cmshfbea10d7436e0eep1bc842jsnb7a7060ef86b',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }
};




 export const getPlacesData = async () => {
    try{
    const { data : {data}} =await axios.get(URL, options);

    return data;

    } catch (error) {
        console.log(error)
    }
}