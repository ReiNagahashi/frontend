import './App.css';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
           <Route path='/login' component={Login} exact />
           <Route path='/signup' component={Signup} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
