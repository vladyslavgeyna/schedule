import data from '../../../schedule.json'
import DayBlock from '../home/day-block/DayBlock'
import { DayType, isCurrentWeek, isToday } from '../home/week-block/WeekBlock'
import NotFound from '../not-found/NotFound'

export type JSONDataType = {
	firstWeekDays: DayType[]
	secondWeekDays: DayType[]
}

const schedule = data as JSONDataType

const Today = () => {
	let todayDay: DayType | undefined = schedule.firstWeekDays.find(
		(_item, index) => {
			return isToday(index) && isCurrentWeek(1)
		},
	)

	if (!todayDay) {
		todayDay = schedule.secondWeekDays.find((_item, index) => {
			return isToday(index) && isCurrentWeek(2)
		})
	}

	if (!todayDay) {
		return <NotFound />
	}

	return (
		<DayBlock
			classes={todayDay.array}
			dayName={todayDay.dayName}
			isToday={true}
			isTodayPage={true}
		/>
	)
}

export default Today
