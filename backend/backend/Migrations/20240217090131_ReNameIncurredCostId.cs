using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class ReNameIncurredCostId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CalculateChargeDetail_IncurredCost_IncurredcostId",
                schema: "HouseSchema",
                table: "CalculateChargeDetail");

            migrationBuilder.RenameColumn(
                name: "IncurredcostId",
                schema: "HouseSchema",
                table: "CalculateChargeDetail",
                newName: "IncurredCostId");

            migrationBuilder.RenameIndex(
                name: "IX_CalculateChargeDetail_IncurredcostId",
                schema: "HouseSchema",
                table: "CalculateChargeDetail",
                newName: "IX_CalculateChargeDetail_IncurredCostId");

            migrationBuilder.AddForeignKey(
                name: "FK_CalculateChargeDetail_IncurredCost_IncurredCostId",
                schema: "HouseSchema",
                table: "CalculateChargeDetail",
                column: "IncurredCostId",
                principalSchema: "HouseSchema",
                principalTable: "IncurredCost",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CalculateChargeDetail_IncurredCost_IncurredCostId",
                schema: "HouseSchema",
                table: "CalculateChargeDetail");

            migrationBuilder.RenameColumn(
                name: "IncurredCostId",
                schema: "HouseSchema",
                table: "CalculateChargeDetail",
                newName: "IncurredcostId");

            migrationBuilder.RenameIndex(
                name: "IX_CalculateChargeDetail_IncurredCostId",
                schema: "HouseSchema",
                table: "CalculateChargeDetail",
                newName: "IX_CalculateChargeDetail_IncurredcostId");

            migrationBuilder.AddForeignKey(
                name: "FK_CalculateChargeDetail_IncurredCost_IncurredcostId",
                schema: "HouseSchema",
                table: "CalculateChargeDetail",
                column: "IncurredcostId",
                principalSchema: "HouseSchema",
                principalTable: "IncurredCost",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
