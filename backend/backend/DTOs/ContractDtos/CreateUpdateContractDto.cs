﻿namespace backend.DTOs.ContractDtos
{
    public class CreateUpdateContractDto
    {
        public string ContractNumber { get; set; }
        public string RoomId { get; set; }
        public string CustomerId { get; set; }
        public int Month { get; set; }
        public DateTime SignedDate { get; set; }
        public DateTime EffectDate { get; set; }
        public DateTime ExpiredDate { get; set; }
    }
}