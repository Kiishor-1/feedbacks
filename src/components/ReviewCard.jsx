import ReactStars from 'react-stars'
import { formatDate } from '../helpers/formatDate'
export default function ReviewCard({ item }) {
    return (
        <div className='flex flex-col gap-y-4 bg-[#01061c bg-white rounded-lg shadow-md p-4 max-w-[400px] mx-auto'>
            <div className="flex items-center justify-between gap-x-4">
                <div className="flex items-center gap-2">
                    <img src={item?.user.image ? item.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${item?.user?.username}`} className='w-[40px] h-[40px] rounded-full' alt="" />
                    <h2 className='text-[13px] font-semibold'>{item?.user?.username}</h2>
                </div>
                <p className='text-xs font-semibold text-richblack-400'>{formatDate(item?.createdAt)}</p>
            </div>
            <p className="">{item?.review}</p>
            <div className="flex items-center gap-x-3 text-[14px]">
                <p className="">{item?.rating}</p>
                <ReactStars
                    count={5}
                    value={item?.rating}
                    edit={false}
                    size={20}
                    color2={'#008080'} />
            </div>
        </div>
    )
}
