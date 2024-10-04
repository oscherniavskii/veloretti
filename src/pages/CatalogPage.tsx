import { type FC } from 'react';
import { Helmet } from 'react-helmet';
import {
	CategoriesSection,
	HeroSection,
	InfoSection,
	LatestProdductSection,
	Loader,
	ReviewsSection,
	SectionLayout
} from '../components';
import { useCatalogContent } from '../hooks/api.hooks';

const CatalogPage: FC = () => {
	const { data: content, isLoading } = useCatalogContent();

	return (
		<>
			<Helmet>
				{isLoading ? (
					<title>Каталог загружается...</title>
				) : (
					<title>{`${content?.page_name} - ${content?.page_description}`}</title>
				)}
			</Helmet>
			<HeroSection
				cover={content?.thumbnail_url}
				title={content?.hero.title}
				beforeTitle={content?.hero.before}
				afterTitle={content?.hero.after}
				isLoading={isLoading}
			/>
			<LatestProdductSection count={2} />
			<CategoriesSection />
			<SectionLayout>
				{isLoading ? (
					<div className='w-full h-[650px]'>
						<Loader />
					</div>
				) : (
					<>
						<h2 className='max-w-[900px] text-3xl xs:text-4xl md:text-5xl font-semibold mb-12 sm:mb-16 md:mb-20 text-center sm:text-left'>
							{content?.commut.title}
						</h2>
						<div className='block xs:flex items-start justify-between gap-10 pb-5 sm:pb-10'>
							<p className='max-w-2xl text-sm sm:text-[16px] font-semibold mb-3 xs:mb-0'>
								{content?.commut.text}
							</p>
							<div className='h-6 xs:h-8 sm:h-10 shrink-0'>
								<img
									className='ml-auto w-auto xs:w-full h-full object-contain'
									src={content?.commut.icon}
									alt='Icon'
								/>
							</div>
						</div>
					</>
				)}
			</SectionLayout>
			<InfoSection
				content={content?.info_block1}
				isLoading={isLoading}
				coverPosition='full'
				textStyle='white'
			/>
			<InfoSection content={content?.info_block2} isLoading={isLoading} />
			<ReviewsSection review={content?.talked} isLoading={isLoading} />
			<InfoSection
				content={content?.info_block3}
				isLoading={isLoading}
				coverPosition='full'
				textStyle='white'
			/>
			<InfoSection
				content={content?.info_block4}
				isLoading={isLoading}
				coverPosition='right'
			/>
		</>
	);
};

export default CatalogPage;
