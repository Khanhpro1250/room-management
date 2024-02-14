namespace backend.Utils;

public static class DatetimeExtension
{
    public static bool IsDateInRange(DateTime dateToCheck, DateTime? startDate, DateTime? endDate)
    {
        return dateToCheck >= startDate && dateToCheck <= endDate;
    }
}
