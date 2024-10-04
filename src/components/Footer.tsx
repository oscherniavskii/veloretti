import { type FC } from 'react';
import { useBaseContent } from '../hooks/api.hooks';
import Loader from './Loader';
import NavMenu from './NavMenu';

const Footer: FC = () => {
	const { data: content, isLoading } = useBaseContent();

	const phone = content?.phone.replace(/[ ()-]/g, '');

	return (
		<footer className='flex-shrink-0 flex-grow-0 bg-black relative'>
			<div className='main-container'>
				<div className='pt-10 sm:pt-14 pb-14 sm:pb-20 grid grid-cols-footer-xs xs:grid-cols-footer-md md:grid-cols-footer text-white text-opacity-60 gap-x-10 gap-y-6 xs:gap-y-8  sm:gap-y-12'>
					<div>
						{isLoading ? (
							<div className='w-24 h-5 mb-3'>
								<Loader type='dark' />
							</div>
						) : (
							<h4 className='text-white-title font-semibold text-lg sm:text-xl mb-2 sm:mb-3'>
								{content?.titles.explorer}
							</h4>
						)}

						<NavMenu
							menuSlug='explorer-footer'
							nestingLevel={0}
							className='footer-menu'
							loaderOptions={{
								backgroundColor: '#141615',
								speed: 1.5,
								height: 19,
								width: 70,
								viewBox: '0 0 70 20',
								radius: 5
							}}
						/>
					</div>
					<div>
						{isLoading ? (
							<div className='w-24 h-5 mb-3'>
								<Loader type='dark' />
							</div>
						) : (
							<h4 className='text-white-title font-semibold text-lg sm:text-xl mb-2 sm:mb-3'>
								{content?.titles.menu}
							</h4>
						)}

						<NavMenu
							menuSlug='menu-footer'
							nestingLevel={0}
							className='footer-menu'
							loaderOptions={{
								backgroundColor: '#141615',
								speed: 1.5,
								height: 19,
								width: 70,
								viewBox: '0 0 70 20',
								radius: 5
							}}
						/>
					</div>
					<div>
						{isLoading ? (
							<div className='w-24 h-5 mb-3'>
								<Loader type='dark' />
							</div>
						) : (
							<h4 className='text-white-title font-semibold text-lg sm:text-xl mb-2 sm:mb-3'>
								{content?.titles.contacts}
							</h4>
						)}

						{content?.phone && (
							<div className='mb-3'>
								{isLoading ? (
									<div className='w-28 h-3 mb-3'>
										<Loader type='dark' />
									</div>
								) : (
									<div className='text-white-title text-sm font-semibold mb-1'>
										{content?.contact_titles.tels}
									</div>
								)}

								{isLoading ? (
									<div className='w-36 h-28 mb-3'>
										<Loader type='dark' />
									</div>
								) : (
									<ul className='pl-3 flex flex-col gap-y-1 text-white text-opacity-60 text-sm'>
										<li>
											<a
												href={`tel:${phone}`}
												className='hover:text-white-title transition-all duration-300'
											>
												{content?.phone}
											</a>
										</li>
										{content?.dop_phones.length &&
											content.dop_phones.map((tel, i) => {
												const phone = tel.replace(/[ ()-]/g, '');
												return (
													<li key={i}>
														<a
															href={`tel:${phone}`}
															className='hover:text-white-title transition-all duration-300'
														>
															{tel}
														</a>
													</li>
												);
											})}
									</ul>
								)}
							</div>
						)}

						{content?.emails.length && (
							<div className='mb-3'>
								{isLoading ? (
									<div className='w-28 h-3 mb-3'>
										<Loader type='dark' />
									</div>
								) : (
									<div className='text-white-title text-sm font-semibold mb-1'>
										{content?.contact_titles.emails}
									</div>
								)}

								{isLoading ? (
									<div className='w-36 h-28 mb-1'>
										<Loader type='dark' />
									</div>
								) : (
									<ul className='pl-3 flex flex-col gap-y-1 text-white text-opacity-60 text-sm'>
										{content?.emails.length &&
											content.emails.map((email, i) => (
												<li key={i}>
													<a
														href={`mailto:${email}`}
														className='hover:text-white-title transition-all duration-300'
													>
														{email}
													</a>
												</li>
											))}
									</ul>
								)}
							</div>
						)}

						{content?.adress && (
							<div>
								<div className='text-white-title text-sm font-semibold mb-1'>
									{content?.contact_titles.adr}
								</div>
								<div className='pl-3 text-white text-opacity-60 text-sm'>
									{content?.adress}
								</div>
							</div>
						)}
					</div>
					<div className='pl-0 md:pl-5 lg:pl-16 xl:pl-28 col-span-1 xs:col-span-2 sm:col-span-1'>
						{isLoading ? (
							<div className='w-full h-60 border-4 border-white/60 bg-black opacity-80 mb-5'>
								<Loader type='dark' />
							</div>
						) : (
							content?.map && (
								<div
									className='map h-60 border-4 border-white/60 bg-black opacity-90 mb-5'
									dangerouslySetInnerHTML={{ __html: content.map }}
								/>
							)
						)}
						{isLoading ? (
							<div className='w-60 h-6'>
								<Loader type='dark' />
							</div>
						) : (
							<div className='flex items-center gap-x-2 sm:gap-x-4'>
								{content?.social.map((icon, i) => (
									<a
										href={icon.social_link}
										target='_blank'
										key={i}
										className='block h-6 w-6 md:hover:opacity-100 transition-all duration-200 md:hover:scale-90 opacity-70'
									>
										<img
											src={icon.social_icon_dark}
											alt={icon.social_title}
											className='h-full w-full object-contain'
										/>
									</a>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
