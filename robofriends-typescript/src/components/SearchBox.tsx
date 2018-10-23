import * as React from 'react';

interface ISearch {
  searchChange(e: React.SyntheticEvent<HTMLInputElement>): void
}

const SearchBox: React.SFC<ISearch> = ({ searchChange }): JSX.Element => {
  return (
    <div className='pa2'>
      <input
        className='pa3 ba b--green bg-lightest-blue'
        type='search'
        placeholder='search robots'
        onChange={searchChange}
      />
    </div>
  );
};

export default SearchBox;