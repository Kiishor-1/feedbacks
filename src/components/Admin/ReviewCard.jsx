import { formatDate } from '../../helpers/formatDate';
import { getRandomGradient, getTextColor } from '../../helpers/colorUtils';
import { useNavigate } from 'react-router-dom';

export default function ReviewCard({ review, onApprove, onReject }) {
    const background = getRandomGradient();
    const textColor = getTextColor(background);
    const navigate = useNavigate();

    const viewFeedback = () => {
        navigate(`/admin/feedbacks/${review?._id}`);
    }

    return (
        <div className="w-full flex flex-col border border-3 border-gray-400 rounded-lg p-4" style={{ background, color: textColor }}>
            <p className='text-xs'>{review?._id}</p>
            <p className='font-semibold'>{review?.user?.username}</p>
            <p className="w-full text-md py-2">{review.length > 50 ? review?.review.slice(0, 50) : review?.review}</p>
            <div className="flex items-center gap-2">
                {
                    review?.status !== 'approved' &&
                    <button
                        onClick={() => onApprove(review?._id)}
                        className="border rounded-lg px-3 py-1 font-semibold border-2 flex items-center justify-between"
                    >
                        Approve
                    </button>
                }
                {
                    review?.status !== 'rejected' &&
                    <button
                        onClick={() => onReject(review?._id)}
                        className="border rounded-lg px-3 py-1 font-semibold border-2 flex items-center justify-between"
                    >
                        Reject
                    </button>
                }
            </div>
            <section className='flex items-center justify-between mt-4'>
                <button className='text-md' onClick={viewFeedback}>View</button>
                <span className='font-semibold text-xs text-end w-full'>{formatDate(review?.createdAt)}</span>
            </section>
        </div>
    );
}
