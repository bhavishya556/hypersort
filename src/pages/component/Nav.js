import React from 'react'
import profile from "../../assets/img/profile.png"
import "./nav.css"

const Nav = () => {
  return (
    <div className='nav-con'>
        Task Board 
        <img 
       className='nav-img' src={profile}></img>
    </div>
  )
}

export default Nav