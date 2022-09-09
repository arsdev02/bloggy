import React, {useState} from 'react';
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import {useAppDispatch} from "../../../../hook";
import {createComment} from "../../../../redux/slicers/detailsSlice";

export type FormValuesForComment = {
    postId: number,
    body: string,
}

interface CreatePostFormProps {
    onCreate: () => void
    id: number,
}

const CreateCommentForm = ({onCreate, id}: CreatePostFormProps) => {
    const dispatch = useAppDispatch()

    const [formValues, setFormValues] = useState<FormValuesForComment>({
        postId: id,
        body: '',
    })

    const [error, setError] = useState('')
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        setError('')
        if (formValues.body.trim().length === 0) {
            setError('please enter valid title')
            setFormValues({
                postId: id,
                body: '',
            })
            return
        }

        dispatch(createComment(formValues))
        setFormValues({
            postId: id,
            body: '',
        })

        onCreate()
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>, prop: string) => {
        setFormValues({
            ...formValues,
            [prop]: e.target.value
        })
    }

    return (
        <form
            className={'form'}
            onSubmit={submitHandler}
        >
            <input
                type="text"
                placeholder={'comment'}
                value={formValues.body}
                onChange={(event) => changeHandler(event, 'body')}
            />

            {error && <ErrorMessage error={error}/>}

            <button type={"submit"}>create</button>
        </form>
    );
};

export default CreateCommentForm;