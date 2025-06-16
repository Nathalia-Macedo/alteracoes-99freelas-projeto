// src/Home.jsx
import React from 'react';
import SearchBar from './SearchBar';
export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Pesquisar Publicações</h1>

      {/* A SearchBar já cuida de levar o usuário para /search ou /publicacao/:id */}
      <SearchBar />
    </div>
  );
}
