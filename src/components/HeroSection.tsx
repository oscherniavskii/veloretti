import { type FC } from 'react';
import Loader from './Loader';

interface HeroSectionProps {
	title: string | undefined;
	beforeTitle: string | undefined;
	afterTitle?: string;
	cover: string | undefined;
	isLoading: boolean;
}

const HeroSection: FC<HeroSectionProps> = ({
	title,
	beforeTitle,
	afterTitle,
	isLoading,
	cover
}) => {
	if (isLoading)
		return (
			<div className='w-screen h-screen'>
				<Loader />
			</div>
		);

	return (
		<section className='relative w-full min-h-screen py-14 mb-8 xs:mb-10 sm:mb-0 flex items-center'>
			<div className='w-full h-full absolute top-0 left-0 after:w-full after:h-full after:absolute after:top-0 after:left-0 after:block after:bg-black after:opacity-30'>
				<img
					src={cover}
					alt='Hero section'
					className='w-full h-full object-cover'
				/>
			</div>

			<div className='main-container relative w-full text-white-title text-center sm:text-left'>
				<div className='uppercase text-sm xs:text-lg mb-1'>{beforeTitle}</div>
				<h1 className='capitalize text-3xl xs:text-4xl md:text-6xl mb-4 last:mb-0'>
					{title}
				</h1>
				{afterTitle && (
					<div className='text-sm xs:text-lg capitalize'>{afterTitle}</div>
				)}
			</div>
		</section>
	);
};

export default HeroSection;
