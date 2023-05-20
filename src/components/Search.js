import React from "react";

const Search = ({ search, setInput }) => {
  //上方的 search 原本寫在此處，用 statelifting 的概念將其移到上層，此處再傳遞進來
  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="search">
      <input className="input" onChange={inputHandler} type="text" />
      <button onClick={search}>Search</button>
    </div>
  );
};

export default Search;
