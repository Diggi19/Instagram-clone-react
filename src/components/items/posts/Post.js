import React from 'react'
import './post.css'
import Singlepost from './Singlepost'
import InstagramEmbed from 'react-instagram-embed';
import Subpost from '../subpost/Subpost';

const Post= ({post,user}) => {
    
    return (
        <div className="post__holder">
            <div className="post__main">
                
                {post.map((post,i)=>{
                    return<Singlepost key={i} {...post} user={user}/>
                })}
                
                
            </div>
            <div className="post__sub">
            <InstagramEmbed
                url='https://instagr.am/p/Zw9o4/'
                clientAccessToken='123|456'
                maxWidth={320}
                hideCaption={false}
                containerTagName='div'
                protocol=''
                injectScript
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {}}
            />
            </div>
        </div>
    )
}

export default Post
