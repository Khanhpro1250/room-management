using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class ChangeColumnCustomer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileUrls",
                schema: "HouseSchema",
                table: "Customer");

            migrationBuilder.DropColumn(
                name: "PaymentOneTime",
                schema: "HouseSchema",
                table: "Customer");

            migrationBuilder.DropColumn(
                name: "Status",
                schema: "HouseSchema",
                table: "Customer");

            migrationBuilder.AlterColumn<float>(
                name: "Deposit",
                schema: "HouseSchema",
                table: "Customer",
                type: "real",
                nullable: true,
                oldClrType: typeof(float),
                oldType: "real");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "Deposit",
                schema: "HouseSchema",
                table: "Customer",
                type: "real",
                nullable: false,
                defaultValue: 0f,
                oldClrType: typeof(float),
                oldType: "real",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FileUrls",
                schema: "HouseSchema",
                table: "Customer",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PaymentOneTime",
                schema: "HouseSchema",
                table: "Customer",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                schema: "HouseSchema",
                table: "Customer",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
