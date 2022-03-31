import * as React from "react"
import { useLocation } from "react-router-dom"

interface LocationState {
    currency: string
    amount: string
}

const CommissionResult = () => {
	const state = useLocation().state as LocationState
	const [currency, setCurrency] = React.useState(state?.currency)
	const [amount, setAmount] = React.useState(state?.amount)
	return (
		<div className="row d-flex justify-content-center">
			<div className="col-md-6 card mb-4 box-shadow row mt-3">
				<div className="col-sm-6">
                    Commission Amount : {amount}
					{currency}
				</div>
			</div>
		</div>
	)
}

export default CommissionResult
