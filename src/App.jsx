import React, { useState } from 'react';
import SearchBar from '../SearchBar';
import SearchResults from '../SearchResults';

function App() {
  const [allResults, setAllResults] = useState([]);
  const [single, setSingle] = useState(null);

  const handleSelect = (item) => {
    setSingle(item);
    setAllResults([]);
  };

  const handleSeeAll = async (query) => {
    const [res1, res2] = await Promise.all([
      fetch(`https://conecta-transparencia.agencianew.com.br/publications?searchText=${query}`).then(r => r.json()),
      fetch(`https://conecta.agencianew.com.br/publications?searchText=${query}`).then(r => r.json())
    ]);
    setAllResults([...res1, ...res2]);
    setSingle(null);
  };

  return (
    <div className="p-4">
      <SearchBar onSelect={handleSelect} onSeeAll={handleSeeAll} />
      {single && <SearchResults results={[single]} />}
      {allResults.length > 0 && <SearchResults results={allResults} />}
    </div>
  );
}

export default App;