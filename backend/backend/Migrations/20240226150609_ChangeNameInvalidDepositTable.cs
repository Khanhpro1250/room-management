using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class ChangeNameInvalidDepositTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MaximunDays",
                schema: "HouseSchema",
                table: "Deposit",
                newName: "MaximumDays");

            migrationBuilder.AlterColumn<decimal>(
                name: "DepositAmount",
                schema: "HouseSchema",
                table: "Deposit",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MaximumDays",
                schema: "HouseSchema",
                table: "Deposit",
                newName: "MaximunDays");

            migrationBuilder.AlterColumn<float>(
                name: "DepositAmount",
                schema: "HouseSchema",
                table: "Deposit",
                type: "real",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");
        }
    }
}
