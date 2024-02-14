using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class AddConstrainsRoomServicesIndexService : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                schema: "HouseSchema",
                table: "RoomServiceIndex");

            migrationBuilder.AddColumn<Guid>(
                name: "ServiceId",
                schema: "HouseSchema",
                table: "RoomServiceIndex",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_RoomServiceIndex_ServiceId",
                schema: "HouseSchema",
                table: "RoomServiceIndex",
                column: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomServiceIndex_Service_ServiceId",
                schema: "HouseSchema",
                table: "RoomServiceIndex",
                column: "ServiceId",
                principalSchema: "HouseSchema",
                principalTable: "Service",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoomServiceIndex_Service_ServiceId",
                schema: "HouseSchema",
                table: "RoomServiceIndex");

            migrationBuilder.DropIndex(
                name: "IX_RoomServiceIndex_ServiceId",
                schema: "HouseSchema",
                table: "RoomServiceIndex");

            migrationBuilder.DropColumn(
                name: "ServiceId",
                schema: "HouseSchema",
                table: "RoomServiceIndex");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                schema: "HouseSchema",
                table: "RoomServiceIndex",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);
        }
    }
}
