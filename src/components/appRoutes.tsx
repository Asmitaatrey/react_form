import * as React from "react"
import { Route, Routes } from "react-router-dom"
import CommissionResult from "../pages/commissionResult"
import CommissionDetailsForm from "../pages/commissionDetailsForm"

export const AppRoutes = () => {
	return (
		<div className="container">
			<Routes>
				<Route path="/" element={<CommissionDetailsForm />} />
				<Route path="/commission" element={<CommissionResult />} />
			</Routes>
		</div>
	)
}
