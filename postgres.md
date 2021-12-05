# PostgreSQL

This file contains notes on installation and configuration of PostgreSQL.  

## Install PostgreSQL
   
   ```shell
   sudo apt install postgresql postgresql-client
   ```

   Further details:  
    - [How to install PostgreSQL on Ubuntu 20.04?](https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart)   
    - [Ubuntu Database documentation - PostgreSQL](https://ubuntu.com/server/docs/databases-postgresql)  

## Configure PostgreSQL

1. To enable other devices to connect to your PostgreSQL server, edit the file `/etc/postgresql/12/main/postgresql.conf`
   Locate the line `#listen_addresses = ‘localhost’` and change it to:

    ```shell
    sudo nano /etc/postgresql/12/main/postgresql.conf
    # Allow incoming connections:
    listen_addresses = '*'
    ```

2. Configure the password for the user postgres:

    ```shell
    # Get psql:
    sudo -u postgres psql
    # Adjust password:
    ALTER USER postgres with encrypted password 'postgres-001';
    ```

3. Activate MD5 authentication for the user postgres:
    ```shell
    # Open pg_hba.conf:
    sudo nano /etc/postgresql/12/main/pg_hba.conf
    # Adjust host-based authentication:
    host    all             postgres        0.0.0.0/0               md5
    ```

## Run PostgreSQL

```shell
Start: sudo systemctl start postgresql  
Status: sudo systemctl status postgresql  
Config: /etc/mongod.conf  
Enable (start on boot): sudo systemctl enable postgresql  
```

## Useful SQL-Commands

Drop connections:
```sql
SELECT                    
    pg_terminate_backend(pid) 
FROM 
    pg_stat_activity 
WHERE 
    -- don't kill my own connection!
    pid <> pg_backend_pid()
    -- don't kill the connections to other databases
    AND datname = 'tpch_sf10'
    ;
```

Drop database:
```sql
drop database "tpch_sf10";
```

Get database size:
```sql
SELECT pg_size_pretty(pg_database_size('tpch_sf10'));
```

