import { useState } from "react";
import { useSelector } from "react-redux";

const FeedbackForm = ({ onAddReview }) => {
  const {user, token} = useSelector((state)=>state.auth);
  const [formData, setFormData] = useState({
    rating: null,
    review: "",
    contactAllowed: false,
    joinResearchGroup: false,
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { rating, review } = formData;

    if (!rating || !review.trim()) {
      alert("Please provide a rating and your feedback.");
      return;
    }

    const newReview = {
      rating,
      review,
    };

    onAddReview(newReview);

    setFormData({
      rating: null,
      review: "",
      contactAllowed: false,
      joinResearchGroup: false,
    });
  };

  return (
    <div className=" bg-blue-50 w-full">
      <form
        className="bg-white rounded-lg px-6 py-4 md:w-[700px w-full border h-auto shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Give Feedback
        </h2>
        <p className="text-gray-600 mb-2">
        </p>
        <div className="flex justify-evenly mb-6">
          {["Terrible", "Bad", "Okay", "Good", "Amazing"].map(
            (option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleRatingChange(index + 1)}
                className={`flex flex-col items-center px-3 py-2 rounded-md border ${
                  formData.rating === index + 1
                    ? "border-pink-500 bg-pink-100 text-pink-500"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                <span
                  className={`text-2xl ${
                    formData.rating === index + 1 ? "text-pink-500" : "text-gray-400"
                  }`}
                >
                  {index === 0
                    ? "😞"
                    : index === 1
                    ? "😟"
                    : index === 2
                    ? "😐"
                    : index === 3
                    ? "😊"
                    : "😃"}
                </span>
                <span className="text-sm">{option}</span>
              </button>
            )
          )}
        </div>
        <div className="mb-2">
          <label
            htmlFor="review"
            className="block text-gray-700 font-medium mb-2"
          >
            What are the main reasons for your rating?
          </label>
          <textarea
            id="review"
            name="review"
            value={formData.review}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500"
            placeholder="Your feedback..."
          ></textarea>
        </div>
        <div className="mb-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="contactAllowed"
              checked={formData.contactAllowed}
              onChange={handleChange}
              className="h-4 w-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
            />
            <span className="ml-2 text-gray-600">
              I may be contacted about this feedback.{" "}
              <a href="#" className="text-pink-500 underline">
                Privacy Policy
              </a>
            </span>
          </label>
        </div>
        <div className="mb-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="joinResearchGroup"
              checked={formData.joinResearchGroup}
              onChange={handleChange}
              className="h-4 w-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
            />
            <span className="ml-2 text-gray-600">
              I’d like to help improve by joining the{" "}
              <a href="#" className="text-pink-500 underline">
                Research Group
              </a>
            </span>
          </label>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-pink-500 rounded-md hover:bg-pink-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;

