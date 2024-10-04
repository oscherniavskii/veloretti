import { useState, type FC } from 'react';
import { createPortal } from 'react-dom';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowRightIcon } from '../assets/icons';
import {
	InfoSection,
	Loader,
	ProductModal,
	SectionLayout
} from '../components';
import { useProductContent } from '../hooks/api.hooks';
import { getPrice } from '../utils/getPrice';

const ProductPage: FC = () => {
	const { slug } = useParams();
	const { data: content, isLoading } = useProductContent(slug!);
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

	const openModal = () => {
		setIsOpenModal(true);
		document.body.classList.add('overflow-hidden');
	};

	const closeModal = () => {
		setIsOpenModal(false);
		document.body.classList.remove('overflow-hidden');
	};

	return (
		<>
			<Helmet>
				{isLoading ? (
					<title>Товар загружается...</title>
				) : (
					<title>{`${content?.title} - VELORETTI`}</title>
				)}
			</Helmet>
			<section
				className={`pt-14 md:pt-[54px] ${
					content && content.gallery.length > 0 ? 'md:bg-grey' : ''
				}`}
			>
				<div className='main-container'>
					{isLoading ? (
						<div className='w-full h-[650px]'>
							<Loader />
						</div>
					) : (
						<div className='flex items-stretch flex-col md:flex-row'>
							<div className='basis-3/5 min-w-0 relative'>
								{content && content.gallery.length > 0 ? (
									<>
										<Swiper
											modules={[Navigation]}
											speed={700}
											spaceBetween={40}
											slidesPerView={1}
											navigation={{
												nextEl: `.swiper-button-next-${content.id}`,
												prevEl: `.swiper-button-prev-${content.id}`
											}}
										>
											{content?.gallery.map((image, i) => (
												<SwiperSlide
													key={i}
													className='h-[300px] xs:h-[320px] md:h-[600px] xl:h-[750px]'
												>
													<img
														className='w-full h-full object-contain'
														src={image}
														alt={content.title}
													/>
												</SwiperSlide>
											))}
										</Swiper>
										<button
											type='button'
											className={`swiper-button-prev-${content.id} block w-3 h-6 sm:w-4 sm:h-7 shrink-0 absolute z-10 left-0 xl:left-4 top-1/2 -translate-y-1/2`}
										>
											<ArrowRightIcon className='w-full h-full object-contain rotate-180' />
										</button>
										<button
											type='button'
											className={`swiper-button-next-${content.id} block w-3 h-6 sm:w-4 sm:h-7 shrink-0 absolute z-10 right-0 xl:right-4 top-1/2 -translate-y-1/2`}
										>
											<ArrowRightIcon className='w-full h-full object-contain' />
										</button>
									</>
								) : (
									<div className='h-[300px] xs:h-[320px] md:h-[400px] xl:h-[750px]'>
										<img
											src={content?.thumbnail}
											alt={content?.title}
											className='w-full h-full object-cover'
										/>
									</div>
								)}
							</div>
							<div className='basis-2/5 bg-white relative after:hidden md:after:block after:h-full after:w-[50vw] after:bg-white after:absolute after:top-0 after:-right-[50vw] md:px-8 py-10 flex flex-col justify-between'>
								<div>
									<div className='flex items-start justify-between gap-x-5 gap-y-3 mb-4 '>
										<h1 className='text-2xl font-semibold'>{content?.title}</h1>
										<div className='text-xl font-semibold text-black-text text-opacity-80'>
											{getPrice(content?.price || '0')}
										</div>
									</div>
									<div className='text-sm font-semibold text-black-text text-opacity-60 pt-4 border-t-[1px] border-black border-opacity-10 text-center sm:text-left'>
										{content?.description}
									</div>
								</div>
								<div className='pt-10 md:pt-4'>
									<button
										className='text-sm font-semibold text-white bg-black border-black border-[1px] p-3 rounded-full block w-full sm:w-80 md:w-full hover:bg-white hover:text-black-text transition-all duration-300 mb-5'
										type='button'
										onClick={openModal}
									>
										{content?.button}
									</button>
									{content?.info && content?.info.length > 0 && (
										<ul className='pt-4 border-t-[1px] border-black border-opacity-10 text-center sm:text-left'>
											{content.info.map((text, i) => (
												<li
													className='text-sm font-semibold text-black-text text-opacity-70 mb-2 last:mb-0'
													key={i}
												>
													{text}
												</li>
											))}
										</ul>
									)}
								</div>
							</div>
						</div>
					)}
				</div>
			</section>
			{(content?.info_block1.text || content?.info_block1.title) && (
				<InfoSection
					content={content?.info_block1}
					isLoading={isLoading}
					coverPosition='full'
					textStyle='white'
				/>
			)}
			{(content?.info_block2.text || content?.info_block2.title) && (
				<InfoSection
					content={content?.info_block2}
					isLoading={isLoading}
					coverPosition='right'
					gap={false}
					variant='full'
					container={false}
				/>
			)}
			{(content?.info_block3.text || content?.info_block3.title) && (
				<InfoSection
					content={content?.info_block3}
					isLoading={isLoading}
					gap={false}
					variant='full'
					container={false}
				/>
			)}
			{(content?.info_block4.text || content?.info_block4.title) && (
				<InfoSection
					content={content?.info_block4}
					isLoading={isLoading}
					coverPosition='full'
					textStyle='white'
				/>
			)}
			{(content?.info_block5.text || content?.info_block5.title) && (
				<InfoSection
					content={content?.info_block5}
					isLoading={isLoading}
					coverPosition='right'
					gap={false}
					variant='full'
					container={false}
				/>
			)}
			{(content?.info_block6.text || content?.info_block6.title) && (
				<InfoSection
					content={content?.info_block6}
					isLoading={isLoading}
					gap={false}
					variant='full'
					container={false}
				/>
			)}
			{(content?.info_block7.text || content?.info_block7.title) && (
				<InfoSection
					content={content?.info_block7}
					isLoading={isLoading}
					coverPosition='right'
					gap={false}
					variant='full'
					container={false}
				/>
			)}
			{(content?.info_block8.text || content?.info_block8.title) && (
				<InfoSection
					content={content?.info_block8}
					isLoading={isLoading}
					coverPosition='full'
					textStyle='white'
				/>
			)}
			{(content?.info_block9.text || content?.info_block9.title) && (
				<InfoSection content={content?.info_block9} isLoading={isLoading} />
			)}
			{(content?.info_block10.text || content?.info_block10.title) && (
				<InfoSection
					content={content?.info_block10}
					isLoading={isLoading}
					coverPosition='right'
				/>
			)}
			<SectionLayout>
				{isLoading ? (
					<div className='w-full h-[700px]'>
						<Loader />
					</div>
				) : (
					<>
						<h2 className='text-2xl sm:text-4xl font-semibold mb-2 sm:mb-4 md:mb-5'>
							{content?.details.title}
						</h2>
						<div className='p-5 sm:p-8 block xs:grid grid-cols-half md:grid-cols-third gap-x-5 sm:gap-x-10 gap-y-8 md:gap-y-10'>
							{content?.details.block1.title &&
								content.details.block1.items.length && (
									<div className='pt-6 first:pt-0 xs:pt-0'>
										<h4 className='text-xl md:text-2xl font-semibold mb-3 xs:mb-5'>
											{content?.details.block1.title}
										</h4>
										<ul className='px-5 xs:px-3 sm:px-5'>
											{content?.details.block1.items.map((item, i) => (
												<li className='mb-2 last:mb-0' key={i}>
													<div className='text-[16px] md:text-lg font-semibold'>
														{item.name}
													</div>
													<div className='text-black-text text-sm md:text-[16px] text-opacity-70'>
														{item.value}
													</div>
												</li>
											))}
										</ul>
									</div>
								)}
							{content?.details.block2.title &&
								content.details.block2.items.length && (
									<div className='pt-6 first:pt-0 xs:pt-0'>
										<h4 className='text-xl md:text-2xl font-semibold mb-3 xs:mb-5'>
											{content?.details.block2.title}
										</h4>
										<ul className='px-5 xs:px-3 sm:px-5'>
											{content?.details.block2.items.map((item, i) => (
												<li className='mb-2 last:mb-0' key={i}>
													<div className='text-[16px] md:text-lg font-semibold'>
														{item.name}
													</div>
													<div className='text-black-text text-sm md:text-[16px] text-opacity-70'>
														{item.value}
													</div>
												</li>
											))}
										</ul>
									</div>
								)}
							{content?.details.block3.title &&
								content.details.block3.items.length && (
									<div className='pt-6 first:pt-0 xs:pt-0'>
										<h4 className='text-xl md:text-2xl font-semibold mb-3 xs:mb-5'>
											{content?.details.block3.title}
										</h4>
										<ul className='px-5 xs:px-3 sm:px-5'>
											{content?.details.block3.items.map((item, i) => (
												<li className='mb-2 last:mb-0' key={i}>
													<div className='text-[16px] md:text-lg font-semibold'>
														{item.name}
													</div>
													<div className='text-black-text text-sm md:text-[16px] text-opacity-70'>
														{item.value}
													</div>
												</li>
											))}
										</ul>
									</div>
								)}
						</div>
					</>
				)}
			</SectionLayout>

			{isOpenModal &&
				content?.title &&
				createPortal(
					content.product_form.id && (
						<ProductModal
							productName={content?.title}
							closeModal={closeModal}
							formContent={content.product_form}
						/>
					),
					document.getElementById('modal-container')!
				)}
		</>
	);
};

export default ProductPage;
