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
	todayFormatDate: string
}

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
	todayFormatDate,
}) => {
	return (
		<div
			className={`${styles.wrapper} ${isToday ? styles.today : ''} ${
				isTodayPage ? styles.todayPage : ''
			}`}>
			<div className={styles.dayName}>
				{dayName} {todayFormatDate}
			</div>
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
