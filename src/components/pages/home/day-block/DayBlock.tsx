/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react'
import { BASE_URL } from '../../../../contants'
import styles from './DayBlock.module.scss'

export type ClassItemType = {
	time: string
	subject: string
	meetLink: string
}

type PropType = {
	dayName: string
	classes: ClassItemType[]
	isToday: boolean
	isTodayPage?: boolean
}

// const isNow = (currentClassTime: string, nextClassTime: string | null) => {
// 	const now = new Date()
// 	const hoursNow = now.getHours()
// 	const minutesNow = now.getMinutes()

// 	const [hours, minutes] = currentClassTime.split(':')

// 	const hoursAsNumber = parseInt(hours, 10)
// 	const minutesAsNumber = parseInt(minutes, 10)

// 	if (
// 		hoursNow > hoursAsNumber ||
// 		(hoursNow === hoursAsNumber && minutesNow >= minutesAsNumber)
// 	) {
// 		if (nextClassTime !== null) {
// 			const [nextHours, nextMinutes] = nextClassTime.split(':')
// 			let nextHoursAsNumber = parseInt(nextHours, 10)
// 			let nextMinutesAsNumber = parseInt(nextMinutes, 10)

// 			if (nextMinutesAsNumber >= 15) {
// 				nextMinutesAsNumber -= 15
// 			} else {
// 				nextHoursAsNumber -= 1
// 				nextMinutesAsNumber = 60 + nextMinutesAsNumber - 15
// 			}

// 			if (
// 				hoursNow < nextHoursAsNumber ||
// 				(hoursNow === nextHoursAsNumber &&
// 					minutesNow < nextMinutesAsNumber)
// 			) {
// 				return true
// 			}
// 		} else {
// 			return true
// 		}
// 	}

// 	return false
// }

function isNow(
	currentClassTimeString: string,
	previousClassTimeString: string | null,
) {
	const [currentHours, currentMinutes] = currentClassTimeString.split(':')
	const currentClassTime = new Date()
	currentClassTime.setHours(parseInt(currentHours, 10))
	currentClassTime.setMinutes(parseInt(currentMinutes, 10))

	const endOfCurrentClassTime = new Date()
	endOfCurrentClassTime.setHours(currentClassTime.getHours() + 1)
	endOfCurrentClassTime.setMinutes(currentClassTime.getMinutes() + 20)

	if (previousClassTimeString) {
		const [previousHours, previousMinutes] =
			previousClassTimeString.split(':')
		const previousClassTime = new Date()
		previousClassTime.setHours(parseInt(previousHours, 10))
		previousClassTime.setMinutes(parseInt(previousMinutes, 10))

		const endOfPreviousClassTime = new Date()
		endOfPreviousClassTime.setHours(previousClassTime.getHours() + 1)
		endOfPreviousClassTime.setMinutes(previousClassTime.getMinutes() + 20)

		return (
			new Date() <= endOfCurrentClassTime &&
			new Date() >= endOfPreviousClassTime
		)
	} else {
		return (
			currentClassTime >= new Date() ||
			new Date() <= endOfCurrentClassTime
		)
	}
}

const DayBlock: FC<PropType> = ({
	dayName,
	classes,
	isToday = false,
	isTodayPage = false,
}) => {
	return (
		<div
			className={`${styles.wrapper} ${isToday ? styles.today : ''} ${
				isTodayPage ? styles.todayPage : ''
			}`}>
			<div className={styles.dayName}>{dayName}</div>
			<div>
				<div className={styles.daysWrapper}>
					{classes.map((item, index) => (
						<div
							key={item.time}
							className={`${styles.dayItem} ${
								isToday &&
								isNow(
									item.time,
									index > 0 ? classes[index - 1].time : null,
								)
									? styles.now
									: ''
							}`}>
							<div>{item.time}</div>
							<span>—</span>
							<div className={styles.linkWrapper}>
								{item.meetLink === BASE_URL ? (
									<span className={styles.subLink}>
										{item.subject
											.substring(
												0,
												item.subject.indexOf('('),
											)
											.trim() + ' '}
										<strong>
											{item.subject
												.substring(
													item.subject.indexOf('('),
												)
												.trim()}
										</strong>
									</span>
								) : (
									<a
										target='_blank'
										className={styles.subLink}
										href={item.meetLink}>
										{item.subject}
									</a>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default DayBlock
