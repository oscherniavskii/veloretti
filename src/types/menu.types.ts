export interface MenuLink {
	id: number;
	title: string;
	url: string;
	parent: string;
	children: MenuLink[];
}
