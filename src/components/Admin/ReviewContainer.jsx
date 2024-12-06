import { useState, useEffect } from 'react';
import ReviewCategory from './ReviewCategory';
import { fetchAllReviews, approveReview, rejectReview } from '../../services/operations/adminReviewApi'; 
import { toast } from 'react-hot-toast';

const ReviewContainer = () => {
    const [reviewCategories, setReviewCategories] = useState({
        pending: [],
        approved: [],
        rejected: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const data = await fetchAllReviews();
            console.log(data)
            setReviewCategories(data?.reviews);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch reviews. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (reviewId) => {
        try {
            const response = await approveReview(reviewId);
            if (response.success) {
                toast.success('Review approved successfully');
                fetchReviews();
            } else {
                throw new Error(response.message || 'Failed to approve review');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error approving review');
        }
    };

    const handleReject = async (reviewId) => {
        try {
            const response = await rejectReview(reviewId);
            console.log('response',response)
            if (response.success) {
                toast.success('Review rejected successfully');
                await fetchReviews();
            } else {
                throw new Error(response.message || 'Failed to reject review');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error rejecting review');
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    if (loading) return <div>Loading reviews...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex-3 w-100 overflow-x-auto flex gap-4 nowrap pb-3">
            {Object.entries(reviewCategories).map(([status, reviews]) => {
                return (
                    <ReviewCategory
                        key={status}
                        category={status}
                        reviews={reviews}
                        onApprove={handleApprove}
                        onReject={handleReject}
                    />
                );
            })}

        </div>
    );
};

export default ReviewContainer;
