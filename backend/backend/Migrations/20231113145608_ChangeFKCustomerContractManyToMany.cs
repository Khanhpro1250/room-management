using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class ChangeFKCustomerContractManyToMany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contract_Customer_CustomerId",
                schema: "HouseSchema",
                table: "Contract");

            migrationBuilder.DropIndex(
                name: "IX_Contract_CustomerId",
                schema: "HouseSchema",
                table: "Contract");

            migrationBuilder.CreateIndex(
                name: "IX_Contract_CustomerId",
                schema: "HouseSchema",
                table: "Contract",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contract_Customer_CustomerId",
                schema: "HouseSchema",
                table: "Contract",
                column: "CustomerId",
                principalSchema: "HouseSchema",
                principalTable: "Customer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contract_Customer_CustomerId",
                schema: "HouseSchema",
                table: "Contract");

            migrationBuilder.DropIndex(
                name: "IX_Contract_CustomerId",
                schema: "HouseSchema",
                table: "Contract");

            migrationBuilder.CreateIndex(
                name: "IX_Contract_CustomerId",
                schema: "HouseSchema",
                table: "Contract",
                column: "CustomerId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Contract_Customer_CustomerId",
                schema: "HouseSchema",
                table: "Contract",
                column: "CustomerId",
                principalSchema: "HouseSchema",
                principalTable: "Customer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
