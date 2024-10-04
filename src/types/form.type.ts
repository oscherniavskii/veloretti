export interface FormField {
	type: string;
	name: string;
	placeholder: string;
	required: boolean;
	value: string;
}

export interface IFormData {
	id: string;
	hash: string;
	title: string;
	button: string;
}
