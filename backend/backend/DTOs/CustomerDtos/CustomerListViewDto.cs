namespace backend.DTOs.CustomerDtos;

public class CustomerListViewDto
{
    public Guid Id { get; set; }
    public Guid RoomId  { get; set; }
    public string FullName { get; set; }
    public string Status { get; set; }
    public string StatusName { get; set; }
    public int Gender { get; set; }
    public string Email { get; set; }
    public string PermanentAddress { get; set; }
    public string PhoneNumber1 { get; set; }
    public float? Deposit { get; set; }
}