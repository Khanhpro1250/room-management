namespace backend.Utils;

public struct DateTimeSpanExtension
{
    public int Years { get; }
    public int Months { get; }
    public int Days { get; }
    public int Hours { get; }
    public int Minutes { get; }
    public int Seconds { get; }
    public int Milliseconds { get; }

    public DateTimeSpanExtension(int years, int months, int days, int hours, int minutes, int seconds, int milliseconds)
    {
        Years = years;
        Months = months;
        Days = days;
        Hours = hours;
        Minutes = minutes;
        Seconds = seconds;
        Milliseconds = milliseconds;
    }

    enum Phase { Years, Months, Days, Done }
    
    /// <summary>
    /// Lấy ra khoảng cách giữa 2 ngày tính đến đơn vị Milliseconds
    /// VD: Khoảng cách giữa 2 ngày 9/1/2022 - 11/1/2023 là 1 year 2 day 0 hours 0 Minutes 0 Milliseconds
    /// </summary>
    /// <param name="date1"></param>
    /// <param name="date2"></param>
    /// <returns></returns>
    public static DateTimeSpanExtension CompareDates(DateTime date1, DateTime date2)
    {
        if (date2 < date1)
        {
            (date1, date2) = (date2, date1);
        }

        DateTime current = date1;
        int years = 0;
        int months = 0;
        int days = 0;

        Phase phase = Phase.Years;
        DateTimeSpanExtension span = new DateTimeSpanExtension();
        int officialDay = current.Day;

        while (phase != Phase.Done)
        {
            switch (phase)
            {
                case Phase.Years:
                    if (current.AddYears(years + 1) > date2)
                    {
                        phase = Phase.Months;
                        current = current.AddYears(years);
                    }
                    else
                    {
                        years++;
                    }
                    break;
                case Phase.Months:
                    if (current.AddMonths(months + 1) > date2)
                    {
                        phase = Phase.Days;
                        current = current.AddMonths(months);
                        if (current.Day < officialDay && officialDay <= DateTime.DaysInMonth(current.Year, current.Month))
                            current = current.AddDays(officialDay - current.Day);
                    }
                    else
                    {
                        months++;
                    }
                    break;
                case Phase.Days:
                    if (current.AddDays(days + 1) > date2)
                    {
                        current = current.AddDays(days);
                        var timespan = date2 - current;
                        span = new DateTimeSpanExtension(years, months, days, timespan.Hours, timespan.Minutes, timespan.Seconds, timespan.Milliseconds);
                        phase = Phase.Done;
                    }
                    else
                    {
                        days++;
                    }
                    break;
            }
        }

        return span;
    }
    
    public static DateTime GetEndOfMonth(DateTime date)
    {
        DateTime nextMonth = date.AddMonths(1);
        DateTime endOfMonth = new DateTime(nextMonth.Year, nextMonth.Month, 1).AddDays(-1);
        return endOfMonth;
    }
}