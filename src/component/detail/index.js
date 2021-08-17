import React from 'react'
import {
    useParams
} from 'react-router-dom'

import {Container} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import axios from 'axios'
import { displaySearch } from '../../redux'
import {connect} from 'react-redux'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        marginLeft: -5,
        marginTop: 20,
        [theme.breakpoints.down('xs')]: {
            display: 'block'
        }
    },
    poster: {
        marginRight: 10,
        
        '& img': {
            height: 450,
            marginTop: 20,

        }
    }
}))

const initialMovieState = {
    loading: true,
    movie: {},
    error: ''
}

const initialCreditState = {
    loading: false,
    actors: [],
    director: '',
    error: ''
}

function DetailPage({setDisplaySearch}) {
    const {movie_id} = useParams()
    const [movieState, setMovieState] = React.useState(initialMovieState)
    const [creditState, setCreditState] = React.useState(initialCreditState)
    const API_KEY = process.env.REACT_APP_MOVIEDB_API_KEY
    const moviDetailUrl = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
    const movieCreditUrl = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`
    const classes = useStyles();
    const fetchMovie = () => {
        setMovieState({...movieState, loading:true})
        axios.get(moviDetailUrl)
        .then(response => {
            setMovieState({...movieState, loading:false, movie: response.data, error: ''})
        })
        .catch(error => {
            setMovieState({...movieState, loading:false, movie: {}, error: error.message})
        })
    }

    const fetchCredits = () => {
        setCreditState({...creditState, loading:true})
        axios.get(movieCreditUrl)
        .then(response => {
            const actors = response.data.cast.slice(0, 5)
            const director = response.data.crew.filter(crew => crew.job.toLowerCase()==='director')[0].original_name

            setCreditState({...creditState, loading:false, actors: actors, director: director, error: ''})
        })
        .catch(error => {
            setCreditState({...creditState, loading:false, actors: [], director: '', error: error.message})        })
    }

    React.useEffect(()=> {
        setDisplaySearch((false))
        fetchMovie()
        fetchCredits()
    }, [])

    return (
        <Container>
            {
                movieState.loading
                ? <h2>Loading ...</h2>
                : movieState.error 
                    ? <h2>{movieState.error}</h2>
                    : <div className={classes.root}>
                      <div className={classes.poster}>
                            <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movieState.movie.poster_path}`} alt=""  />
                        </div>
                        <div>
                           <h3>{movieState.movie.original_title} <span style={{opacity: 0.5}}>({movieState.movie.vote_average})</span></h3>
                           <p>{movieState.movie.release_date.substr(0, 4)} | {movieState.movie.runtime}M | {creditState.director}</p>
                           <p>
                               {creditState.actors.map(actor => {
                                   return actor.original_name + " |"
                               })}
                           </p>
                           <p>description: {movieState.movie.overview}</p>
                        </div>
                      </div>
            }
        </Container>

    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setDisplaySearch: (display) => dispatch(displaySearch(display))

}
}


export default connect(null, mapDispatchToProps) (DetailPage)
