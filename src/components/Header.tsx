import { useEffect, useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import { Loader, NavMenu } from '.';
import { CloseIcon, MenuArrow, MenuIcon } from '../assets/icons';
import { useBaseContent } from '../hooks/api.hooks';

const Header: FC = () => {
	const { data: content, isLoading } = useBaseContent();
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const phone = content?.phone.replace(/[ ()-]/g, '');

	useEffect(() => {
		if (isMenuOpen) {
			document.body.classList.add('overflow-hidden');
		} else {
			document.body.classList.remove('overflow-hidden');
		}
	}, [isMenuOpen]);

	return (
		<header className='w-full fixed top-0 left-0 bg-white z-50 shadow-sm'>
			<div className='main-container relative'>
				<div className='py-4 flex items-center justify-between gap-5 min-h-6'>
					<div className='flex items-center gap-14 before:w-full before:h-14 before:bg-white before:absolute before:top-0 before:left-0 before:z-50 md:before:hidden'>
						<Link
							to={'/'}
							className='block h-4 w-30 sm:h-5 sm:w-36 overflow-hidden z-50'
						>
							{isLoading ? (
								<Loader />
							) : (
								<img
									src={content?.logo_url}
									alt='Logo'
									className='h-full w-full object-contain'
								/>
							)}
						</Link>
						<div
							className={`fixed md:static top-0 left-0 w-screen h-screen md:w-auto md:h-auto flex flex-col items-center p-5 md:p-0 md:pt-0 pt-20 bg-white transition-all duration-300 ${
								isMenuOpen
									? 'overflow-y-auto'
									: 'translate-x-full md:translate-x-0 '
							}`}
						>
							<NavMenu
								menuSlug='menu-header'
								subMenuIcon={MenuArrow}
								nestingLevel={1}
								className='header-menu'
								loaderOptions={{
									backgroundColor: '#F0F0F0',
									speed: 1.5,
									height: 19,
									width: 70,
									viewBox: '0 0 70 20',
									radius: 5
								}}
								onClickItem={() => setIsMenuOpen(false)}
							/>
							{content?.phone && (
								<a
									className='inline-block xs:hidden text-lg mt-5 font-semibold text-black-text'
									href={`tel:${phone}`}
								>
									{content?.phone}
								</a>
							)}
						</div>
					</div>
					{isLoading ? (
						<div className='w-60 h-5'>
							<Loader />
						</div>
					) : (
						<div className='flex items-center  gap-x-3 sm:gap-x-5 md:gap-x-10 z-50'>
							{content?.phone && (
								<a
									className='hidden xs:inline-block text-sm sm:text-[16px] font-semibold text-black-text md:hover:text-opacity-70'
									href={`tel:${phone}`}
								>
									{content?.phone}
								</a>
							)}
							<div className='flex items-center gap-x-2 sm:gap-x-4'>
								{content?.social.map((icon, i) => (
									<a
										href={icon.social_link}
										target='_blank'
										key={i}
										className='block h-5 w-5 md:hover:opacity-70 transition-all duration-200 md:hover:scale-90'
									>
										<img
											src={icon.social_icon}
											alt={icon.social_title}
											className='h-full w-full object-contain'
										/>
									</a>
								))}
							</div>
							<button
								className='md:hidden'
								onClick={() => setIsMenuOpen(!isMenuOpen)}
							>
								{isMenuOpen ? <CloseIcon /> : <MenuIcon />}
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
