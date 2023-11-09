import { FC } from 'react'
import DayBlock, { ClassItemType } from '../day-block/DayBlock'
import styles from './WeekBlock.module.scss'

export type DayType = {
	array: ClassItemType[]
	dayName: string
}

type PropsType = {
	weekTitle: string
	days: DayType[]
}

export function getWeekNumber(d = new Date()) {
	d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
	const weekNo = Math.ceil(
		((d.valueOf() - yearStart.valueOf()) / 86400000 + 1) / 7,
	)
	return weekNo
}

export const isCurrentWeek = (weekNumber: number) => {
	const isEvenWeek = getWeekNumber() % 2 === 0

	return (isEvenWeek && weekNumber === 1) || (!isEvenWeek && weekNumber === 2)
}

export const isToday = (index: number) => index + 1 === new Date().getDay()

const WeekBlock: FC<PropsType> = ({ weekTitle, days }) => {
	return (
		<div className={styles.wrapper}>
			<div>
				<h2 className={styles.title}>{weekTitle}</h2>
			</div>
			<div className={styles.daysWrapper}>
				{days.map((day, index) => (
					<DayBlock
						key={day.dayName}
						classes={day.array}
						dayName={day.dayName}
						isToday={
							isToday(index) &&
							isCurrentWeek(parseInt(weekTitle.split(' ')[0]))
						}
					/>
				))}
			</div>
		</div>
	)
}

export default WeekBlock
