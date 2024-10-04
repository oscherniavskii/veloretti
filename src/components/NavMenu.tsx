import { type FC } from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import { Link, useLocation } from 'react-router-dom';
import { useMenuLinks } from '../hooks/api.hooks';
import { MenuLink } from '../types/menu.types';

interface NavMenuProps {
	menuSlug: string;
	className?: string;
	subMenuIcon?: FC<React.SVGProps<SVGSVGElement>>;
	nestingLevel?: number;
	emptyMessage?: string;
	onClickItem?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
	loaderOptions?: IContentLoaderProps;
}

interface LinkItemProps {
	url: string;
	title: string;
	onClickItem?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

interface LinksGroup {
	link: MenuLink;
	isActive: (url: string) => boolean;
	Icon?: FC<React.SVGProps<SVGSVGElement>>;
	onClickItem?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

// Function for cut off nested menus according to the specified level (nestingLevel)
const processMenuItems = (
	menuLinks: MenuLink[],
	currentLevel: number,
	nestingLevel?: number
): MenuLink[] => {
	if (nestingLevel === 0) {
		return menuLinks.map(link => ({
			...link,
			children: []
		}));
	}

	if (!nestingLevel || currentLevel < nestingLevel) {
		return menuLinks.map(link => ({
			...link,
			children: processMenuItems(
				link.children || [],
				currentLevel + 1,
				nestingLevel
			)
		}));
	} else {
		return menuLinks.map(link => ({
			...link,
			children: []
		}));
	}
};

const MenuLoader = (props: IContentLoaderProps) => (
	<ContentLoader
		speed={2}
		width={80}
		height={19}
		viewBox='0 0 80 20'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
		{...props}
	>
		<rect x='0' y='0' rx='3' ry='3' width='80' height='19' />
	</ContentLoader>
);

const LinkItem: FC<LinkItemProps> = ({ url, title, onClickItem }) => (
	<Link to={url} onClick={onClickItem}>
		{title}
	</Link>
);

const LinksGroup: FC<LinksGroup> = ({ link, isActive, Icon, onClickItem }) => (
	<li
		className={
			isActive(link.url)
				? 'current-menu-item menu-item-has-children'
				: 'menu-item-has-children'
		}
	>
		{link.url.length > 0 ? (
			<LinkItem url={link.url} title={link.title} onClickItem={onClickItem} />
		) : (
			<span>{link.title}</span>
		)}
		{Icon && <Icon />}
		{link.children && link.children.length > 0 && (
			<ul>
				{link.children.map(link => {
					if (link.children.length > 0) {
						return (
							<LinksGroup
								key={link.id}
								link={link}
								isActive={isActive}
								Icon={Icon}
								onClickItem={onClickItem}
							/>
						);
					} else {
						return (
							<li
								key={link.id}
								className={isActive(link.url) ? 'current-menu-item' : ''}
							>
								<LinkItem
									url={link.url}
									title={link.title}
									onClickItem={onClickItem}
								/>
							</li>
						);
					}
				})}
			</ul>
		)}
	</li>
);

const NavMenu: FC<NavMenuProps> = ({
	className,
	menuSlug,
	subMenuIcon,
	nestingLevel,
	emptyMessage = 'There are no menu items available',
	onClickItem,
	loaderOptions
}) => {
	const { data: menuLinks, isLoading } = useMenuLinks(menuSlug);
	const location = useLocation();

	const isActive = (url: string) => location.pathname === url;

	if (isLoading)
		return (
			<div className={`${className} loader`}>
				<MenuLoader {...loaderOptions} />
				<MenuLoader {...loaderOptions} />
				<MenuLoader {...loaderOptions} />
			</div>
		);
	if (!menuLinks?.length)
		return <div className={`${className} empty`}>{emptyMessage}</div>;

	const processedMenuLinks = processMenuItems(menuLinks || [], 0, nestingLevel);

	return (
		<nav className={className}>
			<ul>
				{processedMenuLinks?.map(link => {
					if (link.children.length > 0) {
						return (
							<LinksGroup
								key={link.id}
								link={link}
								isActive={isActive}
								Icon={subMenuIcon}
								onClickItem={onClickItem}
							/>
						);
					} else {
						return (
							<li
								key={link.id}
								className={isActive(link.url) ? 'current-menu-item' : ''}
							>
								<LinkItem
									url={link.url}
									title={link.title}
									onClickItem={onClickItem}
								/>
							</li>
						);
					}
				})}
			</ul>
		</nav>
	);
};

export default NavMenu;
