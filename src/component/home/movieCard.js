import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    maxWidth: 245,
    width: 245
  },
  media: {
    height: 300,
    width: '100%'
  },
});
// https://www.themoviedb.org/t/p/w600_and_h900_bestv2/
export default function MovieCard({original_title, id, overview, vote_average, poster_path }) {
  const classes = useStyles();
  const poster = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${poster_path}`
  return (
    <Link to={`detail/${id}`} >
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={poster}
          title={original_title}
        />
        <CardContent>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography gutterBottom variant="body1" component="h6">
            {original_title.substr(0,20)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {vote_average}
          </Typography>
            </div>
            <Typography variant="body2" color="textSecondary" component="p">
            {overview.substr(0,50)}...
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
  );
}
