using backend.Models.Entities.Rooms;
using backend.Models.Entities.UserAccount;

namespace backend.Models.Entities.Houses;

public class House : AuditedEntity<Guid>
{
    public string HouseType { get; set; }
    public Guid UserId { get; set; }
    public string Name { get; set; }
    public string Location { get; set; }
    public string ImgLink { get; set; }

    #region ref

    public ICollection<Room> Rooms { get; set; }
    public User User { get; set; }

    #endregion
}