namespace backend.Controllers.Dtos;

public class PaginatedListQuery
{
    public int Offset { get; set; } = 0;

    public int Limit { get; set; } = 25;
}