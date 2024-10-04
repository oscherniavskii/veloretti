import { type FC } from 'react';
import { useLatestProductCards } from '../hooks/api.hooks';
import Loader from './Loader';
import ProductCard from './ProductCard';
import SectionLayout from './SectionLayout';

interface LatestProdductSectionProps {
	count: number;
}

const LatestProdductSection: FC<LatestProdductSectionProps> = ({ count }) => {
	const { data: productCardsData, isLoading } = useLatestProductCards(count);

	return (
		<SectionLayout>
			{isLoading ? (
				<div className='w-full h-[650px] p-14'>
					<Loader />
				</div>
			) : (
				<div className='flex flex-col sm:grid sm:grid-cols-half gap-6 xs:gap-10'>
					{productCardsData?.cards.map(product => (
						<ProductCard
							product={product}
							key={product.id}
							buttonTitle={productCardsData.button}
							linkTitle={productCardsData.link}
							formData={productCardsData.product_form}
						/>
					))}
				</div>
			)}
		</SectionLayout>
	);
};

export default LatestProdductSection;
