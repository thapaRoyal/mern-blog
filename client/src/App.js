import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
} from 'react-router-dom';
import AddNewCategory from './components/Categories/AddNewCategory';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navigation/Navbar';
import Login from './components/Users/Login/Login';
import Register from './components/Users/Register/Register';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/add-category" exact component={AddNewCategory} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
