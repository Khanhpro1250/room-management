using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class RemoveCustomerIdColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoomServiceIndex_Customer_CustomerId",
                schema: "HouseSchema",
                table: "RoomServiceIndex");

            migrationBuilder.DropIndex(
                name: "IX_RoomServiceIndex_CustomerId",
                schema: "HouseSchema",
                table: "RoomServiceIndex");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                schema: "HouseSchema",
                table: "RoomServiceIndex");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CustomerId",
                schema: "HouseSchema",
                table: "RoomServiceIndex",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_RoomServiceIndex_CustomerId",
                schema: "HouseSchema",
                table: "RoomServiceIndex",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomServiceIndex_Customer_CustomerId",
                schema: "HouseSchema",
                table: "RoomServiceIndex",
                column: "CustomerId",
                principalSchema: "HouseSchema",
                principalTable: "Customer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
