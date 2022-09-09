import React, {useState} from 'react';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import {useAppDispatch} from "../../../hook";
import {createComment} from "../../../redux/slicers/detailsSlice";
import {IComment} from "../../../models";

type CommentValues = {
    id: number,
    body: string
}

interface CreatePostFormProps {
    onCreate: () => void,
    id: number,
}

const CreateCommentForm = ({onCreate, id}:CreatePostFormProps) => {
    const dispatch = useAppDispatch()

    const [commentValues, setCommentValues] = useState<IComment>({
        postId: id,
        body: '',
    })

    const [error, setError] = useState('')

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        setError('')
        if (commentValues.body.trim().length === 0) {
            setError('please enter valid title')
            setCommentValues({
                ...commentValues,
                body:'',
            })
            return
        }


        dispatch(createComment(commentValues))
        setCommentValues({
            ...commentValues,
            body:'',
        })

        onCreate()
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>, prop: string) => {
        setCommentValues({
            ...commentValues,
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
                placeholder={'title'}
                value={commentValues.body}
                onChange={(event) => changeHandler(event, 'body')}
            />

            {error && <ErrorMessage error={error}/>}

            <button type={"submit"}>create</button>
        </form>
    );
};

export default CreateCommentForm;