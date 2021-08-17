import React from 'react'
import {
    useParams
} from 'react-router-dom'

import {connect} from 'react-redux'
import {fetchMoviesList, nextPage, displaySearch} from '../../redux'
import MovieCard from './movieCard'

import {Grid} from '@material-ui/core'

function HomePage({moviesState, fetchMovies, nextPage, setDisplaySearch}) {
    const {page} = moviesState

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop
            >= document.documentElement.offsetHeight)
            {
                nextPage()
            }
    }
    
    React.useEffect(()=>{
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

        

    React.useEffect(()=>{
        fetchMovies(page, moviesState.query)
        setDisplaySearch((true))
    }, [page])

    console.log("the qury is", moviesState.query)
    console.log("tthe page is ", page)
    return (
        <Grid container justifyContent="center"  spacing={2} style={{flexGrow: 1, marginTop: 10, marginBottom: 100}}>
                  {
                     moviesState.movies.map((movie, index) => {
                        return (
                            <Grid key={index} item >
                            <MovieCard  {...movie} />
                            </Grid>
                        )
                    })
            }
                     { moviesState.loading
                      ? <h2>Loading...</h2>
                      : moviesState.error 
                      ? <h2>{ moviesState.error }</h2>
                      : ""
                      }
                </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
       moviesState: state.movies,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMovies: (page, query) => dispatch(fetchMoviesList(page, query)),
        nextPage: () => dispatch(nextPage()),
        setDisplaySearch: (display) => dispatch(displaySearch(display))

    }
}

export default connect(mapStateToProps, mapDispatchToProps) (HomePage)
