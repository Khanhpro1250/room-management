using backend.Controllers.Dtos;
using Microsoft.Extensions.Primitives;

namespace backend.Utils;

public static class QueryCollectionExtensions
{
    public static PaginatedListQuery GetPaginatedListQuery(
        this IQueryCollection query)
    {
        PaginatedListQuery paginatedListQuery = new PaginatedListQuery();
        StringValues stringValues;
        query.TryGetValue("offset", out stringValues);
        int result1;
        if (int.TryParse(stringValues.ToString(), out result1))
            paginatedListQuery.Offset = Math.Max(result1, 0);
        query.TryGetValue("limit", out stringValues);
        int result2;
        if (int.TryParse(stringValues.ToString(), out result2))
            paginatedListQuery.Limit = result2 > 0 ? result2 : -1;
        query.TryGetValue("searchKey", out stringValues);
        return paginatedListQuery;
    }
}