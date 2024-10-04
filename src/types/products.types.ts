import { InfoBlock } from './content.types';
import { IFormData } from './form.type';

export interface ProductCardsData {
	cards: IProductCard[];
	button: string;
	link: string;
	product_form: IFormData;
}

export interface IProductCard {
	id: number;
	title: string;
	slug: string;
	description: string;
	price: string;
	gallery: string[];
	thumbnail: string;
}

export interface IProductContent extends IProductCard {
	button: string;
	delivery: string;
	info: string[];
	info_block1: InfoBlock;
	info_block2: InfoBlock;
	info_block3: InfoBlock;
	info_block4: InfoBlock;
	info_block5: InfoBlock;
	info_block6: InfoBlock;
	info_block7: InfoBlock;
	info_block8: InfoBlock;
	info_block9: InfoBlock;
	info_block10: InfoBlock;
	details: IDetails;
	product_form: IFormData;
}

interface IDetails {
	title: string;
	block1: DetailsBlock;
	block2: DetailsBlock;
	block3: DetailsBlock;
}

interface DetailsBlock {
	title: string;
	items: DetailsItem[];
}

interface DetailsItem {
	name: string;
	value: string;
}
