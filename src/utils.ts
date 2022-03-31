import * as Yup from "yup"

export interface FormFieldsInterface {
    amount: number
    date: Date
    currency: string
    client_id: number
}

export const formValidationSchema = Yup.object().shape({
	amount: Yup.number().required("Amount is required"),
	date: Yup.date().required("Date is required"),
	client_id: Yup.number().required("Client ID is required"),
	currency: Yup.string().required("Currency is required"),
})
