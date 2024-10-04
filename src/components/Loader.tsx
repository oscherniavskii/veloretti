import { type FC } from 'react';
import ContentLoader from 'react-content-loader';

interface LoaderProps {
	type?: 'light' | 'dark';
}

const Loader: FC<LoaderProps> = ({ type = 'light' }) => {
	return (
		<span className='w-full h-full inline-block'>
			<ContentLoader
				speed={2}
				width='100%'
				height='100%'
				viewBox='0 0 200 100'
				preserveAspectRatio='none'
				backgroundColor={type === 'light' ? '#F0F0F0' : '#141615'}
				foregroundColor='#ecebeb'
			>
				<rect x='0' y='0' rx='0' ry='0' width='100%' height='100%' />
			</ContentLoader>
		</span>
	);
};

export default Loader;
