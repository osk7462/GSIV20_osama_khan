
import Header from './component/Header';
import HomePage from './component/home'
import DetailPage from './component/detail'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import ErrorPage from './component/errorPage';
import {Provider} from 'react-redux'
import store from './redux/store'

function App() {
  
  return (
    <Provider store={store}>
      <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/detail/:movie_id' component={DetailPage} />
        <Route exact path='*' component={ErrorPage} />
      </Switch>
      </Router>
    </Provider>
  );
}

export default App;
