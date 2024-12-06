import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REVIEW_ENDPOINTS } from "../services/api";
import axios from "axios";

const initialState = {
    reviews: [],
    average: 0,
    isLoading: false,
    error: null,
};

export const fetchReviews = createAsyncThunk(
    "review/fetchReviews",
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            const response = await axios.get(REVIEW_ENDPOINTS.FETCH_ALL_REVIEWS, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

export const addReview = createAsyncThunk(
    "review/addReview",
    async (review, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token; 
            const response = await axios.post(REVIEW_ENDPOINTS.ADD_REVIEW, review, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.isLoading = false;
               state.reviews = action.payload.reviews.filter(
                    (review) => review.status === "approved"
                );
                state.average = calculateAverage(action.payload.reviews);
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addReview.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.isLoading = false;
                const { status } = action.payload.data;
                if (status === "approved") {
                    state.reviews.push(action.payload.data);
                    state.average = calculateAverage(state.reviews);
                }
            })
            .addCase(addReview.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

const calculateAverage = (reviews) => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
};

export const { resetError } = reviewSlice.actions;
export default reviewSlice.reducer;
