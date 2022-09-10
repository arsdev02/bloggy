import React from 'react';

import './CreateButton.css';

interface CreatePostFormProps {
    onCreate: () => void
}

const CreateButton = ({onCreate}: CreatePostFormProps) => {

  return (
    <button className={'create-button'} onClick={onCreate}>+</button>
  );
};

export default CreateButton;