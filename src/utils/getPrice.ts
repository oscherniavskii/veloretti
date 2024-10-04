export const getPrice = (price: string): string => {
	const value = '€ ';
	const newPrice = value + price;

	return newPrice;
};
