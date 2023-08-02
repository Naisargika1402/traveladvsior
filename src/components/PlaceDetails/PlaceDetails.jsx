import React from 'react';
import {Box,Card,CardMedia,Typography,CardActions,Button,Chip, CardContent} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';

import useStyles from './style'

const PlaceDetails = ({place, selected,refProp}) => {
    const classes = useStyles();
    //console.log(place);

    if (selected) refProp?.current?.scrollIntoView({block: 'start', behavior: 'smooth'});

    return(
        <Card elevation={6}>
            <CardMedia
                 style={{ height: 350}}
                 image={place.photo ? place.photo.images.large.url : 'https://images.indianexpress.com/2022/11/restaurant-cafe-pixabay-1200.jpg'}
                 title={place.name}
            />
            <CardContent className={classes.up}>
                <Typography gutterBottom variant="h5">{place.name}</Typography>
                <Box display="flex" justifyContent='space-between' mb={1}>
                    <Rating name="read-only" value={Number(place.rating)} readOnly/>
                    <Typography component="legend">{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
                </Box>
                {place.price&&(
                <Box display="flex" justifyContent="space-between">
                    <Typography component="legend">Price</Typography>
                    <Typography gutterBottom variant="subtitle1">
                        {place.price}
                    </Typography>
                </Box>)}
                <Box display="flex" justifyContent="space-between">
                    <Typography component="legend">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle1">
                        {place.ranking}
                    </Typography>
                </Box>
                {place?.awards?.map((award) => (
                <Box display="flex" justifyContent="space-between" my={1} alignItems="center">
                    <img src={award.images.small} />
                    <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                </Box>
                ))}
                {place?.cuisine?.map(({ name }) => (
                <Chip key={name} size="small" label={name} className={classes.chip} />
                ))}
                {place.address && (
                <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
                    <LocationOnIcon/>{place.address}
                </Typography>
                )}
                {place.phone && (
                <Typography variant="body2" color="textSecondary" className={classes.spacing}>
                    <PhoneIcon /> {place.phone}
                </Typography>
                )}
            </CardContent>
            <CardActions className={classes.mar}>
                <Button color="primary" onClick={() => window.open(place.web_url, '_blank')}>
                    Trip Advisor
                </Button>
                <Button color="primary" onClick={() => window.open(place.website, '_blank')}>
                    Website
                </Button>
            </CardActions>
        </Card>
    )
}

export default PlaceDetails;