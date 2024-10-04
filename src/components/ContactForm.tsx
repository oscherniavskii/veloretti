import { useEffect, useState, type FC } from 'react';
import { HOST } from '../constants';
import { useFormFielsCF7 } from '../hooks/api.hooks';
import { IFormData } from '../types/form.type';
import Loader from './Loader';

interface ContactFormProps {
	formContent: IFormData;
	productName?: string;
}

interface FormState {
	[key: string]: string;
}

const ContactForm: FC<ContactFormProps> = ({ formContent, productName }) => {
	const { data: formFields, isLoading: isFieldsLoading } = useFormFielsCF7(
		formContent.hash
	);
	const [formData, setFormData] = useState<FormState>({});
	const [status, setStatus] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [sendingData, setSendingData] = useState<boolean>(false);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (status.length > 0) setStatus('');
		if (error.length > 0) setError('');

		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formElement = e.target as HTMLFormElement;
		const formDataToSend = new FormData(formElement);

		try {
			setSendingData(true);
			const response = await fetch(
				`${HOST}/wp-json/contact-form-7/v1/contact-forms/${formContent.id}/feedback`,
				{
					method: 'POST',
					body: formDataToSend
				}
			);

			const data = await response.json();

			if (data.status === 'mail_sent') {
				setSendingData(false);
				setStatus(data.message);
				if (formFields) {
					const initialState: FormState = {};
					formFields.forEach(field => {
						initialState[field.name] = field.value;
					});
					setFormData(initialState);
				}
			} else {
				setSendingData(false);
				setError('Ошибка отправки. Попробуйте позже.');
			}
		} catch (error) {
			console.error('Ошибка при отправке данных:', error);
			setSendingData(false);
			setError('Ошибка отправки. Попробуйте позже.');
		}
	};

	useEffect(() => {
		if (formFields) {
			const initialState: FormState = {};
			formFields.forEach(field => {
				initialState[field.name] = field.value;
			});

			if (productName) initialState['product'] = productName;

			setFormData(initialState);
		}
	}, [formFields]);

	return (
		<>
			<h2 className=' text-black-text text-3xl xs:text-4xl sm:text-5xl text-center font-semibold mb-8 xs:mb-10 sm:mb-12'>
				{formContent.title}
			</h2>

			{isFieldsLoading ? (
				<div className='w-full h-[50vh]'>
					<Loader />
				</div>
			) : (
				<form
					onSubmit={handleSubmit}
					className={`max-w-2xl mx-auto ${productName ? 'mb-5 xs:mb-10' : ''}`}
				>
					<div>
						{formFields?.map(field => (
							<div key={field.name} className='mb-4 xs:mb-5'>
								{field.type === 'textarea' && (
									<textarea
										className='w-full px-5 py-3 xs:py-4 rounded-sm border-black border-opacity-10 border-[1px] text-black-text text-opacity-90 text-sm font-semibold placeholder:text-black-text placeholder:text-opacity-60 placeholder:text-sm placeholder:font-semibold outline-black/30 resize-none min-h-60'
										name={field.name}
										placeholder={`${field.placeholder}${
											field.required ? '*' : ''
										}`}
										required={field.required}
										value={formData[field.name] || ''}
										onChange={handleInputChange}
									/>
								)}
								{(field.type === 'text' ||
									field.type === 'tel' ||
									field.type === 'email') && (
									<input
										className='w-full px-5 py-3 xs:py-4 rounded-sm border-black border-opacity-10 border-[1px] text-black-text text-opacity-90 text-sm font-semibold placeholder:text-black-text placeholder:text-opacity-60 placeholder:text-sm placeholder:font-semibold outline-black/30 '
										type={field.type}
										name={field.name}
										placeholder={`${field.placeholder}${
											field.required ? '*' : ''
										}`}
										required={field.required}
										value={formData[field.name] || ''}
										onChange={handleInputChange}
									/>
								)}
								{field.type === 'number' && (
									<label className='flex items-center gap-5'>
										<span className='text-black-text text-opacity-60 text-sm font-semibold shrink-0'>{`${
											field.placeholder
										}${field.required ? '*' : ''}`}</span>
										<input
											className='w-full px-5 py-3 xs:py-4 rounded-sm border-black border-opacity-10 border-[1px] text-black-text text-opacity-90 text-sm font-semibold placeholder:text-black-text placeholder:text-opacity-60 placeholder:text-sm placeholder:font-semibold outline-black/30 basis-20'
											type={field.type}
											name={field.name}
											required={field.required}
											value={formData[field.name] || 1}
											onChange={handleInputChange}
											min={1}
										/>
									</label>
								)}
								{field.type === 'hidden' && (
									<input
										type={field.type}
										name={field.name}
										value={field.value}
									/>
								)}
							</div>
						))}
					</div>
					{!productName && (
						<div>
							<button
								type='submit'
								disabled={sendingData}
								className={`p-3 block w-full bg-black-text bg-opacity-50 rounded-full text-white text-sm font-semibold border-black-text border-opacity-0 border-2 hover:border-opacity-50 hover:bg-white hover:text-black-text transition-all duration-300 outline-black/60 ${
									sendingData ? 'opacity-60' : ''
								}`}
							>
								{sendingData ? 'Отправляем...' : formContent.button}
							</button>
						</div>
					)}
					{status.length > 0 && (
						<div
							className={`text-sm xs:text-lg font-semibold text-center text-green max-w-sm mx-auto ${
								productName ? 'pt-0 pb-5' : 'py-5'
							}`}
						>
							{status}
						</div>
					)}
					{error.length > 0 && (
						<div
							className={`text-sm xs:text-lg font-semibold text-center text-red/80 max-w-sm mx-auto ${
								productName ? 'pt-0 pb-5' : 'py-5'
							}`}
						>
							{error}
						</div>
					)}
					{productName && (
						<div>
							<button
								type='submit'
								disabled={sendingData}
								className={`p-3 block w-full bg-black-text bg-opacity-50 rounded-full text-white text-sm font-semibold border-black-text border-opacity-0 border-2 hover:border-opacity-50 hover:bg-white hover:text-black-text transition-all duration-300 ${
									sendingData ? 'opacity-60' : ''
								}`}
							>
								{sendingData ? 'Отправляем...' : formContent.button}
							</button>
						</div>
					)}
				</form>
			)}
		</>
	);
};

export default ContactForm;
