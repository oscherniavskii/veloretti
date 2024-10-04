import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api.service';

export const useMenuLinks = (menuSlug: string) => {
	const { data, isLoading } = useQuery({
		queryKey: ['get menu links', menuSlug],
		queryFn: () => apiService.getMenuLinks(menuSlug),
		select: data => data
	});

	return { data, isLoading };
};

export const useBaseContent = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get base content'],
		queryFn: () => apiService.getBaseContent(),
		select: data => data
	});

	return { data, isLoading };
};

export const useHomeContent = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get home page content'],
		queryFn: () => apiService.getHomePageContent(),
		select: data => data
	});

	return { data, isLoading };
};

export const useAboutContent = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get about page content'],
		queryFn: () => apiService.getAboutPageContent(),
		select: data => data
	});

	return { data, isLoading };
};

export const useAllCategories = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get all taxonomies'],
		queryFn: () => apiService.getCategories(),
		select: data => data
	});

	return { data, isLoading };
};

export const useLatestProductCards = (count: number = 2) => {
	const { data, isLoading } = useQuery({
		queryKey: ['get latest product cards'],
		queryFn: () => apiService.getLatestProductCards(count),
		select: data => data
	});

	return { data, isLoading };
};

export const useCatalogContent = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get catalog page content'],
		queryFn: () => apiService.getCatalogPageContent(),
		select: data => data
	});

	return { data, isLoading };
};

export const useCategoryContent = (term: string) => {
	const { data, isLoading } = useQuery({
		queryKey: ['get category page content', term],
		queryFn: () => apiService.getCategoryPageContent(term),
		select: data => data
	});

	return { data, isLoading };
};

export const useProductContent = (slug: string) => {
	const { data, isLoading } = useQuery({
		queryKey: ['get category page content', slug],
		queryFn: () => apiService.getProductContentBySlug(slug),
		select: data => data
	});

	return { data, isLoading };
};

export const useFormFielsCF7 = (formHash: string) => {
	const { data, isLoading } = useQuery({
		queryKey: ['get form fields', formHash],
		queryFn: () => apiService.getCF7FormFields(formHash),
		select: data => data
	});

	return { data, isLoading };
};
