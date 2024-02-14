﻿namespace backend.DTOs.RoomDtos;

public class RoomElectricServiceDto
{
    public Guid? Id { get; set; }
    public Guid RoomId { get; set; }
    
    public Guid ServiceId { get; set; }
    public Guid CustomerId { get; set; }
    public string RoomCode { get; set; }
    public string HouseName { get; set; }
    public string CustomerName { get; set; }
    public int Month { get; set; }
    public int Year { get; set; }
    public decimal OldElectricValue { get; set; }
    public decimal NewElectricValue { get; set; }
    public decimal UsedElectricValue { get; set; }
}