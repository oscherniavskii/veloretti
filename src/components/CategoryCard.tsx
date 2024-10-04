import { type FC } from 'react';
import { Category } from '../types/categories.types';
import Button from './Button';

interface CategoryCardProps {
	category: Category;
	buttonTitle: string;
}

const CategoryCard: FC<CategoryCardProps> = ({ category, buttonTitle }) => {
	return (
		<article className='bg-grey rounded-lg overflow-hidden p-5 xs:p-7'>
			<header className='flex items-center justify-between gap-x-5 mb-3 xs:mb-5 flex-wrap gap-y-3'>
				<div className='text-xl xs:text-2xl font-semibold'>{category.name}</div>
				<div className='text-sm xs:text-[16px] font-semibold'>
					{category.price}
				</div>
			</header>
			<div className='text-sm xs:text-lg pb-3'>{category.description}</div>
			<div className='pb-5 xs:pb-8 w-full h-64'>
				<img
					className='w-full h-full object-cover'
					src={category.preview}
					alt={category.name}
				/>
			</div>
			<footer>
				<Button link={`/category/${category.slug}`}>{buttonTitle}</Button>
			</footer>
		</article>
	);
};

export default CategoryCard;
