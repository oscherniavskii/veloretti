import { type FC } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import {
	Catalog,
	FaqSection,
	HeroSection,
	ReviewsSection
} from '../components';
import { useCategoryContent } from '../hooks/api.hooks';

const CategoryPage: FC = () => {
	const { slug } = useParams();
	const { data: content, isLoading } = useCategoryContent(slug || '');

	return (
		<>
			<Helmet>
				{isLoading ? (
					<title>Категория загружается...</title>
				) : (
					<title>{`${content?.category?.category_title} - VELORETTI`}</title>
				)}
			</Helmet>
			<HeroSection
				cover={content?.category?.category_cover}
				title={content?.category?.category_title}
				beforeTitle={content?.category?.before_cat_title}
				afterTitle={content?.category?.after_cat_title}
				isLoading={isLoading}
			/>
			<Catalog perPage={6} term={slug} />
			<ReviewsSection review={content?.talked} isLoading={isLoading} />
			<FaqSection faq={content?.faq} isLoading={isLoading} />
		</>
	);
};

export default CategoryPage;
