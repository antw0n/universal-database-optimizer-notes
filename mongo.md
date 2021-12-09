# MongoDB

This file contains notes on installation and configuration of MongoDB.  

# Packages

The following packages were installed and later upgraded:
- mongodb-org to `4.10`
- mongodb-mms to `5.0.5`

```
mongodb-mms/now 4.9.2.100.20210506T1323Z-1 amd64 [installed,local]
  MongoDB Ops Manager

mongodb-org/focal 4.4.6 amd64
  MongoDB open source document-oriented database system (metapackage)
  
  	mongodb-org-mongos/focal 4.4.6 amd64
	  MongoDB sharded cluster query router

	mongodb-org-server/focal 4.4.6 amd64
	  MongoDB database server

	mongodb-org-shell/focal 4.4.6 amd64
	  MongoDB shell client

	mongodb-org-tools/focal 4.4.6 amd64
	  MongoDB tools

mongodb-org-database-tools-extra/focal 4.4.6 amd64
  Extra MongoDB database tools

```
  
The following development tools were applied:

- Insomnia 
- intellij-idea-ultimate 


# Installation

## MongoDB

### Download

Download and install MongoDB Ops Manager  

`wget http://downloads.mongodb.com/on-prem-mms/deb/mongodb-mms_5.0.0.100.20210710T1835Z-1_x86_64.deb`  

Further details: [Packages](https://docs.opsmanager.mongodb.com/current/tutorial/install-on-prem-with-deb-packages/)

### Install
Install Java, MongoDB, and MongoDB Extra Tools

```shell
1. wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
2. echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
3. sudo apt update && sudo apt-get install openjdk-16-jdk mongodb-org mongodb-org-database-tools-extra
```

Further details: [How to install MongoDB on Ubuntu?](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

### Start Services

**MongoDB**

```shell
Pre: > sudo nano /etc/mongod.conf
    storage:
          dbPath: /mnt/mt-mongo-strg/mongodb-data/mms/data
    systemLog:
          path: /mnt/mt-mongo-strg/mongodb-data/mms/log/mongod.log
     > sudo mkdir -p /mnt/mt-mongo-strg/mongodb-data/mms/data \
     && sudo mkdir -p /mnt/mt-mongo-strg/mongodb-data/mms/log \
     && sudo touch /mnt/mt-mongo-strg/mongodb-data/mms/log/mongod.log \
     && sudo chown -R mongodb:mongodb /mnt/mt-mongo-strg/mongodb-data
     > sudo systemctl start mongod && sudo systemctl enable mongod
     > sudo systemctl status mongod
Start: sudo systemctl start mongod
Status: sudo systemctl status mongod
Config: /etc/mongod.conf
Enable (start on boot): sudo systemctl enable mongod
```

Further details: [How to install MongoDB on Ubuntu 20.04 LTS?](https://linuxways.net/ubuntu/how-to-install-mongodb-on-ubuntu-20-04-lts/)


**Ops Manager**
```shell
Start: sudo systemctl start mongodb-mms.service
Status: sudo systemctl status mongodb-mms.service
Config list: ll /opt/mongodb/mms/conf/
Enable (start on boot): sudo systemctl enable mongodb-mms.service
```
Further details: [How to install MongoDB Ops Manager ?](https://docs.opsmanager.mongodb.com/current/tutorial/install-on-prem-with-deb-packages/)

## SMTP

```shell
1. sudo nano /etc/hosts
	> 127.0.0.1 localhost.com

2. sudo apt install postfix
	> Internet Site
	> Let remaining settings default

3. shared folder
	Mount: multipass mount ~/mail mt-ops-manager:/var/spool/mail
	Unmount: multipass unmount mt-ops-manager
	Info: multipass info mt-ops-manager

3. configuration
	1. If not exists, create file /etc/postfix/virtual: sudo nano /etc/postfix/virtual
		@localhost <your-guest-user>
		@localhost.com <your-guest-user>
	2. Configure postifx to read this file: sudo nano /etc/postfix/main.cf
		virtual_alias_maps = hash:/etc/postfix/virtual
		strict_mailbox_ownership = no
	3. Activate it: sudo postmap /etc/postfix/virtual
	4. Reload postfix: sudo postfix reload / sudo systemctl restart postfix

4. sudo apt install evolution
	1. File > New > Mail Account
	2. Next
	3. Identity
		Full Name: <your-host-user> 
		Email Address: <your-host-user>@localhost
		Next
	4. Receiving
		Server Type: Standard Unix Spool Directory
		Spool Directory: /home/<your-host-user>/mail
		Next
	5. Next
	6. Sending Email
		Server Type: SMTP
		Server: <your-guest-IPv4> (multipass info mt-ops-manager)
		Port: 25
		Encryption Method: STARTTLS after connecting
		Next
	7. Account Information
		Name: ubuntu@localhost
		
5. Map Folders
	1. Right mouse click on the account > Properties
	2. Defaults (ubuntu@localhost = Spool Directory = /home/<your-host-user>/mail)
		Draft Messages Folder: ubuntu@localhost/Drafts
		Sent Messages Folder: ubuntu@localhost/Sent
```

Further details: [How to setup a local only SMTP email server?](https://gist.github.com/raelgc/6031274)

## Install IDE and API Client
```shell
snap install insomnia && intellij-idea-ultimate --classic
```

## Create first user
```shell
wget --header "Accept: application/json" \
     --header "Content-Type: application/json" \
     --post-data ' { "username": "admin@localhost.com", "password": "Passw0rd.", "firstName": "John", "lastName": "Doe" }' \
       "http://192.168.122.246:8080/api/public/v1.0/unauth/users?pretty=true&whitelist=1.2.3.4&whitelist=2.3.4.5"
```

Further details: [How to create the first user?](https://docs.opsmanager.mongodb.com/current/reference/api/user-create-first/)


## Configure Ops Manager

### Configure Installation

*-- Web Server --*  
	URL to Access Ops Manager: http://<your-guest-IPv4>:<Port>  
	Client Certificate Mode: None  
	
*-- Email --*  
	"From" Email Address: Ops Manager<opsmanager@localhost.com>  
 	"Reply To" Email Address: Ops Manager<opsmanager@localhost.com>  
 	Admin Email Address: Admin <admin@localhost.com>  
 	Email Delivery Method Configuration: SMTP Email Server  
 	Transport: smtp  
 	SMTP Server Hostname: localhost  
 	SMTP Server Port: 25  
 	Use TLS/SSL: false  
 	
*-- User Authentication --*  
	User Authentication Method: Application Database  
	Invitation Only Mode: false  
	Bypass Invitation Mode: false  

*-- Multi-Factor Authentication --*  
	Multi-factor Auth Level: Optional  
	Multi-factor Auth Allow Reset: false  
	
*-- Other Authentication Options --*  
	ReCaptcha Enabled on Registration: false  
	ReCaptcha Enabled on Login: false  
	Session Max Hours: 1440  
	New Device Login Notification: false  
	
*-- Permissions --*  
	Usage Information Collection: ?  
	
*-- Backup Snapshots --*  
	File System Store Gzip Compression Level: Default  

*-- Backup Snapshots Schedule --*  
	Snapshot Interval (hours): 24  
	Base Retention of Snapshots (in days): 2  
	Daily Retention of Snapshots (in days): No daily retention  
	Weekly Retention of Snapshots (in weeks): 2  
	Monthly Retention of Snapshots (in months): 1  

*-- Queryable Snapshot Configuration --*  
	Proxy Server Port: 25999  
	Read Cache Size (MB): 512  
	
*-- MongoDB Version Management --*  
	Installer Download Source: remote  
	Versions Directory: /opt/mongodb/mms/mongodb-releases/  
	Backup Versions Auto Download: true  
	Backup Versions Auto Download Enterprise Builds: false  
	Required Module for Backup: Enterprise Preferred  

### Set up Ops Manager Monitoring

Set up Ops Manager Monitoring: Install the MongoDB Agent on your AppDB servers and connect to Ops Manager for full monitoring and alerting support.  
1. Install a MongoDB Agent on a single server: Debian 8/9/10, Ubuntu 16.X/18.X/20.x - DEB  
2. Follow the guide  
3. `sudo systemctl status mongodb-mms-automation-agent.service`  
4. Verify Agent  
5. Go Back  

```shell
    Start: sudo systemctl start mongodb-mms-automation-agent.service
    Status: sudo systemctl status mongodb-mms-automation-agent.service
    Config: sudo nano /etc/mongodb-mms/automation-agent.config
    Enable (start on boot): sudo systemctl enable mongodb-mms-automation-agent
```

### Create new organization
1. Name Your Organization: mt-exp-org	
2. Select a Default Server Type: Development Server
3. Create Organization

### Create new project
1. Name Your Project: mt-exp-pro
2. Select a Default Server Type: Development Server
3. Create Project
	
### Build new deployment

`[vm-strg]` refers to one of `/mnt/mt-ops-manager-strg | /mnt/mt-mongo-[1|2|3]-strg`

1. New Replica Set
2. Replica Set Id: mt-exp-rs-001
3. Process Name: mt-exp-rs-001
4. Version: 4.4.10	
5. Data Directory: `[vm-strg]`
6. Log File: `[vm-strg]`/mongodb.log

See: [Virtualization](virtualization.md)

### Configure /etc/hosts
```shell
  sudo nano /etc/hosts
```
Add:
- 192.168.122.155 mt-mongo-1
- 192.168.122.82 mt-mongo-2
- 192.168.122.196 mt-mongo-3

See: [Virtualization](virtualization.md)



	
