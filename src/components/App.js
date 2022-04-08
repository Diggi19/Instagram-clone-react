import React from 'react'
import Header from './items/header/Header'
import Post from './items/posts/Post'
import Authform from './items/authform/Authform'
import {auth, db} from '../firebase'
import Uploadform from './items/upload/Uploadform'
const App = ()=>{
    const [post,setpost] = React.useState([])
    //modals
    const [authbox,setauthbox] = React.useState(false)
    const [createbox,setcreatebox] = React.useState(false)
    const[signuser,setsignuser] = React.useState({username:"",email:"",phone:"",password:""})
    const[user,setuser] = React.useState(null)

    React.useEffect(()=>{
        db.collection('posts').orderBy('timestamp','desc').onSnapshot((snapshot)=>{
            setpost(snapshot.docs.map(doc=>({
                id:doc?.id,
                posts:doc?.data()
            })))
        })
    },[])

    React.useEffect(()=>{
        //this listens every time authentication change happens i.e login , logout or creating user
        // this will keep u logged in even if u refresh
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            if (authUser) {
                //user has logged in 
                setuser(authUser)
                localStorage.setItem("porfile",JSON.stringify(authUser))
                // console.log(authUser)
            } else {
                //user had logged out
                localStorage.clear()
                setuser(null)
            }

            
        })

        return ()=>{
            // pefrom some cleanup action
            unsubscribe()
        }
    },[user,signuser.username])
    console.log("user info below")
    console.log(user)
    return(
        <div className="app__container">
            <div className="app__header">
                <Header setauthbox={setauthbox} user={user} setuser={setuser} setcreatebox={setcreatebox}/>   
            </div>

            <div className="app__posts">
                <Post post={post} user={user}/>
            </div>

            <div className={createbox?"app__uploadshow":"app__uploadhide"}>
                {user?.displayName ? (
                    <div >
                        <Uploadform username={user?.displayName} setcreatebox={setcreatebox}/>
                    </div>
                ):(<h3>please login to create post</h3>)}
            </div>
            
            <div className={authbox?"Auth__moduleshow":"Auth__modulehide"}>
                <div className="Auth__form">
                    <Authform setauthbox={setauthbox} signuser={signuser} setsignuser={setsignuser} />
                </div>
            </div>
        </div>
    )
}

export default App