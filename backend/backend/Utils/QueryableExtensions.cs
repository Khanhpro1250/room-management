using System.Linq.Expressions;
using backend.Controllers.Dtos;

namespace backend.Utils;

public static class QueryableExtensions
{
    public static IQueryable<T> QueryablePaging<T>(this IQueryable<T> source, PaginatedListQuery query)
    {
        return query.Limit < 1 ? source : source.Skip(query.Offset).Take(query.Limit);
    }

    public static IQueryable<T> WhereIf<T>(
        this IQueryable<T> source,
        bool condition,
        Expression<Func<T, bool>> predicate)
    {
        if (condition)
        {
            return source.Where(predicate);
        }

        return source;
    }
}