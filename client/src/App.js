import React,{useEffect,createContext,useReducer,useContext} from 'react';
import Navbar from './components/Navbar'
import "./App.css"
import Home from './components/screens/Home'
import Profile from './components/screens/Profile'
import SignUp from './components/screens/SignUp'
import Signin from './components/screens/Signin'
import CreatePost from './components/screens/CreatePost'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import {reducer,initialState} from './reducers/userReducer'
export const UserContext= createContext()

const Routing=()=>{
  const history=useHistory()
  const {state,dispatch} =useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    //  history.push('/')
    }
    else
    {
      history.push('/signin')
    }
  },[])
  return(
    <Switch>
    <Route exact path="/">
    <Home />
  </Route>

  <Route path="/signin">
    <Signin />
  </Route>

  <Route path="/Signup">
    <SignUp />
  </Route>

  <Route path="/profile">
    <Profile />
  </Route>
  <Route path="/create">
    <CreatePost />
  </Route>
  </Switch>

  )
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
   <Navbar />
  <Routing />
   </BrowserRouter>
   </UserContext.Provider>
    
  );
}

export default App;
