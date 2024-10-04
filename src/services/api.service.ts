import { API_CF7_V1, API_URL_V1 } from '../constants';
import { CategoriesContent } from '../types/categories.types';
import {
	AboutContent,
	BaseContent,
	CatalogContent,
	CategoryPageData,
	HomeContent
} from '../types/content.types';
import { FormField } from '../types/form.type';
import { MenuLink } from '../types/menu.types';
import { IProductContent, ProductCardsData } from '../types/products.types';

class ApiService {
	async getMenuLinks(menuSlug: string): Promise<MenuLink[] | undefined> {
		if (menuSlug) {
			try {
				const response = await fetch(`${API_URL_V1}/menu/${menuSlug}`);
				const data = response.json();
				return data;
			} catch (error) {
				console.log(error);
			}
		}
	}

	async getBaseContent(): Promise<BaseContent | undefined> {
		try {
			const response = await fetch(`${API_URL_V1}/base-content`);
			const data = response.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	async getHomePageContent(): Promise<HomeContent | undefined> {
		try {
			const response = await fetch(`${API_URL_V1}/home-page-content`);
			const data = response.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	async getAboutPageContent(): Promise<AboutContent | undefined> {
		try {
			const response = await fetch(`${API_URL_V1}/about-page-content`);
			const data = response.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	async getCategories(): Promise<CategoriesContent | undefined> {
		try {
			const response = await fetch(`${API_URL_V1}/bicycle-category`);
			const data = response.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	async getLatestProductCards(
		count: number
	): Promise<ProductCardsData | undefined> {
		try {
			const response = await fetch(
				`${API_URL_V1}/latest-bicycle-cards?count=${count}`
			);
			const data = response.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	async getAllProductCards(
		params: string
	): Promise<ProductCardsData | undefined> {
		try {
			const response = await fetch(`${API_URL_V1}/bicycle-cards${params}`);
			const data = response.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	async getCatalogPageContent(): Promise<CatalogContent | undefined> {
		try {
			const response = await fetch(`${API_URL_V1}/catalog-page-content`);
			const data = response.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	async getCategoryPageContent(
		term: string
	): Promise<CategoryPageData | undefined> {
		try {
			const response = await fetch(`${API_URL_V1}/category-term?term=${term}`);
			const data = response.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	async getProductContentBySlug(
		slug: string
	): Promise<IProductContent | undefined> {
		try {
			const response = await fetch(`${API_URL_V1}/bicycle/${slug}`);
			const data = response.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	async getCF7FormFields(formHash: string): Promise<FormField[] | undefined> {
		try {
			const response = await fetch(`${API_CF7_V1}/form?formHash=${formHash}`);
			const data = response.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	}
}

export const apiService = new ApiService();
