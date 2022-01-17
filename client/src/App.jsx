import React from "react"
import { BrowserRouter } from "react-router-dom"
import Route_handler from "./routes/Route_handler"

const App = () => {
	return (
		<BrowserRouter>
			<Route_handler />
		</BrowserRouter>
	)
}

export default App
