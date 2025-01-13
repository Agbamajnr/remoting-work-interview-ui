import React, { useState } from 'react';

const Search = () => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        console.log('Search query:', event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search..."
            />
        </div>
    );
};

export default Search;
