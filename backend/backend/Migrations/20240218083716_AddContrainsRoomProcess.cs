using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class AddContrainsRoomProcess : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoomProcess_Customer_CustomerId",
                schema: "HouseSchema",
                table: "RoomProcess");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomProcess_Room_RoomId",
                schema: "HouseSchema",
                table: "RoomProcess");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomProcess_Customer_CustomerId",
                schema: "HouseSchema",
                table: "RoomProcess",
                column: "CustomerId",
                principalSchema: "HouseSchema",
                principalTable: "Customer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RoomProcess_Room_RoomId",
                schema: "HouseSchema",
                table: "RoomProcess",
                column: "RoomId",
                principalSchema: "HouseSchema",
                principalTable: "Room",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoomProcess_Customer_CustomerId",
                schema: "HouseSchema",
                table: "RoomProcess");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomProcess_Room_RoomId",
                schema: "HouseSchema",
                table: "RoomProcess");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomProcess_Customer_CustomerId",
                schema: "HouseSchema",
                table: "RoomProcess",
                column: "CustomerId",
                principalSchema: "HouseSchema",
                principalTable: "Customer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RoomProcess_Room_RoomId",
                schema: "HouseSchema",
                table: "RoomProcess",
                column: "RoomId",
                principalSchema: "HouseSchema",
                principalTable: "Room",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
