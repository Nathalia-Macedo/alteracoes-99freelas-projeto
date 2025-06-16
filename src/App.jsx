// import SearchBar from '../SearchBar';
// import SearchResults from '../SearchResults';
// import PublicationPage from '../PublicationPage'
// import React, { useEffect, useState } from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useParams,
//   useLocation,
//   Link,
// } from 'react-router-dom';
// import Home from '../Home';

// // function App() {
// //   const [allResults, setAllResults] = useState([]);
// //   const [single, setSingle] = useState(null);

// //   const handleSelect = (item) => {
// //     setSingle(item);
// //     setAllResults([]);
// //   };

// //   const handleSeeAll = async (query) => {
// //     const [res1, res2] = await Promise.all([
// //       fetch(`https://conecta-transparencia.agencianew.com.br/publications?searchText=${query}`).then(r => r.json()),
// //       fetch(`https://conecta.agencianew.com.br/publications?searchText=${query}`).then(r => r.json())
// //     ]);
// //     setAllResults([...res1, ...res2]);
// //     setSingle(null);
// //   };

// //   return (
// //     <div className="p-4">
// //       <SearchBar onSelect={handleSelect} onSeeAll={handleSeeAll} />
// //       {single && <SearchResults results={[single]} />}
// //       {allResults.length > 0 && <SearchResults results={allResults} />}
// //     </div>
// //   );
// // }

// // export default App;

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/publicacao/:id" element={<PublicationPage />} />
//         <Route path="/search" element={<SearchResults />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Home';
import SearchResults from '../SearchResults';
import PublicationPage from '../PublicationPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/publicacao/:id" element={<PublicationPage />} />
      </Routes>
    </Router>
  );
}
