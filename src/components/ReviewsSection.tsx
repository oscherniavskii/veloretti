import { type FC } from 'react';
import { IReview } from '../types/content.types';
import Loader from './Loader';
import SectionLayout from './SectionLayout';

interface ReviewsSectionProps {
	review: IReview | undefined;
	isLoading: boolean;
}

const ReviewsSection: FC<ReviewsSectionProps> = ({ review, isLoading }) => {
	const reviewItems = review?.reviews.map((item, i) => (
		<article
			className='p-5 xs:p-7 sm:p-10 pb-3 w-full border-black border-[1px] border-opacity-10 flex flex-col h-full justify-between'
			key={i}
		>
			<p className='text-[16px] sm:text-lg font-semibold mb-2 sm:mb-5'>
				{item.text}
			</p>
			<div className='w-28 h-16 sm:w-44 md:h-20'>
				<img
					className='w-full h-full object-contain'
					src={item.icon}
					alt='Icon'
				/>
			</div>
		</article>
	));

	return (
		<SectionLayout>
			{isLoading ? (
				<div className='w-full h-[650px] p-14'>
					<Loader />
				</div>
			) : (
				<>
					<h2 className='text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 xs:mb-10 sm:mb-16 md:mb-20 text-center sm:text-left'>
						{review?.title}
					</h2>
					<div className='grid sm:grid-cols-half md:grid-cols-third gap-5 sm:gap-7 md:gap-10'>
						{reviewItems}
					</div>
				</>
			)}
		</SectionLayout>
	);
};

export default ReviewsSection;
