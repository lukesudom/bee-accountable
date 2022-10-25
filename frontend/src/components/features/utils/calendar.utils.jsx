export const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  const daysPerMonth = {
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31
  }
  function nextMonth(month) {
    if (month === "December") {
      return "January"
    }
    return months[months.indexOf(month) + 1]
  }
  function nextDayOfWeek(day) {
    if (day === "Saturday") {
      return "Sunday"
    }
    return daysOfTheWeek[daysOfTheWeek.indexOf(day) + 1]
  }
  function nextCalendarDay(calendarDay) {
    if (calendarDay.date === daysPerMonth[calendarDay.month]) {
      return {
        month: nextMonth(calendarDay.month),
        date: 1,
        dayOfTheWeek: nextDayOfWeek(calendarDay.dayOfTheWeek)
      }
    }
    return {
      month: calendarDay.month,
      date: calendarDay.date + 1,
      dayOfTheWeek: nextDayOfWeek(calendarDay.dayOfTheWeek)
    }
  }
  function previousMonth(month) {
    if (month === "January") {
      return "December"
    }
    return months[months.indexOf(month) - 1]
  }
  function previousDate(calendarDay) {
    if (calendarDay.date === 1) {
      return daysPerMonth[previousMonth(calendarDay.month)]
    }
    return calendarDay.date - 1
  }
  function previousDay(day) {
    if (day === "Sunday") {
      return "Saturday"
    }
    return daysOfTheWeek[daysOfTheWeek.indexOf(day) - 1]
  }
  function previousCalendarDay(calendarDay) {
    return {
      dayOfTheWeek: previousDay(calendarDay.dayOfTheWeek),
      date: previousDate(calendarDay),
      month:
        calendarDay.date === 1
          ? previousMonth(calendarDay.month)
          : calendarDay.month
    }
  }
  
  export function createHabitTrackerTemplateData({ startDay, endDay, results }) {
    const weekNames = ["week-1"]
    const firstWeekOutOfBoundsDates = {}
    let firstWeekPointer = { ...startDay }
    while (firstWeekPointer.dayOfTheWeek !== "Sunday") {
      firstWeekPointer = previousCalendarDay(firstWeekPointer)
      firstWeekOutOfBoundsDates[firstWeekPointer.dayOfTheWeek] = {
        month: firstWeekPointer.month,
        date: firstWeekPointer.date,
        result: "out of bounds"
      }
    }
    const data = {
      "week-1": {
        ...firstWeekOutOfBoundsDates
      }
    }
    let dayIndex = 0
    let dayPointer = { ...startDay }
    let weekCounter = 0
    while (dayPointer.date !== endDay.date || dayPointer.month !== endDay.month) {
      data[`week-${weekCounter + 1}`][dayPointer.dayOfTheWeek] = {
        month: dayPointer.month,
        date: dayPointer.date,
        result: results[dayIndex] || "no result yet"
      }
      dayPointer = nextCalendarDay(dayPointer)
      dayIndex++
      if (dayPointer.dayOfTheWeek === "Sunday") {
        weekCounter++
        const newWeekName = `week-${weekCounter + 1}`
        weekNames.push(newWeekName)
        data[newWeekName] = {}
      }
    }
    data[`week-${weekCounter + 1}`][dayPointer.dayOfTheWeek] = {
      month: dayPointer.month,
      date: dayPointer.date,
      result: results[dayIndex] || "no result yet"
    }
    while (dayPointer.dayOfTheWeek !== "Saturday") {
      dayPointer = nextCalendarDay(dayPointer)
      data[`week-${weekCounter + 1}`][dayPointer.dayOfTheWeek] = {
        month: dayPointer.month,
        date: dayPointer.date,
        result: "out of bounds"
      }
    }
    return {
      data,
      weekNames,
      ...determineStreakInfo(results)
    }
  }
  
  export function determineStreakInfo(results) {
    let maxSuccessStreak = 0
    let maxFailureStreak = 0
    let currentStreak = {
      kind: "success",
      count: 0
    }
    for (const result of results) {
      if (result === currentStreak.kind) {
        currentStreak.count++
      } else {
        currentStreak = { kind: result, count: 1 }
      }
      if (result === "success" && currentStreak.count > maxSuccessStreak) {
        maxSuccessStreak = currentStreak.count
      }
      if (result === "failure" && currentStreak.count > maxFailureStreak) {
        maxFailureStreak = currentStreak.count
      }
    }
    return { maxFailureStreak, maxSuccessStreak }
  }
  