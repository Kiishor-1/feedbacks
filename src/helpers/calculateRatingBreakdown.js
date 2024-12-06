export const calculateRatingBreakdown = (reviews) => {
    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    reviews.forEach((review) => {
        if (ratingCounts.hasOwnProperty(review.rating)) {
            ratingCounts[review.rating] += 1;
        }
    });

    const totalReviews = reviews.length;
    const ratingBreakdown = Object.keys(ratingCounts).map((rating) => {
        const count = ratingCounts[rating];
        const percentage = totalReviews === 0 ? 0 : ((count / totalReviews) * 100).toFixed(1);
        return { rating: parseInt(rating), percentage: parseFloat(percentage) };
    });

    return ratingBreakdown;
};
