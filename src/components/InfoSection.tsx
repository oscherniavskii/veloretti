import { type FC } from 'react';
import { InfoBlock } from '../types/content.types';
import Loader from './Loader';

interface InfoSectionProps {
	content: InfoBlock | undefined;
	coverPosition?: 'left' | 'right' | 'full';
	variant?: 'padding' | 'full';
	container?: boolean;
	isLoading: boolean;
	gap?: boolean;
	textStyle?: 'default' | 'opacity' | 'white';
}

const InfoSection: FC<InfoSectionProps> = ({
	content,
	coverPosition = 'left',
	variant = 'padding',
	isLoading,
	container = true,
	gap = true,
	textStyle = 'default'
}) => {
	if (isLoading)
		return (
			<div className='w-full h-[750px] p-14'>
				<Loader />
			</div>
		);

	return (
		<section
			className={`${
				variant === 'padding'
					? 'py-8 pt-0 xs:py-10 xs:pt-0 sm:py-20'
					: 'py-8 pt-0 xs:py-10 xs:pt-0 sm:py-0'
			} ${
				coverPosition === 'full' ? 'flex items-center' : ''
			} relative min-h-[420px] sm:min-h-[750px]`}
		>
			<div className={`${container ? 'main-container' : ''}`}>
				<div
					className={`flex flex-col sm:grid grid-cols-half ${
						gap ? 'gap-8 sm:gap-16' : 'gap-8 sm:gap-0'
					}`}
				>
					<div
						className={`${
							variant === 'padding' && coverPosition !== 'full'
								? 'h-[360px] xs:h-[540px] sm:h-[640px]'
								: 'h-[400px] xs:h-[600px] sm:h-[750px]'
						} ${coverPosition === 'left' ? 'sm:order-1' : ''} ${
							coverPosition === 'full' ? 'h-full sm:absolute top-0 left-0' : ''
						} ${!container && 'px-3 sm:px-0'} w-full order-2`}
					>
						<img
							src={content?.cover}
							alt='Info block'
							className='w-full h-full object-cover'
						/>
					</div>
					<div
						className={`${coverPosition === 'left' ? 'sm:order-2' : ''} ${
							!container
								? coverPosition === 'right'
									? 'pl-3 pr-3 sm:pr-10 md:pr-0 md:pl-0 justify-center xl:justify-end xl:pr-28'
									: 'pr-3 pl-3 sm:pl-10 md:pr-0 md:pl-0 justify-center xl:justify-start xl:pl-28'
								: 'justify-center'
						} flex items-center z-10 w-full h-full order-1`}
					>
						<div
							className={`max-w-[450px] font-semibold ${
								coverPosition === 'full' ? 'sm:font-normal' : ''
							} text-black-text text-opacity-90`}
						>
							<h2
								className={`text-2xl sx:text-3xl sm:text-4xl mb-5 text-center sm:text-left ${
									textStyle === 'opacity' ? 'text-black-text' : ''
								} ${
									textStyle === 'white' ? 'text-black-text sm:text-white' : ''
								}`}
							>
								{content?.title}
							</h2>
							<p
								className={`text-sm text-center sm:text-left ${
									textStyle === 'opacity'
										? 'text-black-text text-opacity-40'
										: ''
								} ${
									textStyle === 'white' ? 'text-black-text sm:text-white' : ''
								} ${
									coverPosition === 'full'
										? 'max-w-[450px] sm:max-w-[320px]'
										: ''
								}`}
							>
								{content?.text}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default InfoSection;
