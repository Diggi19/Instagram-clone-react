import { Avatar } from '@material-ui/core'
import React from 'react'
import './subpost.css'
const Subpost = () => {
    return (
        <div className="sub__container">
            {/* userimage */}
            {/* username */}
            {/* email */}
            <div>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className="sub__avatar" />

            </div>
            <div>
                <h2>Username</h2>
                <h3>email</h3>
            </div>
            

        </div>
    )
}

export default Subpost
