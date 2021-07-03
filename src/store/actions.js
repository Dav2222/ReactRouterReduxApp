export const ADD_FAVORITE = "add_favorite";

export const createAddFavorite = (post) => ({
    type: ADD_FAVORITE,
    payload: {post}
})
 /////

export const REMOVE_FAVORITE = "remove_favorite";

export const createRemoveFavorite = (postId) => ({
    type: REMOVE_FAVORITE,
    payload: {postId}
})

/////

export const RESET_FAVORITE = "reset_favorites";

export const createResetFavorite = () => ({
    type: RESET_FAVORITE,    
})
