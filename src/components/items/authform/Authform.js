import React from 'react'
import { Button, TextField } from '@material-ui/core'
import { auth } from '../../../firebase'
import './Authform.css'
const Authform = ({setauthbox,signuser,setsignuser}) => {
    const[isSignUp,setisSignUp] = React.useState(false)
    const [loguser,setloguser] = React.useState({email:"",password:""})
    
    const signup=(e)=>{
        e.preventDefault()
        auth.createUserWithEmailAndPassword(signuser.email,signuser.password) //creates a new user with entered email and password
            .then((authuser=>{
                return authuser.user.updateProfile({
                    displayName:signuser.username,    // the displayname property inside the firebase auth object is given the value user enters while creating account
                })
            }))
            .catch((err)=>alert(err.message))
        setsignuser({username:"",email:"",password:""})

        //setting off model
        setauthbox(false)
    }

    const login = (e)=>{
        e.preventDefault()
        auth.signInWithEmailAndPassword(loguser.email,loguser.password)  // this handles the login process by matching email and password
            .catch((err)=>alert(err.message))

        setloguser({email:"",password:""})

        //setting off model
        setauthbox(false)
        
    }



    if (isSignUp) {
        return(
            <div className="form__container">
            <div className="form__close" onClick={()=>setauthbox(false)}>X</div>
            <div><img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="instagram"/></div>
            
            <div className="form__subtitle"><h4> Create your account now</h4></div>
            <form  noValidate autoComplete="off" className="form__main" method='POST' onSubmit={signup}>
                <div className="form__field">
                <TextField id="standard-basic" label="Username" type="text" value={signuser.username} onChange={(e)=>setsignuser({...signuser,username:e.target.value})}/>
                </div>
                <div className="form__field">
                    <TextField id="standard-basic" label="Email" type="text" value={signuser.email} onChange={(e)=>setsignuser({...signuser,email:e.target.value})}/>
                </div>              
                <div className="form__field">
                    <TextField id="standard-basic" label="Password" type="password" value={signuser.password} onChange={(e)=>setsignuser({...signuser,password:e.target.value})}/>
                </div>
                <div className="form__btn" ><Button type="submit">Signup</Button></div>


            </form>
            <div className="form__footer"><h4> Already have an account ? <span onClick={()=>setisSignUp(false)} className="form__highlight">Login</span></h4></div>

        </div>    
        )
    }
    return (
        <div className="form__container">
            <div className="form__close" onClick={()=>setauthbox(false)}>X</div>
            <div><img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="instagram"/></div>
            <div className="form__subtitle"><h4> Login and enjoy</h4></div>
            <form  noValidate autoComplete="off" className="form__main" method='POST' onSubmit={login} >
                <div className="form__field">
                    <TextField id="standard-basic" label="Email" value={loguser.email} onChange={(e)=>setloguser({...loguser,email:e.target.value})}/>
                </div>               
                <div className="form__field">
                    <TextField id="standard-basic" label="Password" type="password" value={loguser.password} onChange={(e)=>setloguser({...loguser,password:e.target.value})}/>
                </div>
                <div className="form__btn"><Button type="submit">LOGIN</Button></div>

            </form>
            <div className="form__footer"><h4> Don't have an account ? <span onClick={()=>setisSignUp(true)} className="form__highlight">Create</span></h4></div>

        </div>
    )
}

export default Authform
