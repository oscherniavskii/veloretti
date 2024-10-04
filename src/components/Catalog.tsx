import { useQuery } from '@tanstack/react-query';
import { useEffect, useState, type FC } from 'react';
import { apiService } from '../services/api.service';
import { IFormData } from '../types/form.type';
import { IProductCard } from '../types/products.types';
import Loader from './Loader';
import ProductCard from './ProductCard';
import SectionLayout from './SectionLayout';

interface CatalogProps {
	term?: string;
	perPage?: number;
}

const Catalog: FC<CatalogProps> = ({ term = '', perPage = 4 }) => {
	const [offset, setOffset] = useState<number>(0);
	const [allPosts, setAllPosts] = useState<IProductCard[]>([]);
	const [allPostsLoaded, setAllPostsLoaded] = useState<boolean>(false);
	const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);
	const [buttonTitle, setButtonTitle] = useState<string>('');
	const [linkTitle, setlinkTitle] = useState<string>('');
	const [formData, setFormData] = useState<IFormData | undefined>(undefined);

	const { data, isLoading, isSuccess, isFetching } = useQuery({
		queryKey: [
			'get all product cards',
			`?&perPage=${perPage}&offset=${offset}${
				term.length ? `&term=${term}` : ''
			}`
		],
		queryFn: () =>
			apiService.getAllProductCards(
				`?&perPage=${perPage}&offset=${offset}${
					term.length ? `&term=${term}` : ''
				}`
			),
		select: data => data,
		refetchOnWindowFocus: false
	});

	useEffect(() => {
		if (isSuccess || isFetching) {
			if (data?.cards && data.cards.length > 0) {
				setAllPosts(prev => {
					let isOld = false;

					prev.forEach(item => {
						if (item.id === data.cards[0].id) isOld = true;
					});

					if (isOld) return [...prev];

					return [...prev, ...data.cards];
				});
				if (data.cards.length < perPage) {
					setAllPostsLoaded(true);
				}
			} else {
				setAllPostsLoaded(true);
			}
			setIsMoreLoading(false);
			if (data?.link && !linkTitle.length) setlinkTitle(data?.link);
			if (data?.button && !buttonTitle.length) setButtonTitle(data?.button);
			if (data?.product_form.id && !formData) setFormData(data?.product_form);
		}
	}, [isSuccess, offset, isFetching]);

	useEffect(() => {
		setOffset(0);
		setAllPosts([]);
		setAllPostsLoaded(false);
	}, [term]);

	return (
		<SectionLayout>
			{isLoading && allPosts.length === 0 ? (
				<div className='w-full h-[800px] p-14'>
					<Loader />
				</div>
			) : (
				<>
					<div className='flex flex-col sm:grid sm:grid-cols-half gap-6 xs:gap-10'>
						{allPosts.map(product => (
							<ProductCard
								key={product.id}
								product={product}
								buttonTitle={buttonTitle}
								linkTitle={linkTitle}
								formData={formData}
							/>
						))}
					</div>
					{!allPostsLoaded && (
						<div className='pt-10 text-center'>
							<button
								className='py-2 xs:py-3 px-3 xs:px-6 font-semibold bg-black text-white rounded-3xl sm:hover:opacity-70 transition-all duration-200 min-w-48'
								onClick={() => {
									setIsMoreLoading(true);
									setOffset(prev => prev + perPage);
								}}
								disabled={isMoreLoading}
							>
								{isMoreLoading ? 'Загружаем...' : 'Загрузить ещё'}
							</button>
						</div>
					)}
				</>
			)}
		</SectionLayout>
	);
};

export default Catalog;
