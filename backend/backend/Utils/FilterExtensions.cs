using MongoDB.Driver;
using System.Linq.Expressions;
namespace backend.Utils;

public static class FilterExtensions
{
    public static FilterDefinition<TDocument> WhereIf<TDocument>(
        this FilterDefinitionBuilder<TDocument> builder,
        bool condition,
        Expression<Func<TDocument, bool>> predicate)
    {
        if (condition)
        {
            return builder.Where(predicate);
        }

        return Builders<TDocument>.Filter.Empty;
    }
}