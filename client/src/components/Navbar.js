// sun jb b hm anchor tag use krte h tb na page refresh hota h to uski jgh hm link use krte h

import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = ()=>{
   return( 
  <nav>
  <div className="nav-wrapper white" >
    <Link to="/" className="brand-logo left">Instagram</Link>
    <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li><Link to="/signin">Signin</Link></li>
      <li><Link to="/signup">SignUp</Link></li>
      <li><Link to="/profile">Profile</Link></li>
      <li><Link to="/create">Create</Link></li>
    </ul>
  </div>
</nav>
)
}
export default Navbar