using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class AddColumnServiceId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ServiceId",
                schema: "HouseSchema",
                table: "CalculateChargeDetail",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CalculateChargeDetail_ServiceId",
                schema: "HouseSchema",
                table: "CalculateChargeDetail",
                column: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_CalculateChargeDetail_Service_ServiceId",
                schema: "HouseSchema",
                table: "CalculateChargeDetail",
                column: "ServiceId",
                principalSchema: "HouseSchema",
                principalTable: "Service",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CalculateChargeDetail_Service_ServiceId",
                schema: "HouseSchema",
                table: "CalculateChargeDetail");

            migrationBuilder.DropIndex(
                name: "IX_CalculateChargeDetail_ServiceId",
                schema: "HouseSchema",
                table: "CalculateChargeDetail");

            migrationBuilder.DropColumn(
                name: "ServiceId",
                schema: "HouseSchema",
                table: "CalculateChargeDetail");
        }
    }
}
