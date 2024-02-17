using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class ChangeColumnForCalculaCharge : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Month",
                schema: "HouseSchema",
                table: "CalculateCharge");

            migrationBuilder.DropColumn(
                name: "Year",
                schema: "HouseSchema",
                table: "CalculateCharge");

            migrationBuilder.AddColumn<decimal>(
                name: "RoomCost",
                schema: "HouseSchema",
                table: "CalculateChargeDetail",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateCalculate",
                schema: "HouseSchema",
                table: "CalculateCharge",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RoomCost",
                schema: "HouseSchema",
                table: "CalculateChargeDetail");

            migrationBuilder.DropColumn(
                name: "DateCalculate",
                schema: "HouseSchema",
                table: "CalculateCharge");

            migrationBuilder.AddColumn<int>(
                name: "Month",
                schema: "HouseSchema",
                table: "CalculateCharge",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Year",
                schema: "HouseSchema",
                table: "CalculateCharge",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
