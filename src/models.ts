export interface IPost {
    id: number,
    title: string,
    body: string,
}

export interface IPostDetails {
    id: number,
    title: string,
    body: string,
    comments: [{
        id: number,
        postId: number,
        body: string,
    }]
}

export interface IComment {
    postId: number,
    body: string,
}