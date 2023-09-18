namespace backend.Models.Entities.Houses;

public class House : AuditedEntity
{
    public string HouseType { get; set; }
    public string UserId { get; set; }
    public string Name { get; set; }
    public string Location { get; set; }
    public string ImgLink { get; set; }
}