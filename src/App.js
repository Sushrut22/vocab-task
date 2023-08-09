import React from "react";
import VocabularyGame from "./VocabularyGame";
import "./App.css";
import { newobj } from "./VocabularyGame";

// sample data from MongoDB server
const vocabulary = [
  {
    meaning: "warm and comfortable",
    word: "COZY",
  },
  {
    meaning: "state or outburst of strong emotion",
    word: "PASSION",
  },
  {
    meaning: "cause distress or anxiety to",
    word: "OPPRESS",
  },
  {
    meaning: "meaning of word4",
    word: "WORD4",
  },
];

console.log(newobj);

function App() {
  return (
    <>
      <div className="App">
        <VocabularyGame vocabulary={vocabulary} />
      </div>
      <div className="footer">Vocab Game</div>
    </>
  );
}

export default App;
