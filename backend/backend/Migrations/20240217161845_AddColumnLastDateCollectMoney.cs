using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class AddColumnLastDateCollectMoney : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LastDateCollectMoney",
                schema: "HouseSchema",
                table: "CalculateCharge",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastDateCollectMoney",
                schema: "HouseSchema",
                table: "CalculateCharge");
        }
    }
}
