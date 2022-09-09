import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../hook";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import {editPost} from "../../../../redux/slicers/detailsSlice";

type FormValues = {
    id: string | undefined,
    title: string,
    body: string,
}

interface EditPostFormProps {
    onEdit: () => void,
    id: string | undefined,
}

const EditPostForm = ({onEdit, id}:EditPostFormProps) => {
    const dispatch = useAppDispatch()

    const { title, body } = useAppSelector(state => state.postDetails.post)

    const [formValues, setFormValues] = useState<FormValues>({
        id: id,
        title: title,
        body: body,
    })

    const [error, setError] = useState('')

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        setError('')
        if (formValues.title.trim().length === 0) {
            setError('please enter valid title')
            setFormValues({
                id: id,
                title: '',
                body: '',
            })
            return
        }

        dispatch(editPost(formValues))
        setFormValues({
            id: id,
            title: '',
            body: '',
        })

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

            <button type={"submit"}>save</button>
        </form>
    );
};

export default EditPostForm;