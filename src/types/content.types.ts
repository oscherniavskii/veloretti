import { CategoryHeroData } from './categories.types';
import { IFormData } from './form.type';

//Base site content types
export interface BaseContent {
	logo_url: string;
	adress: string;
	phone: string;
	dop_phones: string[];
	emails: string[];
	social: SocialIcon[];
	map: string;
	titles: Titles;
	contact_titles: ContactTitles;
}

interface SocialIcon {
	social_icon: string;
	social_icon_dark: string;
	social_title: string;
	social_link: string;
}

interface Titles {
	explorer: string;
	menu: string;
	contacts: string;
}

interface ContactTitles {
	tels: string;
	emails: string;
	adr: string;
}

export interface HeroSection {
	title: string;
	before: string;
	after?: string;
}

export interface InfoBlock {
	cover: string;
	title: string;
	text: string;
}

//Home page content types
export interface HomeContent {
	page_id: number;
	thumbnail_url: string;
	site_name: string;
	site_description: string;
	hero: HeroSection;
	info_block1: InfoBlock;
	info_block2: InfoBlock;
	info_block3: InfoBlock;
	info_block4: InfoBlock;
	faq: Faq;
	contact_form: IFormData;
}

export interface Faq {
	title: string;
	faqs: FaqItem[];
}

interface FaqItem {
	question: string;
	answer: string;
}

//About page content types
export interface AboutContent {
	page_id: number;
	thumbnail_url: string;
	page_name: string;
	page_description: string;
	hero: HeroSection;
	info_block1: InfoBlock;
	info_block2: InfoBlock;
	info_block3: InfoBlock;
	made: string;
}

//Catalog page content types
export interface CatalogContent {
	page_id: number;
	thumbnail_url: string;
	page_name: string;
	page_description: string;
	hero: HeroSection;
	info_block1: InfoBlock;
	info_block2: InfoBlock;
	info_block3: InfoBlock;
	info_block4: InfoBlock;
	commut: Commut;
	talked: IReview;
}

interface Commut {
	icon: string;
	title: string;
	text: string;
}

export interface IReview {
	title: string;
	reviews: IReviewItem[];
}

export interface IReviewItem {
	text: string;
	icon: string;
}

//Category page content types
export interface CategoryPageData {
	category: CategoryHeroData;
	faq: Faq;
	talked: IReview;
}
