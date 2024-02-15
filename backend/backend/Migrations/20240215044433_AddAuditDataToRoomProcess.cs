using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class AddAuditDataToRoomProcess : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                schema: "HouseSchema",
                table: "RoomProcess",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedTime",
                schema: "HouseSchema",
                table: "RoomProcess",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastModifiedBy",
                schema: "HouseSchema",
                table: "RoomProcess",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModifiedTime",
                schema: "HouseSchema",
                table: "RoomProcess",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                schema: "HouseSchema",
                table: "RoomProcess");

            migrationBuilder.DropColumn(
                name: "CreatedTime",
                schema: "HouseSchema",
                table: "RoomProcess");

            migrationBuilder.DropColumn(
                name: "LastModifiedBy",
                schema: "HouseSchema",
                table: "RoomProcess");

            migrationBuilder.DropColumn(
                name: "LastModifiedTime",
                schema: "HouseSchema",
                table: "RoomProcess");
        }
    }
}
