export interface IPost {
    id: number,
    title: string,
    body: string,
}

export type IPostDetails = {
    id: number,
    title: string,
    body: string,
    comments: [{
        postId: number,
        id: number,
        body: string,
    }]
}

export type IComments = {
    comments: [{
        postId: number,
        id: number,
        body: string,
    }]
}

export type FormValues = [
    { id: string | undefined },
    {
        title: string,
        body: string,
    }
]

