import data from '../../../../schedule.json'
import WeekBlock, { DayType, isCurrentWeek } from '../week-block/WeekBlock'

export type JSONDataType = {
	firstWeekDays: DayType[]
	secondWeekDays: DayType[]
}

const schedule = data as JSONDataType

const CurrentWeek = () => {
	return (
		<WeekBlock
			days={
				isCurrentWeek(1)
					? schedule.firstWeekDays
					: schedule.secondWeekDays
			}
			weekTitle={`${isCurrentWeek(1) ? '1' : '2'} тиждень`}
		/>
	)
}

export default CurrentWeek
