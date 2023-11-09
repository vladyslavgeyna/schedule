import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.scss'
const { BASE_URL } = import.meta.env

type PageType = {
	name: string
	link: string
}

const pages: PageType[] = [
	{ name: 'Всі дні', link: '/' },
	{ name: 'Сьогодні', link: '/today' },
	{ name: 'Поточний тиждень', link: '/current-week' },
]

function Header() {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null,
	)

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	return (
		<AppBar className={styles.header} position='static'>
			<Container maxWidth='lg'>
				<Toolbar disableGutters>
					<Typography
						variant='h6'
						noWrap
						component={Link}
						to='/'
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}>
						<div className={styles.logo}>
							<CalendarMonthIcon
								sx={{
									display: { xs: 'none', md: 'flex' },
									mr: 1,
								}}
							/>
							SCHEDULE
						</div>
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'flex', md: 'none' },
						}}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}>
							{pages.map(page => (
								<MenuItem
									key={page.link}
									onClick={handleCloseNavMenu}>
									<NavLink
										to={page.link}
										className={styles.navLink}>
										{page.name}
									</NavLink>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<CalendarMonthIcon
						sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
					/>
					<Typography
						variant='h5'
						noWrap
						component={Link}
						to='#app-bar-with-responsive-menu'
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}>
						LOGO
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' },
						}}>
						{pages.map(page => (
							<Button
								key={page.link}
								onClick={handleCloseNavMenu}
								component={NavLink}
								to={page.link}
								className={styles.navLink}
								sx={{
									my: 2,
									color: 'white',
									display: 'block',
								}}>
								{page.name}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<a
							target='_blank'
							rel='noreferrer'
							href='https://github.com/vladyslavgeyna'>
							<IconButton sx={{ p: 0 }}>
								<Avatar
									alt='Vladyslav Geyna (Author)'
									src={`${BASE_URL}images/author.jpg`}
								/>
							</IconButton>
						</a>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default Header
