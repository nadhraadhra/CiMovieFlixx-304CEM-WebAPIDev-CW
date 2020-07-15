import React from 'react';
import classes from '../movieDetailsComponent/MovieDetails.module.css';
import Favorite from '../favoriteComponent/Favorite';
import { Button } from 'antd';

const MovieDetails = ({ selected, closeMovieDetails }) => {
    const img_src = "https://image.tmdb.org/t/p/w185" + selected.poster_path;
    
    return(
       <section className={classes.movieDetails}>
           <div className={classes.Backdrop} onClick={closeMovieDetails}></div>
           <div style={{ color: 'white'}} className={classes.content}>
           <h2> 
                {selected.title}
                </h2>
                <p className={classes.rating}>
                    Movie Rating: {selected.vote_average}
                </p>
                <Favorite 
                    userFrom={localStorage.getItem('userId')}
                    movieId={selected.id}
                    movieInfo={selected}
                 />
                <div className={classes.overview}>
                <img src={img_src} alt='movie poster'/>
                <p> {selected.overview} </p>
                </div>
                <Button className={classes.close} onClick={closeMovieDetails}> Close </Button>
           </div>
       </section>
    )
};

export default MovieDetails