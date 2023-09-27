namespace backend.Controllers.Dtos;

public class PaginatedFilterDto
{
    public int Limit { get; set; } = -1;
    public int Offset { get; set; } = 0;
}