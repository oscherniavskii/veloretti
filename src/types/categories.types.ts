export interface CategoriesContent {
	title: string;
	button: string;
	categories: Category[];
}

export interface CategoryHeroData {
	before_cat_title: string;
	after_cat_title: string;
	category_title: string;
	category_cover: string;
}

export interface Category {
	id: number;
	name: string;
	slug: string;
	description: string;
	cover: string;
	preview: string;
	price: string;
}
