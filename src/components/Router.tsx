import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/home/Home'
import CurrentWeek from './pages/home/current-week/CurrentWeek'
import NotFound from './pages/not-found/NotFound'
import Today from './pages/today/Today'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/schedule/' element={<Layout />}>
					<Route element={<Home />} index />
					<Route path='today' element={<Today />} />
					<Route path='current-week' element={<CurrentWeek />} />
					<Route element={<NotFound />} path='*' />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Router
