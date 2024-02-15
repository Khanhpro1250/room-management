using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class ChangeColumnRoomProcess : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndDate",
                schema: "HouseSchema",
                table: "RoomProcess");

            migrationBuilder.DropColumn(
                name: "StartDate",
                schema: "HouseSchema",
                table: "RoomProcess");

            migrationBuilder.AddColumn<string>(
                name: "Action",
                schema: "HouseSchema",
                table: "RoomProcess",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Action",
                schema: "HouseSchema",
                table: "RoomProcess");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                schema: "HouseSchema",
                table: "RoomProcess",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                schema: "HouseSchema",
                table: "RoomProcess",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
