import React from 'react'
import './header.css'
import { Button } from '@material-ui/core'
import { auth } from '../../../firebase'
const Header = ({setauthbox,user,setuser,setcreatebox})=>{

    return(
        <div className="header__container">
            <div className="header__imageholder">
                <img 
                    className="header__image"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt="instagram-logo"
                />
            </div>
            <div className="header__btnholder">
                {user?(<Button variant="contained" onClick={()=>setcreatebox(true)}>Add</Button>):""}
                {user ? (<Button variant="contained" onClick={()=>auth.signOut()}>logout</Button>):(<Button variant="contained" onClick={()=>setauthbox(true)}>login</Button>)}
                
            </div>
            
            
        </div>
    )
}


export default Header