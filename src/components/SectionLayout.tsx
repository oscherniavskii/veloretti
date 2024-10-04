import { PropsWithChildren, type FC } from 'react';

const SectionLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<section className='pt-0 pb-8 xs:pb-10 sm:pt-20 sm:pb-20'>
			<div className='main-container'>{children}</div>
		</section>
	);
};

export default SectionLayout;
