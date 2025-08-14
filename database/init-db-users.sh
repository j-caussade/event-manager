#!/bin/bash
################################################################################
# MySQL Users Initialization Script
#
# This script creates MySQL users and grants them the necessary permissions
# for the application. It waits for MySQL to be ready before proceeding.
#
# Usage: Run this script in a Docker container or on a host with MySQL installed.
# Environment variables required:
#   - MYSQL_ROOT_PASSWORD: MySQL root password
#   - DB_USER: Application database user
#   - DB_PASSWORD: Application database user password
#   - DB_NAME: Application database name
################################################################################

# Timeout in seconds for MySQL connection attempts
TIMEOUT=30

################################################################################
# Wait for MySQL to be ready
################################################################################
echo "Waiting for MySQL to be ready..."
while ! mysqladmin ping --silent; do
    sleep 1
    ((TIMEOUT--))
    if [ "$TIMEOUT" -le 0 ]; then
        echo "ERROR: Could not connect to MySQL after 30 seconds."
        exit 1
    fi
done
echo "MySQL is ready."

################################################################################
# Create a temporary MySQL configuration file to avoid password warnings
################################################################################
MYSQL_CNF="/tmp/mysql.cnf"
cat > "$MYSQL_CNF" <<EOF
[client]
user=root
password="$MYSQL_ROOT_PASSWORD"
EOF

################################################################################
# Create a restricted application user with necessary permissions
################################################################################
echo "Creating application user and granting permissions..."
mysql --defaults-file="$MYSQL_CNF" <<-EOSQL
-- Create the application user if it does not exist
CREATE USER IF NOT EXISTS '$DB_USER'@'172.18.0.3' IDENTIFIED BY '$DB_PASSWORD';

-- Grant SELECT, INSERT, UPDATE, DELETE permissions on the application database
GRANT SELECT, INSERT, UPDATE, DELETE ON \`$DB_NAME\`.* TO '$DB_USER'@'172.18.0.3';

-- Apply the changes
FLUSH PRIVILEGES;
EOSQL

################################################################################
# Clean up the temporary configuration file
################################################################################
rm -f "$MYSQL_CNF"
echo "MySQL users created successfully."
