import React from 'react';
import Result from '../ResultMovSearch/Result';
import classes from '../resultsComponent/Results.module.css';

const Results = ({ results, movieDetails, error}) => {
    return(
        <section className={classes.results}>
            {results ? results.map( result => (
                <Result key={result.id} result={result} movieDetails={movieDetails} />
            )) : <p>{error}</p>}
        </section>
    )
};

export default Results;