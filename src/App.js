import React, { useState, useCallback } from 'react';
import Buttons from './Buttons';
import TextField from './TextField';
import './App.css';

function App() {
  const photos = ['/pokemoncard.png', '/blastoise.png', '/venusaur.png'];
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [comment, setComment] = useState('');
  const [photoComments, setPhotoComments] = useState(Array(photos.length).fill([]));
  const [photoCounters, setPhotoCounters] = useState(
    Array(photos.length).fill({
      upvote: 0,
      downvote: 0,
      comment: 0,
    })
  );

  const handleCommentSubmit = useCallback(() => {
    if (comment.trim() !== '') {
      setPhotoComments((prevComments) => {
        const newComments = [...prevComments];
        newComments[currentPhotoIndex] = [...newComments[currentPhotoIndex], comment];
        return newComments;
      });
      setPhotoCounters((prevCounters) => {
        const newCounters = [...prevCounters];
        newCounters[currentPhotoIndex] = {
          ...newCounters[currentPhotoIndex],
          comment: newCounters[currentPhotoIndex].comment + 1,
        };
        return newCounters;
      });
      setComment('');
    } else {
      alert('Please enter a comment before submitting.');
    }
  }, [comment, currentPhotoIndex]);

  const handleChange = useCallback((value) => {
    setComment(value);
  }, []);

  const handleNextPhoto = useCallback(() => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    setComment('');
  }, [photos.length]);

  const handlePreviousPhoto = useCallback(() => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
    setComment('');
  }, [photos.length]);

  const handleCounterUpdate = useCallback(
    (type) => {
      setPhotoCounters((prevCounters) => {
        const newCounters = [...prevCounters];
        newCounters[currentPhotoIndex] = {
          ...newCounters[currentPhotoIndex],
          [type]: newCounters[currentPhotoIndex][type] + 1,
        };
        return newCounters;
      });
    },
    [currentPhotoIndex]
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokemon Pull Rating</h1>

        <div className="photo-container">
          <button onClick={handlePreviousPhoto} className="nav-button left">
            ←
          </button>
          <img src={photos[currentPhotoIndex]} alt="Pokemon" className="photo" />
          <button onClick={handleNextPhoto} className="nav-button right">
            →
          </button>
        </div>

        <TextField value={comment} onChange={handleChange} />
        <p>{comment}</p>
        <Buttons
          onComment={handleCommentSubmit}
          comment={comment}
          counters={photoCounters[currentPhotoIndex]}
          onCounterUpdate={handleCounterUpdate}
        />

        <div className="comments-section">
          <h2>Comments</h2>
          {photoComments[currentPhotoIndex].length > 0 ? (
            <ul>
              {photoComments[currentPhotoIndex].map((comment, index) => (
                <li key={index}>
                  {comment}
                  
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;