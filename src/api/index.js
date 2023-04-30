import axios from "axios";

const URL =
"https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_API_KEY,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getRandomCoords = (start, end, numCoords) => {
  const data = [];
  while (numCoords--) {
    data.push(+(Math.random() * (end - start) + start).toFixed(4));
  }
  return data;
};

const weatherQuery = async (lat, lng) => {
  try {
    const { data } = await axios.get(
      'https://weatherapi-com.p.rapidapi.com/current.json',
      {
        params: {
          q: `${lat},${lng}`,
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_API_KEY,
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
      }
    );
    return `https://${data['current']['condition']['icon']}`;
  } catch (error) {
    console.log(error);
  }
  return -1;
};

export const getWeatherData = async (
  lat,
  lng,
  bounds,
  numCoords = 5,
) => {
  const lats = getRandomCoords(bounds.sw.lat, bounds.ne.lat, numCoords);
  const lngs = getRandomCoords(bounds.sw.lng, bounds.ne.lng, numCoords);

  lats.push(lat);
  lngs.push(lng);

  const data = [];

  for (let i = 0; i < lats.length; i++) {
    console.log(`index.js: ${lats[i]}, ${lngs[i]}`);
    const d = await weatherQuery(lats[i], lngs[i]);

    if (typeof d == 'string') {
      data.push([lats[i], lngs[i], d]);
    }
    console.log(`index.js: ${d}`);
  }

  return data;
};

// export const getWeatherData = async (lat, lng) => {
//   try {
//     if (lat && lng) {
//       const { data } = await axios.get(
//         "https://weatherapi-com.p.rapidapi.com/current.json",
//         {
//           params: { q: `${lat},${lng}` },
//           headers: {
//             "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_API_KEY,
//             "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
//           },
//         }
//       );
//       console.log(`index.js: ${data.current.condition.icon}`);
//       return data;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };