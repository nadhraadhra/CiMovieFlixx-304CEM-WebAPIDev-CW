import React, { useState } from 'react';
import axios from 'axios';
import './Favorite.css';
import { Button } from 'antd';
import { useSelector } from 'react-redux';

function Favorite(props) {
    const user = useSelector(state => state.user)

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)
    
    const variables = {
        movieId: movieId,
        userFrom: userFrom,
        movieTitle: movieTitle,
    }

    const onClickFavorite = () => {

        if (user.userData && !user.userData.isAuth) {
            return alert('You need to Log in first');
        }

        if (Favorited) {
            //when we are already login
            axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Failed to Remove From Favourite Movie')
                    }
                })

        } else {


            axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Your new favourite movie has been added!')
                    }
                })
        }
    }

    return (
        <>
            <Button style={{ color: '(255, 107, 151)'}} onClick={onClickFavorite} > {!Favorited ? "Add to Favourite" : "Movie has been added"}</Button>
            
        </>
    )
}

export default Favorite