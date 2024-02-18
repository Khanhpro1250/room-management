using System.Globalization;
using System.Text;

namespace backend.Utils;

public class MoneyConverter
{
    private static readonly string[] VietnameseNumbers = { "không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín" };
    private static readonly CompareInfo CompareInfo = CultureInfo.InvariantCulture.CompareInfo;
    public static string ConvertToMoneyString(float number)
    {
        if (number == 0)
        {
            return "không đồng";
        }

        string[] units = { "", "nghìn", "triệu", "tỷ", "nghìn tỷ" };

        int unitIndex = 0;
        var result = new StringBuilder();

        while (number > 0)
        {
            int group = (int)(number % 1000);
            number /= 1000;

            if (group > 0)
            {
                string groupStr = ConvertGroupToString(group);
                result.Insert(0, groupStr + " " + units[unitIndex] + " ");
            }

            unitIndex++;
        }

        return result.ToString().Trim();
    }
    
    public static string ConvertToMoneyString(decimal number)
    {
        if (number == 0)
        {
            return "không đồng";
        }

        string[] units = { "", "nghìn", "triệu", "tỷ", "nghìn tỷ" };

        int unitIndex = 0;
        var result = new StringBuilder();

        while (number > 0)
        {
            int group = (int)(number % 1000);
            number /= 1000;

            if (group > 0)
            {
                string groupStr = ConvertGroupToString(group);
                result.Insert(0, groupStr + " " + units[unitIndex] + " ");
            }

            unitIndex++;
        }

        return result.ToString().Trim();
    }

    private static string ConvertGroupToString(int group)
    {
        string result = string.Empty;

        int hundred = group / 100;
        int ten = (group % 100) / 10;
        int one = group % 10;

        if (hundred > 0)
        {
            result += VietnameseNumbers[hundred] + " trăm ";
        }

        if (ten > 1)
        {
            result += VietnameseNumbers[ten] + " mươi ";
        }
        else if (ten == 1)
        {
            result += "mười ";
        }

        if (one > 0)
        {
            if (ten > 1 && one == 1)
            {
                result += "mốt ";
            }
            else if (ten == 0 && one == 1)
            {
                result += "một ";
            }
            else
            {
                result += VietnameseNumbers[one] + " ";
            }
        }

        return result;
    }

    public static string ToLocaleDotString(double value)
    {
        var formattedNumber = value.ToString("N0", new CultureInfo("en-US"));
        formattedNumber = formattedNumber.Replace(",", ".");

        return formattedNumber;
    }
    
    public static string ToLocaleDotString(decimal value)
    {
        var formattedNumber = value.ToString("N0", new CultureInfo("en-US"));
        formattedNumber = formattedNumber.Replace(",", ".");

        return formattedNumber;
    }
}