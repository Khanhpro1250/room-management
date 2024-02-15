using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class AddTableRoomHistories : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RoomProcess",
                schema: "HouseSchema",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWID()"),
                    RoomId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CustomerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomProcess", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoomProcess_Customer_CustomerId",
                        column: x => x.CustomerId,
                        principalSchema: "HouseSchema",
                        principalTable: "Customer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RoomProcess_Room_RoomId",
                        column: x => x.RoomId,
                        principalSchema: "HouseSchema",
                        principalTable: "Room",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RoomProcess_CustomerId",
                schema: "HouseSchema",
                table: "RoomProcess",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_RoomProcess_RoomId",
                schema: "HouseSchema",
                table: "RoomProcess",
                column: "RoomId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoomProcess",
                schema: "HouseSchema");
        }
    }
}
