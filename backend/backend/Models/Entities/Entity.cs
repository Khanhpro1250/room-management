using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models.Entities;

public class Entity
{
    public Guid Id { get; set; }
}