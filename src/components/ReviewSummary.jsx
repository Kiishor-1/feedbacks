import ReactStars from "react-stars";

const ReviewSummary = ({ average, totalRatings, ratingBreakdown }) => {
  if (!totalRatings || totalRatings === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-600 p-8 flex items-center justify-between">No reviews available yet.</p>
      </div>
    );
  }

  return (
    <div className="self-end bg-white p-8 rounded-lg shadow-md w-[95%] max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4">
      <div className="flex flex-col items-center md:items-star md:w-1/3">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Average Rating</h3>
        <div className="flex items-center space-x-4 rounded-full h-[150px] w-[150px] justify-center shadow-md p-4 flex-col ">
          <p className="text-5xl font-bold text-gray-900">{average}</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`h-6 w-6 ${
                  index < Math.floor(average)
                    ? "text-yellow-500"
                    : index < average
                    ? "text-yellow-300"
                    : "text-gray-300"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.074c.969 0 1.371 1.24.588 1.81l-3.292 2.39a1 1 0 00-.364 1.118l1.286 3.946c.3.921-.755 1.688-1.539 1.118l-3.292-2.39a1 1 0 00-1.175 0l-3.292 2.39c-.784.57-1.838-.197-1.539-1.118l1.286-3.946a1 1 0 00-.364-1.118L2.18 9.373c-.783-.57-.38-1.81.588-1.81h4.074a1 1 0 00.95-.69l1.286-3.946z" />
              </svg>
            ))}
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-2">Based on {totalRatings} ratings</p>
      </div>

      <div className="md:w-2/3 w-2/3 mx-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Rating Breakdown</h3>
        <div className="space-y-2">
          {ratingBreakdown.map(({ rating, percentage }, index) => (
            <div key={index} className="flex items-center space-x-4">
              <p className="text-sm font-medium text-gray-700 flex items-center">
                <span className="mt-1">{rating}</span>
              <ReactStars
                    count={1}
                    value={1}
                    edit={false}
                    size={20}
                    color2={'#008080'} />
              </p>
              <div className="w-full bg-gray-200 h-2 rounded-full relative">
                <div
                  className="absolute top-0 left-0 h-full bg-pink-600 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <p className="text-sm font-medium text-gray-700">{percentage}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;
