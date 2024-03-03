using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class AddColumnCollectionDateForOwner : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CollectionFromDate",
                schema: "USER",
                table: "User",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CollectionToDate",
                schema: "USER",
                table: "User",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CollectionFromDate",
                schema: "USER",
                table: "User");

            migrationBuilder.DropColumn(
                name: "CollectionToDate",
                schema: "USER",
                table: "User");
        }
    }
}
