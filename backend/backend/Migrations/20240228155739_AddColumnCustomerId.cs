using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class AddColumnCustomerId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CustomerId",
                schema: "HouseSchema",
                table: "Deposit",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Deposit_CustomerId",
                schema: "HouseSchema",
                table: "Deposit",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Deposit_Customer_CustomerId",
                schema: "HouseSchema",
                table: "Deposit",
                column: "CustomerId",
                principalSchema: "HouseSchema",
                principalTable: "Customer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deposit_Customer_CustomerId",
                schema: "HouseSchema",
                table: "Deposit");

            migrationBuilder.DropIndex(
                name: "IX_Deposit_CustomerId",
                schema: "HouseSchema",
                table: "Deposit");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                schema: "HouseSchema",
                table: "Deposit");
        }
    }
}
