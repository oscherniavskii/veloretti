import { type FC } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowRightIcon } from '../assets/icons';
import { useAllCategories } from '../hooks/api.hooks';
import CategoryCard from './CategoryCard';
import Loader from './Loader';
import SectionLayout from './SectionLayout';

const CategoriesSection: FC = () => {
	const { data: categories, isLoading } = useAllCategories();

	return (
		<SectionLayout>
			{isLoading ? (
				<div className='w-full h-[650px] p-14'>
					<Loader />
				</div>
			) : (
				<>
					<div className='flex items-center justify-between gap-x-5 sm:gap-x-7 mb-5'>
						<h2 className='text-black-text font-semibold text-xl sm:text-2xl'>
							{categories?.title}
						</h2>
						<div className='flex items-center gap-x-8 sm:gap-x-10'>
							<button
								type='button'
								className='swiper-button-prev block w-3 h-6 sm:w-4 sm:h-7'
							>
								<ArrowRightIcon className='w-full h-full object-contain rotate-180' />
							</button>
							<button
								type='button'
								className='swiper-button-next block w-3 h-6 sm:w-4 sm:h-7 shrink-0'
							>
								<ArrowRightIcon className='w-full h-full object-contain' />
							</button>
						</div>
					</div>
					<Swiper
						modules={[Navigation]}
						spaceBetween={40}
						slidesPerView={2.5}
						speed={700}
						autoHeight
						navigation={{
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev'
						}}
						breakpoints={{
							100: {
								slidesPerView: 1
							},
							768: {
								slidesPerView: 1.5
							},
							992: {
								slidesPerView: 2
							},
							1280: {
								slidesPerView: 2.5
							}
						}}
					>
						{categories?.categories.map(category => (
							<SwiperSlide key={category.id}>
								<CategoryCard
									category={category}
									buttonTitle={categories.button}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</>
			)}
		</SectionLayout>
	);
};

export default CategoriesSection;
