import * as React from "react"
import { AppHeader } from "./appHeader"
import { AppFooter } from "./appFooter"
import { AppRoutes } from "./appRoutes"

export const AppNavBar = () => {
	return (
		<div className="bg-light">
			<AppHeader />

			<main role="main">
				<AppRoutes />
			</main>

			<AppFooter />
		</div>
	)
}
