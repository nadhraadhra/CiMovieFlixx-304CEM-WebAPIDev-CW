import React, {useState, useEffect} from 'react';
import { APIUrl, APIKey } from '../../Config' 
import Search from '../searchComponent/Search';
import Results from '../resultsComponent/Results';
import MovieDetails from '../movieDetailsComponent/MovieDetails';
import Carousel from '../carouselComponent/Carousel';
import Label from '../genreLabelComponent/GenreLabel';
import axios from 'axios';

function LandingPage() {
    const [searchVal, setSearchVal] = useState("")
    const [results, setResults] = useState([])
    const [selected, setSelected] = useState({})
    const [error, setError] = useState('')
    const [popularResult, setPopularResult] = useState([])
    const [genreResult, setGenreResult] = useState([])


    useEffect(() => {
      //Fetch Popular movie
        const fetchData = async () => {
          const result = await axios(`${APIUrl}movie/popular?api_key=${APIKey}&language=en-US`);
          setPopularResult(result.data.results);
          };
          fetchData();
      }, [])
      

      //Fetch all list type of Movie Genres **Action, Crime, Comedy, Thriller etc
      useEffect(() => {
        const fetchData = async () => {
          const result = await axios(`${APIUrl}genre/movie/list?api_key=${APIKey}&language=en-US`);
          setGenreResult(result.data.genres);
          };
          fetchData();
      }, []);
    
      //Search Movie
      const search = (e) => {
        if(e.key === "Enter"){ 
          axios(`${APIUrl}search/movie?api_key=${APIKey}&page=1&query=`+ searchVal).then( ({ data }) => {
            let results = data.results;
            setResults(results);
            setError('');
          }).catch(err => {
            setResults([]);
            setError('Please enter any keyword of the movie to search');
          });
        };
      }; 
    
      //Search Discover Movie by Genre **popular movie
      const searchByGenre = (id) => {
        axios(`${APIUrl}discover/movie?api_key=${APIKey}&with_genres=`+ id).then( ({ data }) => {
            let results = data.results;
            setResults(results);
            setError('');
          }).catch(err => {
            setResults([]);
            setError('Please select any keyword of the movie to search');
          });
      }
    
      const handleInputVal = (e) => { 
        let keyword = e.target.value;
        setSearchVal(keyword);
      };

      // Get Movie Details based on Selected Movie
      const movieDetails = (id) => {
        axios(`${APIUrl}movie/`+id+`?api_key=${APIKey}&language=en-US`).then( ({ data }) => {
          let result = data;
    
          setSelected(result);
    
        });
      };
     
      // close movie Details
      const closeMovieDetails = () => {
        setSelected({})
      };
    
    return (
        <div className="App">
            <main className="main">
              
            <Carousel 
                popularResult={popularResult}
                movieDetails={movieDetails} />
            <Search 
                handleInputVal={handleInputVal}
                search={search} />
            <Label 
                genreResult={genreResult} 
                searchByGenre={searchByGenre}/>
            <Results 
                results={results} 
                movieDetails={movieDetails}
                error={error} />
  
            {(typeof selected.title != "undefined") ? <MovieDetails selected={selected} closeMovieDetails={closeMovieDetails}/> : false }
            </main>
        </div>
    )
}

export default LandingPage
