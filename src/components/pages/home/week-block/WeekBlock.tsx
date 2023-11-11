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
	isCurrentWeekPage?: boolean
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

function getMonday(d: Date) {
	d = new Date(d)
	const day = d.getDay(),
		diff = d.getDate() - day + (day == 0 ? -6 : 1)
	return new Date(d.setDate(diff))
}

export const formatDayDate = (d: Date) => {
	const dayString =
		d.getDate() < 10 ? '0' + d.getDate().toString() : d.getDate().toString()
	const month = d.getMonth() + 1
	const monthString = month < 10 ? '0' + month.toString() : month.toString()
	return dayString + '.' + monthString
}

const WeekBlock: FC<PropsType> = ({
	weekTitle,
	days,
	isCurrentWeekPage = false,
}) => {
	const dates = new Map<string, string>()

	const currentWeekFirstDay = getMonday(new Date())
	if (isCurrentWeek(parseInt(weekTitle.split(' ')[0]))) {
		for (const day of days) {
			dates.set(day.dayName, formatDayDate(currentWeekFirstDay))
			currentWeekFirstDay.setDate(currentWeekFirstDay.getDate() + 1)
		}
	} else {
		if (parseInt(weekTitle.split(' ')[0]) === 1) {
			currentWeekFirstDay.setDate(currentWeekFirstDay.getDate() - 7)
			for (const day of days) {
				dates.set(day.dayName, formatDayDate(currentWeekFirstDay))
				currentWeekFirstDay.setDate(currentWeekFirstDay.getDate() + 1)
			}
		} else {
			currentWeekFirstDay.setDate(currentWeekFirstDay.getDate() + 7)
			for (const day of days) {
				dates.set(day.dayName, formatDayDate(currentWeekFirstDay))
				currentWeekFirstDay.setDate(currentWeekFirstDay.getDate() + 1)
			}
		}
	}

	return (
		<div className={styles.wrapper}>
			<div>
				<h2
					className={`${styles.title} ${
						isCurrentWeek(parseInt(weekTitle.split(' ')[0])) &&
						!isCurrentWeekPage
							? styles.titleCurrentWeek
							: ''
					}`}>
					{weekTitle}
				</h2>
			</div>
			<div className={styles.daysWrapper}>
				{days.map((day, index) => (
					<DayBlock
						todayFormatDate={dates.get(day.dayName) || ''}
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
