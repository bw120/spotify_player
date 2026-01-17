import { createContext, useContext, useState, useEffect } from "react";

// import {  } from "../api/library";


const LibraryContext = createContext({});
const useLibraryContext = () => useContext(LibraryContext);

const LibraryProvider = ({ children }) => {
  const value = {  };

  return (
    <LibraryContext.Provider value={value}>
      {typeof children === "function" ? children({ ...value }) : children}
    </LibraryContext.Provider>
  );
};

export { useLibraryContext, LibraryProvider };