namespace backend.DTOs.HouseDtos;

public class CreateUpdateHouseDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string HouseType { get; set; }
    public string UserId { get; set; }
    public string Location { get; set; }
    public string ImgLink { get; set; }
    public string CreatedBy { get; set; }
    public DateTime? CreatedTime { get; set; }
    public string LastModifiedBy { get; set; }
    public DateTime? LastModifiedTime { get; set; }
}