import React, { useState, useEffect } from 'react';
import GifList from './GifList';
import GifSearch from './GifSearch';

function GifListContainer() {
  const [gifs, setGifs] = useState([]);
  const [query, setQuery] = useState(''); // Store the user's search query

  useEffect(() => {
    // Fetch data from Giphy API when the component mounts and whenever the query changes
    fetchGifs();
  }, [query]);

  const fetchGifs = async () => {
    try {
      const API_KEY = 'YOUR_API_KEY_HERE';
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${API_KEY}&rating=g`
      );
      const data = await response.json();
      // Get the first 3 gifs from the response and store them in state
      setGifs(data.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching gifs:', error);
    }
  };

  return (
    <div>
      <GifSearch onSearch={setQuery} />
      <GifList gifs={gifs} />
    </div>
  );
}

export default GifListContainer;
