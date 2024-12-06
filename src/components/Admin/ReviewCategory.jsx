import ReviewCard from './ReviewCard';

export default function ReviewCategory({ category, reviews, onApprove, onReject }) {
  if (!Array.isArray(reviews)) {
      console.error(`Expected array but got ${typeof reviews}`, reviews);
      return null;
  }
    return (
        <div className="rounded-md h-[auto] border border-2">
            <div className="flex flex-col items-center w-[290px] min-w-[290px] h-full overflow-y-auto hideScroll">
                <p className="font-semibold sticky top-0 bg-gray-100 w-full p-2 uppercase text-xs">{category}</p>
                <div className="flex-1 flex flex-col gap-3 p-2 w-full">
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <ReviewCard
                                key={review._id}
                                review={review}
                                onApprove={onApprove}
                                onReject={onReject}
                            />
                        ))
                    ) : (
                        <p>No reviews available</p>
                    )}
                </div>
            </div>
        </div>
    );
}
