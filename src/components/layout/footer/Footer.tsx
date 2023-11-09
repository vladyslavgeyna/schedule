import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Container from '@mui/material/Container'
import { Link } from 'react-router-dom'
import styles from './Footer.module.scss'

const Footer = () => {
	return (
		<Container maxWidth='lg'>
			<footer className={styles.footer}>
				<div className={styles.authorBlock}>
					<Link to='/'>
						<CalendarMonthIcon style={{ fontSize: '24px' }} />
					</Link>
					<span>
						Copyright {new Date().getFullYear()} SCHEDULE by{' '}
						<a
							className={styles.authorLink}
							target='_blank'
							href='https://github.com/vladyslavgeyna'>
							Vladyslav Geyna
						</a>
					</span>
				</div>
			</footer>
		</Container>
	)
}

export default Footer
