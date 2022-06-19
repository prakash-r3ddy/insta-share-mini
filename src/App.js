import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import SearchComponent from './components/SearchComponent'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import NotFound from './components/NotFound'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/search" component={SearchComponent} />
      <ProtectedRoute exact path="/my-profile" component={MyProfile} />
      <ProtectedRoute exact path="/users/:id" component={UserProfile} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </>
)

export default App
