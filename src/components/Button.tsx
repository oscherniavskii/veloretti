import { PropsWithChildren, type FC } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
	link: string;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, link }) => {
	return (
		<Link
			to={link}
			className='inline-block min-w-16 py-2 xs:py-3 px-3 xs:px-6 font-semibold text-black-text text-sm bg-white rounded-3xl hover:opacity-70 transition-all duration-200'
		>
			{children}
		</Link>
	);
};

export default Button;
