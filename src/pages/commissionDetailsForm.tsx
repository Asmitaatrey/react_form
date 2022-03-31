import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { ExternalProperties } from "../externalProperties"
import axios from "axios"
import { FormFieldsInterface, formValidationSchema } from "../utils"

const CommissionDetailsForm = () => {
	const currencyOptions: string[] = ["AED", "USD", "EUR", "DKK", "SEK", "INR"]
	const navigate = useNavigate()
	const initialFormValues: FormFieldsInterface = {
		date: new Date(),
		amount: 0,
		currency: "",
		client_id: 1,
	}

	const onSubmitform = async (
		values: FormFieldsInterface,
		actions: Object
	) => {
		axios
			.post(ExternalProperties().commissionRulesApiUrl, values)
			.then(function (response) {
				navigate("/commission", { state: response.data })
			})
			.catch(function (error) {
				// TO do extract error handling in a utils function
				alert(
					"There was an error trying to get the commission rates " +
                        error
				)
			})
	}

	return (//TODO implement react Error Boudary
		<div>
			<p className="lead text-center">
                Please enter the data below to caluculate the commission.
			</p>
			<div className="row d-flex justify-content-center">
				<div className="col-md-6 card mb-4 box-shadow">
					<Formik
						initialValues={initialFormValues}
						validationSchema={formValidationSchema}
						onSubmit={(values, actions) => {
							onSubmitform(values, actions)
						}}
						render={({ errors, touched }) => (
							<Form
								data-testid="commission-form"
								className="needs-validation"
							>
								<div className="mb-3 form-group row mt-3">
									<label
										htmlFor="date"
										className="col-sm-2 col-form-label"
									>
                                        Date
									</label>
									<div className="col-sm-6">
										<Field
											className="form-control"
											name="date"
											type="date"
											data-testid="date"
										/>
										<ErrorMessage
											name="date"
											component="div"
											className="field-error"
										/>
									</div>
								</div>
								<div className="mb-3 form-group row">
									<label
										htmlFor="amount"
										className="col-sm-2 col-form-label"
									>
                                        Amount
									</label>
									<div className="col-sm-6">
										<Field
											className="form-control"
											name="amount"
											placeholder="100"
											type="text"
											data-testid="amount"
										/>
										<ErrorMessage
											name="amount"
											component="div"
											className="field-error"
										/>
									</div>
								</div>
								<div className="mb-3 form-group row">
									<label
										htmlFor="client_id"
										className="col-sm-2 col-form-label"
									>
                                        Client ID
									</label>
									<div className="col-sm-6">
										<Field
											className="form-control"
											name="client_id"
											placeholder="Client ID"
											type="number"
											data-testid="client_id"
										/>
										<ErrorMessage
											name="client_id"
											component="div"
											className="field-error"
										/>
									</div>
								</div>
								<div className="form-group row">
									<label
										htmlFor="currency"
										className="col-sm-2 col-form-label"
									>
                                        Currency
									</label>
									<div className="col-sm-6">
										<Field
											name="currency"
											as="select"
											className="form-control custom-select d-block"
											data-testid="currency"
										>
											<option> choose currency</option>
											{currencyOptions.map(
												(currValue, index) => {
													return (
														<option
															key={index}
															value={currValue}
														>
															{currValue}
														</option>
													)
												}
											)}
										</Field>
										<ErrorMessage
											name="currency"
											component="div"
											className="field-error"
										/>
									</div>
								</div>

								<hr className="mb-4"></hr>

								<div className="d-flex justify-content-center">
									<button
										className="btn btn-primary btn-lg btn-block"
										type="submit"
									>
                                        Calculate Commission
									</button>
								</div>
							</Form>
						)}
					/>
				</div>
			</div>
		</div>
	)
}

export default CommissionDetailsForm
