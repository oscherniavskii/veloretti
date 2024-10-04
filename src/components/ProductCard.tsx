import { useState, type FC } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowRightIcon } from '../assets/icons';
import { IFormData } from '../types/form.type';
import { IProductCard } from '../types/products.types';
import { getPrice } from '../utils/getPrice';
import ProductModal from './ProductModal';

interface ProductCardProps {
	product: IProductCard | undefined;
	buttonTitle: string | undefined;
	linkTitle: string | undefined;
	formData: IFormData | undefined;
}

const ProductCard: FC<ProductCardProps> = ({
	product,
	buttonTitle,
	linkTitle,
	formData
}) => {
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
		<article className='overflow-hidden bg-grey rounded-lg p-5 xs:p-7 sm:p-5 md:p-7'>
			<header className='flex items-center justify-between gap-x-8 gap-y-3 flex-wrap mb-3 xs:mb-5'>
				<h5 className='text-black-text font-semibold text-2xl xs:text-3xl'>
					{product?.title}
				</h5>
				<div className='text-sm xs:text-[16px] font-semibold'>
					{getPrice(product?.price || '0')}
				</div>
			</header>
			<div className='font-semibold text-[16px] mb-3 xs:mb-7 min-h-6'>
				{product?.description}
			</div>
			<div className='min-w-0 relative'>
				{product && product?.gallery.length > 0 ? (
					<>
						<Swiper
							modules={[Navigation]}
							spaceBetween={40}
							slidesPerView={1}
							speed={700}
							navigation={{
								nextEl: `.swiper-button-next-${product.id}`,
								prevEl: `.swiper-button-prev-${product.id}`
							}}
						>
							{product?.gallery.map((image, i) => (
								<SwiperSlide
									key={i}
									className='h-[300px] xs:h-[320px] md:h-[400px]'
								>
									<img
										className='w-full h-full object-contain'
										src={image}
										alt={product.title}
									/>
								</SwiperSlide>
							))}
						</Swiper>
						<button
							type='button'
							className={`swiper-button-prev-${product.id} block w-3 h-6 sm:w-4 sm:h-7 shrink-0 absolute z-10 left-0 xl:left-4 top-1/2 -translate-y-1/2`}
						>
							<ArrowRightIcon className='w-full h-full object-contain rotate-180' />
						</button>
						<button
							type='button'
							className={`swiper-button-next-${product.id} block w-3 h-6 sm:w-4 sm:h-7 shrink-0 absolute z-10 right-0 xl:right-4 top-1/2 -translate-y-1/2`}
						>
							<ArrowRightIcon className='w-full h-full object-contain' />
						</button>
					</>
				) : (
					<div className='h-[300px] xs:h-[320px] md:h-[400px]'>
						<img
							src={product?.thumbnail}
							alt={product?.title}
							className='w-full h-full object-cover'
						/>
					</div>
				)}
			</div>
			<footer className='flex items-center justify-between gap-x-3 pt-5 xs:pt-7'>
				<button
					type='button'
					onClick={openModal}
					className='inline-block min-w-36 xs:min-w-44 py-2 xs:py-3 px-3 xs:px-6 font-semibold text-black-text text-sm bg-white rounded-3xl hover:opacity-70 transition-all duration-200 '
				>
					{buttonTitle}
				</button>
				<Link
					className='underline text-xs xs:text-sm font-semibold hover:opacity-70 transition-all duration-200'
					to={`/catalog/${product?.slug}`}
				>
					{linkTitle}
				</Link>
			</footer>

			{isOpenModal &&
				product?.title &&
				createPortal(
					formData && (
						<ProductModal
							productName={product?.title}
							closeModal={closeModal}
							formContent={formData}
						/>
					),
					document.getElementById('modal-container')!
				)}
		</article>
	);
};

export default ProductCard;
