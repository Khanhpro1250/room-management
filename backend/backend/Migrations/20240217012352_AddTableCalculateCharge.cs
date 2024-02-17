using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class AddTableCalculateCharge : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CalculateCharge",
                schema: "HouseSchema",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWID()"),
                    RoomId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CustomerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TotalCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalPaid = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalUnpaid = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Month = table.Column<int>(type: "int", nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModifiedTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CalculateCharge", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CalculateCharge_Customer_CustomerId",
                        column: x => x.CustomerId,
                        principalSchema: "HouseSchema",
                        principalTable: "Customer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CalculateCharge_Room_RoomId",
                        column: x => x.RoomId,
                        principalSchema: "HouseSchema",
                        principalTable: "Room",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CalculateChargeDetail",
                schema: "HouseSchema",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWID()"),
                    CalculateChargeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RoomServiceIndexId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    IncurredcostId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CalculateChargeDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CalculateChargeDetail_CalculateCharge_CalculateChargeId",
                        column: x => x.CalculateChargeId,
                        principalSchema: "HouseSchema",
                        principalTable: "CalculateCharge",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CalculateChargeDetail_IncurredCost_IncurredcostId",
                        column: x => x.IncurredcostId,
                        principalSchema: "HouseSchema",
                        principalTable: "IncurredCost",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CalculateChargeDetail_RoomServiceIndex_RoomServiceIndexId",
                        column: x => x.RoomServiceIndexId,
                        principalSchema: "HouseSchema",
                        principalTable: "RoomServiceIndex",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CalculateCharge_CustomerId",
                schema: "HouseSchema",
                table: "CalculateCharge",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_CalculateCharge_RoomId",
                schema: "HouseSchema",
                table: "CalculateCharge",
                column: "RoomId");

            migrationBuilder.CreateIndex(
                name: "IX_CalculateChargeDetail_CalculateChargeId",
                schema: "HouseSchema",
                table: "CalculateChargeDetail",
                column: "CalculateChargeId");

            migrationBuilder.CreateIndex(
                name: "IX_CalculateChargeDetail_IncurredcostId",
                schema: "HouseSchema",
                table: "CalculateChargeDetail",
                column: "IncurredcostId");

            migrationBuilder.CreateIndex(
                name: "IX_CalculateChargeDetail_RoomServiceIndexId",
                schema: "HouseSchema",
                table: "CalculateChargeDetail",
                column: "RoomServiceIndexId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CalculateChargeDetail",
                schema: "HouseSchema");

            migrationBuilder.DropTable(
                name: "CalculateCharge",
                schema: "HouseSchema");
        }
    }
}
