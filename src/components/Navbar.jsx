import React from "react";
import { Link } from "react-router-dom";




function Navbar() {


  return (

    <div >
    <input id="menu__toggle" type="checkbox" />
    <label className="menu__btn" htmlFor="menu__toggle">
      <span></span>
    </label>

    <ul className ="menu__box">
      <li><Link className="menu__item" href="#" to="/">Logout</Link></li>
      <li><Link className="menu__item" href="#" to="/home">Home</Link></li>

    </ul>
  </div>

  );


}

export default Navbar; 