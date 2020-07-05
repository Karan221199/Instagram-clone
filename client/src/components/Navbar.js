// sun jb b hm anchor tag use krte h tb na page refresh hota h to uski jgh hm link use krte h

import React, {useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
const Navbar = ()=>{
  const {state,dispatch} = useContext(UserContext)
  const history=useHistory()
  const renderList = ()=>{
    if(state){
        return [
          <li><Link to="/profile">Profile</Link></li>,
          <li><Link to="/create">Create</Link></li>,
          <li> <button className="btn #c62828 red darken-3" 
          onClick={()=>{
          localStorage.clear()
          dispatch({type:"Clear"})
          history.push('/signin')

           } }

          >Logout
          </button></li>
        ]
    }
    else{
        return [
          <li><Link to="/signin">Signin</Link></li>,
          <li><Link to="/signup">SignUp</Link></li>
        ]
    }
  }

   return( 
  <nav>
  <div className="nav-wrapper white" >
    <Link to={state? "/" : "/signin"} className="brand-logo left">Instagram</Link>
    <ul id="nav-mobile" className="right hide-on-med-and-down">
      {renderList()}
    </ul>
  </div>
</nav>
)
}
export default Navbar