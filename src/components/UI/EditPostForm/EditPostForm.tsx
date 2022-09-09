import React, {useState} from 'react';
import {useAppDispatch} from "../../../hook";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import {FormValues} from "../CreatePostForm/CreatePostForm";
import {IPostDetails} from "../../../models";
import {editPost} from "../../../redux/slicers/detailsSlice";

interface EditPostFormProps {
    onEdit: () => void,
    post: IPostDetails[]
}

const EditPostForm = ({onEdit, post}: any) => {
    const dispatch = useAppDispatch()

    const [formValues, setFormValues] = useState<FormValues>({
        title: post.title,
        body: post.body,
        id: post.id,
    })


    const [error, setError] = useState('')

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        setError('')
        if (formValues.title.trim().length === 0) {
            setError('please enter valid title')
            return
        }
        console.log(formValues)

        dispatch(editPost(formValues))

        onEdit()
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
                value={formValues.title}
                onChange={(event) => changeHandler(event, 'title')}
            />
            <input
                type="text"
                value={formValues.body}
                onChange={(event) => changeHandler(event, 'body')}
            />

            {error && <ErrorMessage error={error}/>}

            <button type={"submit"}>save</button>
        </form>
    );
};

export default EditPostForm;