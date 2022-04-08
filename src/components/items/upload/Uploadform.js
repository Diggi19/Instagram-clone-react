import { Button, TextareaAutosize } from '@material-ui/core'
import React from 'react'
import { storage,db } from '../../../firebase'
import './upload.css'
import firebase from 'firebase'
const Uploadform = ({username,setcreatebox}) => {
    const [postdata,setpostdata] = React.useState({caption:"",imageurl:""})
    const [ progress,setprogress] = React.useState(0)
    const [preview,setpreview] = React.useState("")
    
    const handlechange = (e)=>{
        if (e.target.files[0]) {
            setpostdata({...postdata,imageurl:e.target.files[0]})
            setpreview(e.target.files[0].name)
        }
    } 

    const handleupload = (e)=>{
        e.preventDefault()
        const uploadimage = storage.ref(`images/${postdata.imageurl.name}`).put(postdata.imageurl)  // image.name is the file name 
        // this code will upload the image to firebase storage

        uploadimage.on(
            "state_changed",
            (snapshot)=>{
                // progress function
                // code below :-  as the data is being uploaded the progress count will change from 0 to 100
                const progress = Math.round(                                   
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100 
                )
                setprogress(progress)
            },
            (error)=>{
                console.log(error)
            },
            ()=>{
                // complete function
                // this will get us the uploaded image's url which we use to puch it to the object(firestore)
                storage
                    .ref("images")
                    .child(postdata.imageurl.name)
                    .getDownloadURL()
                    .then((url)=>{
                        //preview set
                        
                        // post data into the db
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption:postdata.caption,
                            imageurl:url,  // download url
                            username:username,
                        })
                        setprogress(0)
                        setpostdata({caption:"",imageurl:""})
                        setcreatebox(false)
                    })
            }

        )


    }
    console.log(preview)
    return (
        <div className="upload__container">
            <div className="upload__close" onClick={()=>setcreatebox(false)}>X</div>
            <div className="upload__form">
                <div className="upload__title"><h4>Create new post</h4></div>
                <form className="upload__main" noValidate autoComplete="off">
                    <progress className="upload__progress" value={progress} max="100" />
                    <div><TextareaAutosize aria-label="minimum height" minRows={3} placeholder="Add caption" value={postdata.caption} onChange={(e)=>setpostdata({...postdata,caption:e.target.value})} /></div>
                    <div className="file__holder">
                        <input className="file__select" type="file"  onChange={handlechange} />

                    </div>
                    <div className="upload__btn"><Button type="submit" onClick={handleupload}>Post</Button></div>
                </form>
            </div>
        </div>
    )
}

export default Uploadform
