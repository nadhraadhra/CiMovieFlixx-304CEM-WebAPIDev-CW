import React from 'react';
import classes from '../searchComponent/Search.module.css';

const Search = ({handleInputVal, search}) => {
        return(
          <div className={classes.searchInputWrap}>
              <input 
                    type='text' 
                    placeholder='Search movie by keywords... e.g Parasite' 
                    className={classes.searchInput} 
                    onChange={handleInputVal} 
                    onKeyPress={search}
              />
          </div>
        )
};

export default Search;