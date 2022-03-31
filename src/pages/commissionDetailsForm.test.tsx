import * as React from "react"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { render, waitFor, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import CommissionDetailsForm from "./commissionDetailsForm"
import userEvent from "@testing-library/user-event"

const server = setupServer(
	rest.post(
		"http://localhost:8088/connect/api/getCommissionRate",
		(req, res, ctx) => {
			return res(
				ctx.json({
					amount: "0.03",
					currency: "EUR",
				})
			)
		}
	)
)
const mockedUsedNavigate = jest.fn()
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockedUsedNavigate,
}))

const initFormInteractions = async (
	comDate: string,
	commCurrency: string,
	commAmount: string,
	commClient_id: string
) => {
	const user = userEvent.setup()
	await user.type(screen.getByTestId("date"), comDate)
	await userEvent.selectOptions(screen.getByTestId("currency"), commCurrency)
	await user.clear(screen.getByTestId("amount"))
	await user.type(screen.getByTestId("amount"), commAmount)
	await user.clear(screen.getByTestId("client_id"))
	await user.type(screen.getByTestId("client_id"), commClient_id)

	await user.click(
		screen.getByRole("button", { name: /Calculate Commission/i })
	)
}

const clickButton = async () => {
	const user = userEvent.setup()
	await user.click(
		screen.getByRole("button", { name: /Calculate Commission/i })
	)
}

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("displays the commissionDetailsForm", async () => {
	render(<CommissionDetailsForm />)
	await initFormInteractions("22-02-2022", "AED", "100", "42")
	await waitFor(() => {
		expect(screen.getByTestId("commission-form")).toHaveFormValues({
			currency: "AED",
			amount: "100",
			client_id: 42,
		})
		expect(screen.getByRole("button")).toHaveTextContent(
			"Calculate Commission"
		)
	})
})

test("calls the commission details service on form submit", async () => {
	render(<CommissionDetailsForm />)
	await initFormInteractions("22-02-2022", "AED", "100", "42")
	await clickButton()
	await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalled())
})

test("handles server error", async () => {
	//TO DO test the error response from service
})
