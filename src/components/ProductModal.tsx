import { type FC } from 'react';
import { CloseIcon } from '../assets/icons';
import { IFormData } from '../types/form.type';
import ContactForm from './ContactForm';

interface ProductModalProps {
	productName: string;
	closeModal: () => void;
	formContent: IFormData;
}

const ProductModal: FC<ProductModalProps> = ({
	productName,
	closeModal,
	formContent
}) => {
	return (
		<div className='w-screen h-screen fixed top-0 left-0 z-50 flex items-center justify-center p-3'>
			<div
				onClick={closeModal}
				className='w-full h-full absolute top-0 left-0 bg-black/40'
			/>
			<div className='h-[81vh] max-w-3xl w-full bg-white rounded-md p-5 xs:p-8 relative flex items-center justify-center'>
				<div className='overflow-y-auto w-full h-[70vh]'>
					<ContactForm formContent={formContent} productName={productName} />
				</div>
				<button
					className='absolute top-3 right-3 xs:top-4 xs:right-4'
					onClick={closeModal}
				>
					<CloseIcon />
				</button>
			</div>
		</div>
	);
};

export default ProductModal;
