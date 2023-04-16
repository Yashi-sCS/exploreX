import React , {useState, useEffect} from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlacesData } from "./api";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App=()=>{
    const [places, setPlaces] = useState([]);
    const[childClicked, setChildClicked]= useState(null)

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState(null);

    const [isLoading, setIsLoading]= useState(false);
    const {type,setType} =useState('restaurants');
    const {rating,setRating} =useState('');
    

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude,longitude}}) =>{
            setCoordinates({lat:latitude, lng:longitude});
        })
    }, []);

    useEffect(() => {
        if (coordinates.lat && coordinates.lng) {
            setBounds({
                sw: {
                    lat: coordinates.lat - 0.1,
                    lng: coordinates.lng - 0.1,
                },
                ne: {
                    lat: coordinates.lat + 0.1,
                    lng: coordinates.lng + 0.1,
                },
            });
        }
    }, [type,coordinates]);

    useEffect (() => {
        
        if (bounds) {
            setIsLoading(true);
            getPlacesData( type,bounds.sw,bounds.ne)
            .then((data) => {
                setPlaces(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }, [ type,bounds]);

    return(
        <>
            <CssBaseline/>
            <Header/>
            <Grid container spacing={3} style={{width: '100%'}}>

                <Grid item xs={12} md={4}>
                    <List 
                    places={places}
                    childClicked={childClicked}
                    isLoading={isLoading}
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={places}
                        setChildClicked={setChildClicked}
                    />
                </Grid>

            </Grid>
        </>
    );
}
export default App;
