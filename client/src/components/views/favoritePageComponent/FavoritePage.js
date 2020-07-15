import React, { useEffect, useState} from 'react';
import { Button } from 'antd';
import './FavoritePage.module.css';
import Axios from 'axios';

function FavoritePage() {

    const [Favorited, setFavorited] = useState([])

    useEffect(() => {
        fetchFavMovies()
       
    }, [])
    
    const fetchFavMovies = () => {
        Axios.post('api/favorite/getFavoriteMovies',  { userFrom: localStorage.getItem('userId') })
        .then(response => {
            if(response.data.success) {
                setFavorited(response.data.favorites)
            }else {
                alert('Failed to get information of the movie. You need to login first!')
            } 
        })
    }

    const onClickDelete = (movieId, userFrom) => {

        const variables = {
            movieId,
            userFrom
        }

             Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        fetchFavMovies()
                    } else {
                        alert('Failed to Remove From Favourite Movie')
                    }
                })
    }

    const renderTableBody = Favorited.map((movie, index) => {

              return <tr key={index}>

                <td>{movie.movieTitle}</td>                         

                <td><Button onClick={() => onClickDelete(movie.movieId, movie.userFrom)}>Remove Movie</Button></td>
        </tr>
    })

    return (
        <div style={{width: '65%', margin: '4em auto' , color:'white' }}>
            <h1>My Favourite Movies</h1>
            <hr/>
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Remove Movie</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage; 