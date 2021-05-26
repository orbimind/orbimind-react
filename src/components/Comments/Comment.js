import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import axios from 'axios';

function createLike(e) {
    e.preventDefault();
    
    const user = Cookies.getJSON('user');
    if(!user){
        toast.error("You must be logged in to leave a like or dislike");
        return;
    }

    const api = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer'  + user.token,
        }, 
        data: {
            type: e.currentTarget.id
        },
        url: `https://orbimind.herokuapp.com/api/comments/${ e.currentTarget.value }/like`
    };
    const promise = axios.post(api.url, api.data, { headers: api.headers });

    toast.promise(
        promise, 
        {
            loading: 'Processing..',
            success: () => {
                location.reload();
            },
            error: (error) => {
                return error.response.data.message;
            }
        }
    );
}

export default function Comment({ user_id, rating, date, content, comment_id }) {
    const [creator, setCreator] = useState([]);
    const [likeType, setLikeType] = useState(null);
    const [likes, setLikes] = useState([]);
    const user = Cookies.getJSON('user');

    useEffect(() => {
        let cancel;
        axios.get("https://orbimind.herokuapp.com/api/users/" + user_id, {
          cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(result => {
            setCreator(result.data);
        });

        return () => cancel(); 
    }, []);

    useEffect(() => {
        let cancel;
        axios.get("https://orbimind.herokuapp.com/api/comments/" + comment_id + "/like", {
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(result => {
            setLikes(result.data.map(p => p));
        });
        
        return () => cancel(); 
    }, []);

    useEffect(() => {
        if(length in likes > 0){
            for(let i = 0; i < likes.length; i++) {
                if(user.id == likes[i].user_id){
                    if(likes[i].type === "like")
                        setLikeType("like");
                    else 
                        setLikeType("dislike");
                }
            }
        }
    }, [likes]);

    return (
        <div className="singleComment">
            <div>
                <button value={ comment_id } id="like" onClick={ createLike }>
                {
                    (likeType === "like")
                    ?   <svg fill="#7c6aef"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240.835 240.835">
                            <path d="M129.007,57.819c-4.68-4.68-12.499-4.68-17.191,0L3.555,165.803c-4.74,4.74-4.74,12.427,0,17.155c4.74,4.74,12.439,4.74,17.179,0l99.683-99.406l99.671,99.418c4.752,4.74,12.439,4.74,17.191,0c4.74-4.74,4.74-12.427,0-17.155 L129.007,57.819z"/>
                        </svg>
                    :   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240.835 240.835">
                            <path d="M129.007,57.819c-4.68-4.68-12.499-4.68-17.191,0L3.555,165.803c-4.74,4.74-4.74,12.427,0,17.155c4.74,4.74,12.439,4.74,17.179,0l99.683-99.406l99.671,99.418c4.752,4.74,12.439,4.74,17.191,0c4.74-4.74,4.74-12.427,0-17.155 L129.007,57.819z"/>
                        </svg>
                }
                </button>
                <span id='rating'>{rating}</span>
                <button value={ comment_id } id="dislike" onClick={ createLike }>
                {
                    (likeType === "dislike")
                    ?   <svg fill="#7c6aef"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240.835 240.835">
                            <path d="M129.007,57.819c-4.68-4.68-12.499-4.68-17.191,0L3.555,165.803c-4.74,4.74-4.74,12.427,0,17.155c4.74,4.74,12.439,4.74,17.179,0l99.683-99.406l99.671,99.418c4.752,4.74,12.439,4.74,17.191,0c4.74-4.74,4.74-12.427,0-17.155 L129.007,57.819z"/>
                        </svg>
                    :   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240.835 240.835">
                            <path d="M129.007,57.819c-4.68-4.68-12.499-4.68-17.191,0L3.555,165.803c-4.74,4.74-4.74,12.427,0,17.155c4.74,4.74,12.439,4.74,17.179,0l99.683-99.406l99.671,99.418c4.752,4.74,12.439,4.74,17.191,0c4.74-4.74,4.74-12.427,0-17.155 L129.007,57.819z"/>
                        </svg>
                }
                </button>
            </div>
            <div>
                <span>Answered by <Link className="linkUser" to={`/users/${ creator.id }`}>{ creator.username }</Link> <span id="rating">{ creator.rating }</span> { date }</span>
                <p>{ content }</p>
                <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                    toastOptions={{
                        style: {
                            borderRadius: '8px',
                            backgroundColor: 'white',
                            padding: '10px',
                        },
                        duration: 2000,
                        success: {
                            iconTheme: {
                                primary: '#7c6aef',
                                secondary: '#FFF',
                            },
                        },
                        error: { duration: 4000 }
                    }}
                />
            </div>
        </div>
    );
}