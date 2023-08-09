import React, { useState, useEffect } from "react";
import "./VocabularyGame.css";
import axios from "axios";

let newobj = {};
const VocabularyGame = ({ vocabulary }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  let [score, setScore] = useState(0);
  const [filledWord, setFilledWord] = useState("");
  const [jumbledWord, setJumbledWord] = useState([]);
  const [obj, setobj] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data")
      .then((response) => {
        setobj(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
    const currentWord = vocabulary[currentWordIndex];
    const jumbled = currentWord.word.split("").sort(() => Math.random() - 0.5);
    setJumbledWord(jumbled);
  }, [currentWordIndex, vocabulary]);

  const handleTileClick = (letter, index) => {
    if (filledWord.length < currentWord.word.length) {
      const newFilledWord = filledWord + letter;
      setFilledWord(newFilledWord);

      const updatedJumbledWord = jumbledWord.filter(
        (_, tileIndex) => tileIndex !== index
      );
      setJumbledWord(updatedJumbledWord);

      if (newFilledWord === currentWord.word) {
        console.log(score, vocabulary.length);
        if (score === vocabulary.length - 1) {
          alert("WELL DONE! YOU HAVE COMPLETED THE GAME!");
          score = 0;
          return;
        }
        setScore(score + 1);
        setCurrentWordIndex(currentWordIndex + 1);
        setFilledWord("");
      }
    }
  };

  const currentWord = vocabulary[currentWordIndex];
  console.log(obj);
  newobj = obj;
  return (
    <div className="game-container">
      <div className="question">
        <h1>What word closely relates to "{currentWord.meaning}"?</h1>
      </div>
      <div className="tiles">
        {currentWord.word.split("").map((_, index) => (
          <div className="tile" key={index}>
            {filledWord[index] || "__"}
          </div>
        ))}
      </div>
      <div className="jumbled-tiles">
        {jumbledWord.map((letter, index) => (
          <button
            className="btile"
            key={`${letter}-${index}`}
            id={`tile-${index}`}
            onClick={() => handleTileClick(letter, index)}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="score">Score: {score}</div>
    </div>
  );
};

export default VocabularyGame;
export { newobj };
