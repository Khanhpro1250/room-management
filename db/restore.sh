#!/bin/bash
# Chờ SQL Server khởi động xong
echo "Waiting for SQL Server to start..."
for i in $(seq 1 30); do
    /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -C -Q "SELECT 1" > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "SQL Server is ready."
        break
    fi
    echo "Attempt $i: SQL Server not ready yet, waiting 3s..."
    sleep 3
done

# Kiểm tra xem database đã tồn tại chưa (tránh restore nhiều lần)
DB_EXISTS=$(/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -C \
    -Q "SET NOCOUNT ON; SELECT COUNT(*) FROM sys.databases WHERE name='$DB_NAME'" \
    -h -1 2>/dev/null | tr -d ' \r\n')

if [ "$DB_EXISTS" = "1" ]; then
    echo "Database '$DB_NAME' already exists, skipping restore."
else
    echo "Getting logical file names from backup..."
    FILELIST=$(/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -C \
        -Q "RESTORE FILELISTONLY FROM DISK='/var/opt/mssql/backup/db.bak'" \
        -s"," -h -1 2>/dev/null)

    LOGICAL_DATA=$(echo "$FILELIST" | awk -F',' '$3~/^[[:space:]]*D[[:space:]]*$/{print $1; exit}' | tr -d ' \r\n')
    LOGICAL_LOG=$(echo "$FILELIST"  | awk -F',' '$3~/^[[:space:]]*L[[:space:]]*$/{print $1; exit}' | tr -d ' \r\n')

    echo "Logical data file: $LOGICAL_DATA"
    echo "Logical log file:  $LOGICAL_LOG"

    echo "Restoring database '$DB_NAME' from /var/opt/mssql/backup/db.bak ..."
    /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -C -Q "
        RESTORE DATABASE [$DB_NAME]
        FROM DISK = '/var/opt/mssql/backup/db.bak'
        WITH
            MOVE '$LOGICAL_DATA' TO '/var/opt/mssql/data/${DB_NAME}.mdf',
            MOVE '$LOGICAL_LOG' TO '/var/opt/mssql/data/${DB_NAME}_log.ldf',
            REPLACE, STATS = 10;
    "
    if [ $? -eq 0 ]; then
        echo "Restore completed successfully."
    else
        echo "ERROR: Restore failed."
    fi
fi

# Tạo login và user nếu chưa có
echo "Setting up login and user..."
/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -C -Q "
    IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE name = '$DB_USER')
    BEGIN
        CREATE LOGIN [$DB_USER] WITH PASSWORD = '$DB_PASSWORD', CHECK_POLICY = OFF, CHECK_EXPIRATION = OFF;
        PRINT 'Login created.';
    END

    USE [$DB_NAME];

    IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = '$DB_USER')
    BEGIN
        CREATE USER [$DB_USER] FOR LOGIN [$DB_USER];
        ALTER ROLE db_owner ADD MEMBER [$DB_USER];
        PRINT 'User created and added to db_owner.';
    END
"
echo "Done."
