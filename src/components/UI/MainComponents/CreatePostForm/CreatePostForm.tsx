
import React, {useState} from 'react';

import {createPost} from '../../../../redux/slicers/postSlice';
import {useAppDispatch} from '../../../../hook';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

import './createPostForm.css';

export type FormValues = {
    title: string,
    body: string,
}

interface CreatePostFormProps {
    onCreate: () => void
}

const CreatePostForm = ({onCreate}: CreatePostFormProps) => {
  const dispatch = useAppDispatch();

  const [formValues, setFormValues] = useState<FormValues>({
    title: '',
    body: '',
  });

  const [error, setError] = useState('');

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    if (formValues.title.trim().length === 0) {
      setError('please enter valid title');
      setFormValues({
        title: '',
        body: '',
      });
      return;
    }

    dispatch(createPost(formValues));
    setFormValues({
      title: '',
      body: '',
    });

    onCreate();
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>, prop: string) => {
    setFormValues({
      ...formValues,
      [prop]: e.target.value,
    });
  };

  return (
    <form
      className={'form'}
      onSubmit={submitHandler}
    >
      <input
        type="text"
        placeholder={'title'}
        value={formValues.title}
        onChange={(event) => changeHandler(event, 'title')}
      />
      <input
        type="text"
        placeholder={'description'}
        value={formValues.body}
        onChange={(event) => changeHandler(event, 'body')}
      />

      {error && <ErrorMessage error={error}/>}

      <button type={'submit'}>create</button>
    </form>
  );
};

export default CreatePostForm;