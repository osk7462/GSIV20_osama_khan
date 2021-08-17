import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {Link} from 'react-router-dom'

import {fetchMoviesList, setPage, setQuery} from '../redux'
import {connect} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiToolbar-root': {
        justifyContent: 'space-between'
      },
  },
  search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'silver',
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto'
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
        width: 500,
        [theme.breakpoints.down('xs')]: {
            width: 50,
          },
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
    }
 
}));

function Header({fetchMovies, setQuery, query, setPage, displaySearch}) {
  const classes = useStyles();
  const [q, setQ] = React.useState(query)  
  
  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      setQuery(q)
      fetchMovies(q)
    }
  }

  return (
      <AppBar position="static" color="inherit" className={classes.root}>
        <Toolbar  variant="dense">          
        {
          displaySearch
          ? <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              name="search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={q}
              onChange={e => setQ(e.target.value)}
              onKeyPress={e => handleKeyPress(e)}
            />
          </div>
          : <h4>Movie Detail</h4>  
        }
          <Link to='/'>
            <IconButton onClick={()=> { 
              setQuery("")
              setPage()
              fetchMovies("")            } 
              }>
                <HomeIcon />
            </IconButton> 
          </Link>
                   
        </Toolbar>
      </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    query: state.movies.query,
    displaySearch:state.header.displaySearch 
  }
} 

const mapDispatchToProps = (dispatch) => {
  return {
      fetchMovies: (query) => dispatch(fetchMoviesList(1, query)),
      setQuery: (query) => dispatch(setQuery(query)),
      setPage: ()=> dispatch(setPage()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (Header)