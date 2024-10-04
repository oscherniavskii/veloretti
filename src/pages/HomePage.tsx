import { PropsWithChildren, type FC } from 'react';
import { Helmet } from 'react-helmet';
import {
	ContactForm,
	FaqSection,
	HeroSection,
	InfoSection,
	LatestProdductSection,
	Loader,
	SectionLayout
} from '../components';
import { useHomeContent } from '../hooks/api.hooks';

const HomePage: FC<PropsWithChildren> = () => {
	const { data: content, isLoading } = useHomeContent();

	return (
		<>
			<Helmet>
				{isLoading ? (
					<title>Главная загружается...</title>
				) : (
					<title>{`${content?.site_name} - ${content?.site_description}`}</title>
				)}
			</Helmet>
			<HeroSection
				cover={content?.thumbnail_url}
				title={content?.hero.title}
				beforeTitle={content?.hero.before}
				isLoading={isLoading}
			/>
			<InfoSection content={content?.info_block1} isLoading={isLoading} />
			<InfoSection
				content={content?.info_block2}
				isLoading={isLoading}
				coverPosition='full'
				textStyle='white'
			/>
			<InfoSection content={content?.info_block3} isLoading={isLoading} />
			<InfoSection
				content={content?.info_block4}
				isLoading={isLoading}
				coverPosition='right'
			/>
			<LatestProdductSection count={2} />
			{content?.contact_form.id && (
				<SectionLayout>
					{isLoading ? (
						<div className='w-full h-[650px]'>
							<Loader />
						</div>
					) : (
						<ContactForm formContent={content?.contact_form} />
					)}
				</SectionLayout>
			)}
			<FaqSection faq={content?.faq} isLoading={isLoading} />
		</>
	);
};

export default HomePage;
