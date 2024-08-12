import React, { useState } from 'react';

const Flashcard = ({ flashcard }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div onClick={() => setFlipped(!flipped)} className="flashcard">
      {flipped ? flashcard.answer : flashcard.question}
    </div>
  );
};

export default Flashcard;
