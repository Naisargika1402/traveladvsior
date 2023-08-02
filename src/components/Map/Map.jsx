import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './style';

const Map = ({setCoord, setBound, coord, places, setChildClicked}) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');

    //const coordinates= {lat: 0,lng: 0};
    //AIzaSyDrcvw3F5FeCtBknYGphDULV5HSR_yp0wY  AIzaSyC7BOdygW1B94uwLUMsNkQ8w0lXLatOQW8
    //console.log(coord);
    return(
        <div className={classes.mapContainer}>
          <GoogleMapReact
            bootstrapURLKeys={{key:'AIzaSyC7BOdygW1B94uwLUMsNkQ8w0lXLatOQW8'}}
            defaultCenter={coord}
            center={coord}
            defaultZoom={16}
            margin={[50,50,50,50]}
            options={''}
            onChange={(e)=>{
              console.log(e);
              setCoord(e.center);
              setBound({ne: e.marginBounds.ne, sw: e.marginBounds.sw});
            }}
            onChildClick={(child) => setChildClicked(child)}
          >
          {places?.map((place,i)=>(
              <div
                className={classes.markerContainer}
                lat={Number(place.latitude)}
                lng={Number(place.longitude)}
                key={i}
              >
                {isDesktop?(
                  <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://images.indianexpress.com/2022/11/restaurant-cafe-pixabay-1200.jpg'}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>  
                ) : (
                  <LocationOnOutlinedIcon color="primary" fontSize="large" />
                )
                }
              </div>
          ))
          }
          </GoogleMapReact>  
        </div>
    )
}

export default Map;