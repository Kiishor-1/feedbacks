import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USER_ROLES } from "../helpers/userRoles";
import { addReview, fetchReviews } from "../slices/reviewSlice";
import { calculateRatingBreakdown } from "../helpers/calculateRatingBreakdown";
import Spinner from "../components/Spinner";
import FeedbackForm from "../components/FeedbackForm";
import ReviewSummary from "../components/ReviewSummary";
import ReviewSlider from "../components/ReviewSlider";
import { FaBars } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../slices/authSlice";
import toast from "react-hot-toast";

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { reviews, average, isLoading, error } = useSelector(state => state.review);
    const { user, token, role } = useSelector(state => state.auth);

    useEffect(() => {
        if (user && token) {
            if (role === USER_ROLES.USER) {
                navigate('/');
            } else if (role === USER_ROLES.ADMIN) {
                navigate("/admin");
            }
        } else {
            navigate('/login');
        }
    }, [user, token, navigate, role]);

    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch]);

    const handleAddReview = (review) => {
        dispatch(addReview(review));
    };

    const ratingBreakdown = useMemo(() => {
        return calculateRatingBreakdown(reviews);
    }, [reviews]);

    console.log(ratingBreakdown)

    const sampleData = {
        average: average,
        totalRatings: reviews.length,
        ratingBreakdown: ratingBreakdown,
    };

    const [dropdown, setDropdown] = useState(false);
    const handleShow = () => {
        setDropdown(!dropdown);
    }


    const handleLogout = async () => {
        try {
            dispatch(logout())
            toast.success("User logged out successfully");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(error.message || 'Error during logout')
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    if(error){
        toast.error('Something went wrong');
        return;
    }

    return (
        <div>
            <div className="flex md:flex-row flex-col items-start p-2 gap-4 relative">
                <div className="md:absolute top-0 right-0 text-4xl text-teal-900 p-4 mb-3 md:text-end font-bold drop-shadow-[2px_10px_2px_gray]">
                    <div className="flex items-center relative">
                        <span> Feedbacks</span>
                        <span onClick={handleShow} className="cursor-pointer"> <FaBars /></span>
                        <div onClick={handleLogout} className={`${dropdown ? 'block' : 'hidden'} cursor-pointer absolute top-[100%] right-0 text-[1rem] text-white gap-2  flex items-center px-10 py-2 rounded-md bg-[#3D5B59]`}>
                            <FiLogOut />
                            Logout
                        </div>
                    </div>
                </div>
                <FeedbackForm onAddReview={handleAddReview} />
                <ReviewSummary
                    totalRatings={sampleData.totalRatings}
                    average={sampleData.average || 0}
                    ratingBreakdown={sampleData.ratingBreakdown}
                />
            </div>
            <ReviewSlider reviews={reviews} />
        </div>
    );
}
