import { useState, type FC } from 'react';

interface FaqProps {
	question: string;
	answer: string;
	isOpen?: boolean;
}

const Faq: FC<FaqProps> = ({ question, answer, isOpen = false }) => {
	const [isAnswerOpen, setIsAnswerOpen] = useState(isOpen);
	return (
		<>
			<div className='pt-4 pb-4 xs:pt-5 xs:pb-5 sm:pt-7 sm:pb-7'>
				<button
					className='flex items-start justify-between gap-x-5 w-full md:hover:opacity-75 transition-all duration-300'
					onClick={() => setIsAnswerOpen(!isAnswerOpen)}
				>
					<h4 className='font-semibold text-black-text text-lg xs:text-xl sm:text-2xl text-left'>
						{question}
					</h4>
					<div className='text-xl xs:text-2xl sm:text-3xl leading-none font-semibold mt-[1px] sm:mt-[2px]'>
						{isAnswerOpen ? '-' : '+'}
					</div>
				</button>
			</div>
			<div
				className={`${
					isAnswerOpen
						? 'leading-5 xs:leading-6 pb-4 xs:pb-5 sm:pb-7 opacity-100'
						: 'leading-[0px] pb-0 opacity-0'
				} font-semibold text-black-text text-opacity-60 overflow-hidden transition-all duration-300 text-[14px] xs:text-[16px] sm:text-[18px]`}
			>
				{answer}
			</div>
		</>
	);
};

export default Faq;
