import { type FC } from 'react';
import { Faq as FaqType } from '../types/content.types';
import Faq from './Faq';
import Loader from './Loader';
import SectionLayout from './SectionLayout';

interface FaqSectionProps {
	faq: FaqType | undefined;
	isLoading: boolean;
}

const FaqSection: FC<FaqSectionProps> = ({ faq, isLoading }) => {
	return (
		<SectionLayout>
			{isLoading ? (
				<div className='w-full h-[800px]'>
					<Loader />
				</div>
			) : (
				<div>
					<h2 className='text-center text-black-text font-semibold text-3xl xs:text-5xl sm:text-7xl md:text-8xl mb-4 xs:mb-6 sm:mb-8'>
						{faq?.title}
					</h2>
					<ul className='max-w-4xl mx-auto border-t-[1px] border-black/50'>
						{faq?.faqs.map((item, i) => (
							<li key={i} className='border-b-[1px] border-black/50'>
								<Faq
									question={item.question}
									answer={item.answer}
									isOpen={i === 0 ? true : false}
								/>
							</li>
						))}
					</ul>
				</div>
			)}
		</SectionLayout>
	);
};

export default FaqSection;
