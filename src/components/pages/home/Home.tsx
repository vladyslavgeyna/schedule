import data from '../../../schedule.json'
import styles from './Home.module.scss'
import WeekBlock, { DayType } from './week-block/WeekBlock'

export type JSONDataType = {
	firstWeekDays: DayType[]
	secondWeekDays: DayType[]
}

const schedule = data as JSONDataType

const Home = () => {
	return (
		<div className={styles.mainWrapper}>
			<div className={styles.wrapper}>
				<WeekBlock
					days={schedule.firstWeekDays}
					weekTitle='1 тиждень'
				/>
			</div>
			<div className={styles.wrapper}>
				<WeekBlock
					days={schedule.secondWeekDays}
					weekTitle='2 тиждень'
				/>
			</div>
		</div>
	)
}

export default Home
