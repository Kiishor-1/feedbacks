import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviewById } from '../../services/operations/adminReviewApi';
import ReviewDetails from './ReviewDetails';

const ViewFeedback = () => {
    const { id } = useParams(); 
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const fetchedReview = await fetchReviewById(id);
                console.log(fetchedReview); 
                setReview(fetchedReview); 
            } catch (err) {
                setError('Failed to fetch review. Please try again.');
                console.error('Error fetching review:', err); 
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]); 

    console.log('review')

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div className='py-4'>{error && 'Something went wrong'}</div>}
            {review ? (
                <div className="min-h-screen bg-gray-100 py-10 px-6">
                    <div className="max-w-4xl mx-auto border border-2 border-gray-400 rounded-lg bg-[#313147] text-white">
                        <h1 className="text-2xl font-bold mb-6 p-4">Reviews</h1>
                        <ReviewDetails review={review} />
                    </div>
                </div>
            ) : (
                <div>No review found</div>
            )}
        </>
    );
};

export default ViewFeedback;
