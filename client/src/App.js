
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingView from './views/LandingView/LandingView';
import HomeView from './views/HomeView/HomeView';
import CountryDetailsView from './views/CountryDetailsView/CountryDetailsView';
import AddActivityView from './views/AddActivityView/AddActivityView';
import NotFoundView from './views/NotFoundView/NotFoundView';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={LandingView}/>
        <Route path='/home' component={HomeView}/>
        <Route path='/details/:id' component={CountryDetailsView}/>
        <Route path='/add' component={AddActivityView}/>
        <Route path='*' component={NotFoundView}/>      
      </Switch>
    </Router>
  );
}

export default App;
