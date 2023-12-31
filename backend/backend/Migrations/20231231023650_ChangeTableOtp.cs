using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class ChangeTableOtp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                schema: "USER",
                table: "Otp",
                newName: "Type");

            migrationBuilder.AddColumn<string>(
                name: "EmailRequest",
                schema: "USER",
                table: "Otp",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailRequest",
                schema: "USER",
                table: "Otp");

            migrationBuilder.RenameColumn(
                name: "Type",
                schema: "USER",
                table: "Otp",
                newName: "Name");
        }
    }
}
