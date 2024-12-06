import { useNavigate } from "react-router-dom";
import { formatDate } from "../../helpers/formatDate";
import { approveReview } from "../../services/operations/adminReviewApi";
import toast from "react-hot-toast";

const ReviewDetails = ({ review }) => {
  console.log(review);
  const navigate = useNavigate();

  const Approve = async () => {
    const success = await approveReview(review._id);

    if (success) {
      toast.success('Approved')
      navigate('/admin');
    } else {
      toast.error('Failed to approve the review');
    }
  };


  return (
    <div className="rounded-lg p-6 mb-4">
      <div className="flex items-center">
        <img
          src={`https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.username}`}
          alt={review?.user?.username}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h4 className="text-lg font-bold">{review?.user?.username}</h4>
          <p className="text-gray-200 text-sm">
          </p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              className={`w-5 h-5 ${index < review?.rating ? "text-yellow-400" : "text-gray-300"}`}
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.528 4.675a1 1 0 00.95.69h4.905c.969 0 1.371 1.24.588 1.81l-3.974 2.885a1 1 0 00-.364 1.118l1.528 4.675c.3.921-.755 1.688-1.538 1.118l-3.974-2.885a1 1 0 00-1.176 0l-3.974 2.885c-.783.57-1.838-.197-1.538-1.118l1.528-4.675a1 1 000-.364-1.118L2.83 10.102c-.783-.57-.38-1.81.588-1.81h4.905a1 1 0.95-.69l1.528-4.675z" />
            </svg>
          ))}
        </div>
        <p className="text-sm text-gray-200">{review?.review}</p>
        <p className="text-gray-400 text-sm mt-2">{formatDate(review?.createdAt)}</p>
      </div>
      <div className="flex md:flex-row flex-col gap-2 justify-between mt-4">
        <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">
          Public Comment
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Direct Message
        </button>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-600 flex items-center justify-center rounded-lg hover:bg-gray-300"
        >
          {review.status === 'approved' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <p onClick={Approve} >Approve</p>
          )}
        </button>
      </div>
    </div>
  );
};


export default ReviewDetails;