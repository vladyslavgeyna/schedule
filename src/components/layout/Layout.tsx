import Container from '@mui/material/Container'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './footer/Footer'
import Header from './header/Header'

const Layout: FC = () => {
	return (
		<div className='wrapper'>
			<Header />
			<main>
				<Container maxWidth='lg'>
					<Outlet />
				</Container>
			</main>
			<Footer />
		</div>
	)
}

export default Layout
