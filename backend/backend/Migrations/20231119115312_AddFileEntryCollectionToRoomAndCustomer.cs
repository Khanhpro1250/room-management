using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class AddFileEntryCollectionToRoomAndCustomer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "FileEntryCollectionId",
                schema: "HouseSchema",
                table: "Room",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "FileEntryCollectionId",
                schema: "HouseSchema",
                table: "Customer",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Room_FileEntryCollectionId",
                schema: "HouseSchema",
                table: "Room",
                column: "FileEntryCollectionId");

            migrationBuilder.CreateIndex(
                name: "IX_Customer_FileEntryCollectionId",
                schema: "HouseSchema",
                table: "Customer",
                column: "FileEntryCollectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Customer_FileEntryCollection_FileEntryCollectionId",
                schema: "HouseSchema",
                table: "Customer",
                column: "FileEntryCollectionId",
                principalTable: "FileEntryCollection",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Room_FileEntryCollection_FileEntryCollectionId",
                schema: "HouseSchema",
                table: "Room",
                column: "FileEntryCollectionId",
                principalTable: "FileEntryCollection",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customer_FileEntryCollection_FileEntryCollectionId",
                schema: "HouseSchema",
                table: "Customer");

            migrationBuilder.DropForeignKey(
                name: "FK_Room_FileEntryCollection_FileEntryCollectionId",
                schema: "HouseSchema",
                table: "Room");

            migrationBuilder.DropIndex(
                name: "IX_Room_FileEntryCollectionId",
                schema: "HouseSchema",
                table: "Room");

            migrationBuilder.DropIndex(
                name: "IX_Customer_FileEntryCollectionId",
                schema: "HouseSchema",
                table: "Customer");

            migrationBuilder.DropColumn(
                name: "FileEntryCollectionId",
                schema: "HouseSchema",
                table: "Room");

            migrationBuilder.DropColumn(
                name: "FileEntryCollectionId",
                schema: "HouseSchema",
                table: "Customer");
        }
    }
}
