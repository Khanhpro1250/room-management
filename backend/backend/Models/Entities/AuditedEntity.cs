namespace backend.Models.Entities;

public class AuditedEntity<TKey> where TKey : struct
{
    public TKey Id { get; set; }

    public string CreatedBy { get; set; }

    public DateTime? CreatedTime { get; set; }

    public string LastModifiedBy { get; set; }

    public DateTime? LastModifiedTime { get; set; }
}