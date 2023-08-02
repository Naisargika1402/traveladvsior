import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlaceData } from './api/index';


const App =()=>{
    const [places,setPlaces]=useState([]);
    const [coord,setCoord]=useState({});
    const [bound,setBound]=useState({});
    const [childClicked,setChildClicked]=useState();
    const [isLoading,setisLoading]=useState(false);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
    const [filteredPlaces,setFilteredPlaces]=useState([]);

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} })=>{
            setCoord({lat: latitude, lng: longitude});
        })
    },[])

    useEffect(()=>{
        const filPlaces = places?.filter((place) => place.rating > rating);
        setFilteredPlaces(filPlaces);
    },[rating])

    async function fetchData(type){
        const placedata = await getPlaceData(bound.sw, bound.ne,type);
        setPlaces(placedata?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setisLoading(false);
    }
    
    useEffect(()=>{
        //console.log(coord,bound);
        setisLoading(true);
        fetchData(type);
    },[type,coord,bound])

    return(
        <>
            <CssBaseline/>
            <Header setCoord={setCoord}/>
            <Grid container spacing={3} style={{ width:'100%' }}>
                <Grid item xs={12} md={5}>
                    <List 
                    places={filteredPlaces.length ? filteredPlaces : places} 
                    childClicked={childClicked} 
                    isLoading={isLoading}
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={7}>
                    <Map setCoord={setCoord} setBound={setBound} coord={coord} places={filteredPlaces.length ? filteredPlaces : places} setChildClicked={setChildClicked}></Map>
                </Grid>
            </Grid>
        </>
    )
}

export default App;