using MongoDB.Driver;
using System;
using System.Linq.Expressions;
namespace backend.Utils;

public static class FilterExtensions
{
    public static FilterDefinition<TDocument> WhereIf<TDocument>(
        this FilterDefinition<TDocument> filter,
        bool condition,
        Expression<Func<TDocument, bool>> predicate
    )
    {
        if (condition)
        {
            var innerFilter = Builders<TDocument>.Filter.Where(predicate);
            return filter & innerFilter;
        }
        return filter;
    }
}