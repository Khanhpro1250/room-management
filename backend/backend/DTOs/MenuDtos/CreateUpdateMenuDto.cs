﻿namespace backend.DTOs.MenuDtos;

public class CreateUpdateMenuDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Route { get; set; }
    public string Icon { get; set; }
    public string Path { get; set; }
    public bool IsDisplay { get; set; } = false;
    public int Level { get; set; } = 1;
    public string Permissions { get; set; }
    public Guid? ParentId { get; set; }
    public string CreatedBy { get; set; }
    public DateTime? CreatedTime { get; set; } = DateTime.Now;
    public string LastModifiedBy { get; set; }
    public DateTime? LastModifiedTime { get; set; }
}