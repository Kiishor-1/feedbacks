import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,  Navigation } from 'swiper/modules';
import ReviewCard from './ReviewCard';


export default function ReviewSlider({ reviews }) {
    return (
        <div className='w-full h-[240px]'>
            <h1 className="text-teal-900 text-4xl font-semibold p-4 my-2">
                Reviews from users
            </h1>
            <div className="w-11/12 mx-auto flex-col items-center justify-between gap-8 first-letter">
                {
                     reviews?.length ? (
                        <Swiper loop={true}
                            pagination={true}
                            modules={[Autoplay, Navigation]}
                            className="mySwiper bg-blue-50"
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            navigation={true}
                            breakpoints={{
                                1300: {
                                    slidesPerView: 4,
                                    spaceBetween: 30
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 30
                                },
                                992: {
                                    slidesPerView: 3,
                                    spaceBetween: 40
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 20
                                },
                                450: {
                                    slidesPerView: 1,
                                    spaceBetween: 20
                                },
                            }}>
                            {
                                reviews.map((item, idx) => (
                                    <div className="" key={idx}>
                                        <SwiperSlide>
                                            <ReviewCard item={item} />
                                        </SwiperSlide>
                                    </div>
                                ))
                            }

                        </Swiper>
                    ) : (
                        <p className='w-full text-center py-16 my-8 text-richblack-5 text-3xl border border-richblack-400 '>No Reviews Yet</p>
                    )
                }
            </div>
        </div>
    )
}
