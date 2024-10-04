import { type FC } from 'react';
import { Helmet } from 'react-helmet';
import {
	CategoriesSection,
	HeroSection,
	InfoSection,
	Loader,
	SectionLayout
} from '../components';
import { useAboutContent } from '../hooks/api.hooks';

const AboutPage: FC = () => {
	const { data: content, isLoading } = useAboutContent();

	return (
		<>
			<Helmet>
				{isLoading ? (
					<title>О нас загружается...</title>
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
			<InfoSection content={content?.info_block1} isLoading={isLoading} />
			<InfoSection
				content={content?.info_block2}
				isLoading={isLoading}
				coverPosition='right'
			/>
			<SectionLayout>
				{isLoading ? (
					<div className='w-full h-[650px]'>
						<Loader />
					</div>
				) : (
					<>
						<h2 className=' text-black-text text-4xl xs:text-5xl max-w-lg sm:text-6xl sm:max-w-xl md:text-7xl md:max-w-2xl text-center mx-auto'>
							{content?.made}
						</h2>
					</>
				)}
			</SectionLayout>
			<InfoSection
				content={content?.info_block3}
				isLoading={isLoading}
				coverPosition='full'
				textStyle='white'
			/>
			<CategoriesSection />
		</>
	);
};

export default AboutPage;
