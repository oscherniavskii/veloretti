import { type FC } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const NotFoundPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Страница не найдена</title>
			</Helmet>
			<section className='relative bg-black/90'>
				<div className='main-container'>
					<div className='min-h-screen pt-14 pb-10 flex flex-col items-center justify-center relative'>
						<h1 className='text-white font-semibold text-3xl sm:text-5xl text-center max-w-xl mb-10'>
							Запрашиваемая страница не найдена
						</h1>
						<Link
							className='text-white font-semibold block bg-black rounded-full px-10 py-2 sm:py-3 border-2 border-black border-opacity-50 hover:bg-white hover:text-black-text transition-all duration-200'
							to={'/'}
						>
							Перейти на главную
						</Link>
					</div>
				</div>
			</section>
		</>
	);
};

export default NotFoundPage;
