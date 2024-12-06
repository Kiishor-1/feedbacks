const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const AUTH_ENDPOINTS = {
    LOGIN_REGISTER: `${BASE_URL}/auth/register`,
}
export const REVIEW_ENDPOINTS = {
    FETCH_ALL_REVIEWS: `${BASE_URL}/reviews`,
    ADD_REVIEW: `${BASE_URL}/reviews`,
}

export const ADMIN_ENDPOINTS = {
    FETCH_PENDING_REVIEWS: `${BASE_URL}/reviews/admin`,
    UPDATE_REVIEW_STATUS: (id) => `${BASE_URL}/reviews/admin/${id}`,
    FETCH_REVIEW: (id) => `${BASE_URL}/reviews/admin/${id}`,
}