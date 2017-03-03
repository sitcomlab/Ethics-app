# Ethics-app

Ethics-application for the approval of user-studies


## Installation

### 1. Database

##### 1.1. Postgres

* Go to [https://www.postgresql.org](https://www.postgresql.org) and download the latest version of Postgres.
* If you are on Ubunutu you can use the following commands

```
sudo apt-get install postgresql postgresql-contrib
sudo -i -u postgres

```

* If you are on macOS you can alternatively use Homebrew ([http://brew.sh/index_de.html](http://brew.sh/index_de.html)) to install Postgres

```
brew install postgres

brew services start postgres
brew services restart postgres
brew services stop postgres
```

or simply download and install the [Postgres.app](http://postgresapp.com/).

##### 1.2. Database instance

* Create a new database instance with the name `ethics-app`
* Go to [https://www.pgadmin.org](https://www.pgadmin.org), download and install pgAdmin to create a new database
* Alternatively you can use the following command to create a new database of the command-line (run the command with `sudo`, if you don't have permission):

```
createdb -h localhost -p 5432 -U postgres ethics-app
```

* Another option is the Postgres prompt, open it with the command `psql` and run the following command:

```
CREATE DATABASE ethics-app;
```

* More information can be found here:  [https://www.tutorialspoint.com/postgresql/postgresql_create_database.htm](https://www.tutorialspoint.com/postgresql/postgresql_create_database.htm)

##### 1.3. Database schemas

* The next step is to create all tables in your database instance.
* You can use a setup-script to prepare the schemas automatically.
* If you don't have Nodejs installed, please follow the instructions of [2.3.](#nodejs) first.
* Execute the setup-script with the following command (run the command with `sudo`, if you don't have permission):

```
node setup.js
```

* If you need to specify the **NODE ENVIRONMENT VARIABLES**, these parameters can be set:
    * `POSTGRES_HOST`: Postgres host address (default: `127.0.0.1`)
    * `POSTGRES_PORT`: Postgres port number (default: `7687`)
    * `POSTGRES_USERNAME`: Postgres username (default: `Nicho`)
    * `POSTGRES_PASSWORD`: Postgres password (default: ``)
* Run the following command, like this:

```
# Linux & macOS
node setup.js

# Windows
set node setup.js
```


### 2. Ethics-app

##### 2.1. Git/GitHub
* If you have Git already installed, you can use the CLI in your terminal.

* Install Git: [https://git-scm.com](https://git-scm.com)

* Install the GitHub client: [https://desktop.github.com](https://desktop.github.com)

##### 2.2. GitHub repository

* Clone the repository to your local (run the command with `sudo`, if you don't have permission):

```
git clone https://github.com/sitcomlab/Ethics-app.git
```

##### 2.3. Nodejs

* Install Nodejs: [https://nodejs.org](https://nodejs.org)
* Install the required node-modules from the `package.json` inside the repository (run the command with `sudo`, if you don't have permission):

```
node npm install
```

##### 2.4. Bower

* Install Bower via **npm** (run the command with `sudo`, if you don't have permission):

```
node npm bower -g
```

* Install the required bower_components from the `bower.json`:

```
bower install
```

* If you need root-permission, install the bower dependencies with this command:

```
sudo bower install --allow-root
```

##### (Server settings)

* If you have installed the Ethics-app on a Linux server, you can create a cronjob to automatically start the server after a reboot. Open `sudo nano /etc/crontab` and add the following lines:

```
# Start Ethics-app
@reboot         root    cd /home/<username>/Ethics-app && PORT=5000 node server.js >> log.txt
```

* Add an optional `>> log.txt` to automatically log the output of the console to a text-file.
* Add the following lines to your `/etc/crontab`, if you want to create an internal redirect from incoming port 80, to internal port 5000, as well as incoming port 443 to internal port 5443:

```
# Redirecting
@reboot        root    iptables -A INPUT -i eth0 -p tcp --dport 80 -j ACCEPT && iptables -A INPUT -i eth0 -p tcp --dport 80 -j ACCEPT && iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 5000 && iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 5443
```

### 3. Starting the Ethics-app

* You can start the Ethics-app-server with the following command:

```
node server.js
```

* If you need to specify the **NODE ENVIRONMENT VARIABLES**, these parameters can be set:
    * `NODE_ENV`: server environment (default: `development`, option: `production`)
    * `SERVER_URL`: url of the nodejs-server (default: `http://ethics-app.uni-muenster.de`)
    * `HTTP_PORT`: port number of the nodejs-server: (default: `5000`)
    * `HTTPS_PORT`: secure port number of the nodejs-server: (default: `HTTP_PORT + 443`)
    * `POSTGRES_HOST`: Postgres host address (default: `localhost`)
    * `POSTGRES_PORT`: Postgres port number (default: `5432`)
    * `POSTGRES_DB_NAME`: Postgres database name (default: `ethics-app`)
    * `POSTGRES_USERNAME`: Postgres username (default: `Nicho`)
    * `POSTGRES_PASSWORD`: Postgres password (default: `undefined`)
    * `POSTGRES_SSL`: Postgres ssl connection (default: `false`)
    * `FROM`: Email-address for users to reply, if they have question (default: `ifgi-ethics@uni-muenster.de`)
    * `SMTP_HOST`: SMTP host address (default: `smtp.gmail.com`)
    * `SMTP_PORT`: SMTP port number (default: `465`)
    * `SMTP_SSL`: SMTP ssl connection (default: `true`)
    * `SMTP_EMAIL_ADDRESS`: SMTP email address, which is used to send emails via nodemailer to send document-Ids and notify the users and members about changes (default: `undefined`)
    * `SMTP_PASSWORD`: SMTP password (default: `undefined`)
    * `JWTSECRET`: Secret for the JSON-Webtoken-authentication (default: `superSecretKey`)

* If you want to run the application, you need to specify the `SMTP_EMAIL_ADDRESS` and `SMTP_PASSWORD` of the Sitcom Lab, otherwise no Emails with your Document-Ids can be sent to you.
* Run the following command, like this:

```
# Linux & macOS
HTTP_PORT=4000 node server.js

# Windows
set HTTP_PORT=4000 node server.js
```

## License

[MIT](LICENSE)
