import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import ReviewContainer from './ReviewContainer';
import Header from './Header';
import { fetchAllReviews } from '../../services/operations/adminReviewApi';
import ReactStars from 'react-stars';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const Feedbacks = () => {
    const [metrics, setMetrics] = useState({
        totalReviews: 0,
        averageRating: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        ratingPercentages: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const data = await fetchAllReviews();
                setMetrics(data?.metrics);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMetrics();
    }, []);

    const {
        totalReviews,
        averageRating,
        ratingDistribution,
        ratingPercentages,
    } = metrics;

    const ratingData = {
        labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
        datasets: [
            {
                data: [
                    ratingDistribution[1],
                    ratingDistribution[2],
                    ratingDistribution[3],
                    ratingDistribution[4],
                    ratingDistribution[5],
                ],
                backgroundColor: ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93'],
                hoverOffset: 4,
            },
        ],
    };

    if (loading) {
        return <div>Loading metrics...</div>;
    }

    if (error) {
        return <div>Error fetching metrics: {error}</div>;
    }

    return (
        <div className="admin-panel flex flex-col h-full w-full overflow-hidden py-4">
            <Header />
            <div className="h-full w-full overflow-hidden flex">
                <ReviewContainer />
                <section className="px-4 flex-1 h-full overflow-auto hideScroll">
                    <div className="border h-full p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Review Metrics</h2>

                        <div className="mb-6">
                            <h3 className="text-md font-semibold">Total Reviews: <span className="text-indigo-600">{totalReviews}</span></h3>
                            <h3 className="text-md font-semibold">Average Rating: <span className="text-indigo-600">{averageRating}</span></h3>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-md font-semibold mb-4">Rating Distribution</h3>
                            <div className="chart-container">
                                <Pie data={ratingData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                            </div>
                        </div>

                        <div className="rating-percentages grid grid-cols-3 gap-4">
                            {Object.keys(ratingPercentages).map((rating) => (
                                <div key={rating} className="border h-[4rem] w-[4rem] p-3 shadow-sm flex items-center justify-center rounded-full flex-col p- ">
                                    <h4 className="font-semibold text-center text-xs flex items-center">
                                        {rating}
                                        <ReactStars
                                            count={1}
                                            value={1}
                                            edit={false}
                                            size={14}
                                            color2={'#008080'} />
                                    </h4>

                                    <div className="text-center text-xs">{ratingPercentages[rating]}%</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Feedbacks;
