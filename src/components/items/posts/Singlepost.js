import React from 'react'
import {Avatar, Button} from '@material-ui/core'
import './post.css'
import { db } from '../../../firebase'
import firebase from 'firebase'

const Singlepost = ({id,posts,user})=> {
    const{username,imageurl,caption} = posts
    const [ commentIn,setcommentIn] = React.useState("")
    const [comment,setcomment] = React.useState([])
    React.useEffect(()=>{
        let unsubscribe;
        if (id) {
            unsubscribe = db    
                .collection("posts")                  // main collection
                .doc(id)                              // id of the individual post
                .collection("comments") 
                .orderBy('timestamp','desc')              // comments collection inside individual post
                .onSnapshot((snapshot)=>{             // fetching comments inside the comments collection and setting to comment state
                    setcomment(snapshot.docs.map((doc)=>doc.data()))
                })
        }


        return ()=>{
            unsubscribe()
        }
    },[id])

    const postcomment = (e)=>{
        e.preventDefault()
        db.collection("posts").doc(id).collection("comments").add({
            Comusername:user?.displayName,
            text:commentIn,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()

        })
        setcommentIn("")
    }

    return (
        <div className="post__single">
            <div className="post__header">
                        {/* avatar */}
                        <Avatar
                            className="post__avatar"
                            alt={username.toUpperCase()}
                            src='hh'
                        />
                        {/* username */}
                        <h3>{username}</h3>
                        
                        {/* address */}
                        {/* edit btn */}
                </div>

                <div className="post__imageholder">
                    {/* image */}
                    <img className="post__image" src={imageurl} alt="test-image"/>
                </div>
           
                <div className="post__body">
                    <div className="post__caption">
                        {/* username &caption */}
                        <h3><strong>{username} :</strong> {caption}</h3>
                    </div>
                    {/* comment */} 
                    {comment ? (comment.map((comment,i)=>{
                        return(
                            <div kay={i}><h4><strong>{comment?.Comusername}:</strong>{comment?.text}</h4></div>
                        )
                    })):("")}

                 </div>
                <div className="post__commentbox">
                    {/* comment input */}
                    {user?.displayName ? (
                        <form method="POST" className="post__commentform" onSubmit={postcomment}>
                        <input className="post__comment" type="text" placeholder="add comment" value={commentIn} onChange={(e)=>setcommentIn(e.target.value)}/>
                        <Button type="submit">Add</Button>
                    </form>
                    ):""}
                    
                </div>
        </div>
    )
}

export default Singlepost
