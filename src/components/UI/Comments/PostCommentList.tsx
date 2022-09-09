import React, {useState} from 'react';
import {useAppSelector} from "../../../hook";
import PostCommentsItem from "./PostCommentsItem";
import Modal from "../Modal/Modal";
import CreateCommentForm from "../CreateCommentForm/CreateCommentForm";
import CreateButton from "../CreateButton/CreateButton";

export interface IPostCommentsList {
    comments: [{
        id: number,
        postId: number,
        body: string,
    }]
}

const PostCommentList = () => {
    const {comments} = useAppSelector<IPostCommentsList>(state => state.postDetails.postDetails)
    console.log(comments)

    const [modal, setModal] = useState(false)
    return (
        <ul className={'post-list'} style={{marginTop: '10px'}}>
            {comments.length>0 &&
            comments.map((comment) => (
                <PostCommentsItem
                    key={comment.id}
                    {...comment}
                />
            ))}

            { modal && <Modal title={'create comment'} onClose={() => setModal(false)}>
                <CreateCommentForm onCreate={() => setModal(false)} id={comments.id}/>
            </Modal>}
            <CreateButton onCreate={() => setModal(true)}/>
        </ul>
    );
};

export default PostCommentList;