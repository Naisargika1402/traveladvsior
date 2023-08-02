import axios from 'axios';

export const getPlaceData = async(sw, ne, type) =>{
    try {
        const { data : {data} } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
              },
              headers: {
                'X-RapidAPI-Key': 'd600e94fc1msh4e3182cdd95f9e8p161c60jsn7b07fc270acc',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
              }
        });
        //const places = data?.filter((filtplace)=>(filtplace.name));
        console.log("hi",data);
        return data;
    } catch (error) {
        console.error(error);
    }
}