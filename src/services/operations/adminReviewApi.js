import axios from 'axios';
import { ADMIN_ENDPOINTS } from '../api';
import toast from 'react-hot-toast';
function getAuthToken() {
  return localStorage.getItem('token');
}

/**
 * Approves a review by ID.
 * @param {string} reviewId - The ID of the review to approve.
 * @returns {Promise<object>} The updated review data.
 * @throws {Error} Throws an error if the API call fails.
 */
export async function approveReview(reviewId) {
  try {
    const token = getAuthToken(); // Retrieve the token from localStorage
    const response = await axios.put(
      ADMIN_ENDPOINTS.UPDATE_REVIEW_STATUS(reviewId),
      {
        reviewId,
        status: 'approved',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
          Accept: 'application/json',
        },
      }
    );

    if (response.data.success) {
      return response.data; 
    } else {
      throw new Error(response.data.message || 'Failed to approve the review.');
    }
  } catch (error) {
    console.error('Error approving the review:', error);
    throw error;
  }
}

/**
 * Rejects a review by ID.
 * @param {string} reviewId - The ID of the review to reject.
 * @returns {Promise<object>} The updated review data.
 * @throws {Error} Throws an error if the API call fails.
 */
export async function rejectReview(reviewId) {
  try {
    const token = getAuthToken();
    const response = await axios.put(
      ADMIN_ENDPOINTS.UPDATE_REVIEW_STATUS(reviewId),
      {
        reviewId,
        status: 'rejected',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to reject the review.');
    }
  } catch (error) {
    console.error('Error rejecting the review:', error);
    throw error;
  }
}

/**
 * Fetches all pending reviews.
 * @returns {Promise<Array>} A list of pending reviews.
 * @throws {Error} Throws an error if the API call fails.
 */
export async function fetchAllReviews() {
  try {
    const token = getAuthToken();
    const response = await axios.get(ADMIN_ENDPOINTS.FETCH_PENDING_REVIEWS, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch pending reviews.');
    }
  } catch (error) {
    console.error('Error fetching pending reviews:', error);
    throw error;
  }
}

/**
 * Fetches a specific review by ID.
 * @param {string} reviewId - The ID of the review to fetch.
 * @returns {Promise<object>} The review data.
 * @throws {Error} Throws an error if the API call fails.
 */
export async function fetchReviewById(reviewId) {
  try {
    const token = getAuthToken();
    const response = await axios.get(ADMIN_ENDPOINTS.FETCH_REVIEW(reviewId), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    console.log(response)

    if (response.data.success) {
      return response.data?.review;
    } else {
      toast.error("Error fetching reviews");
      throw new Error(response.data.message || 'Failed to fetch review.');
    }
  } catch (error) {
    console.error('Error fetching review:', error);
    toast.error(error.message || "Error during fetching reviews");
    throw error;
  }
}
