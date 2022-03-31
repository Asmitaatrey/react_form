import * as React from "react"
import { AppNavBar } from "./components/appNavbar"
import { BrowserRouter } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
const App = () => {
	return (
		<BrowserRouter>
			<AppNavBar />
		</BrowserRouter>
	)
}
export default App
