import React, { useState } from 'react';


const Favorites = ({ favorites, onAddFavorite, onRemoveFavorite }) => {
  const [city, setCity] = useState('');

  const handleAddFavorite = () => {
    if (city) {
      onAddFavorite(city);
      setCity('');
    }
  };

  return (
    <div className="favorites">
      <h3>Favorite Cities</h3>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            {favorite.city}
            <button onClick={() => onRemoveFavorite(favorite.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Add city to favorites"
      />
      <button onClick={handleAddFavorite}>Add</button>
    </div>
  );
};

export default Favorites;
