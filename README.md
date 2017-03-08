# Ethics-app

Ethics-application for the approval of user-studies


### 1. Requirements

##### 1.1. Install nodejs:

Go to [https://nodejs.org/en/](https://nodejs.org/en/) and download the latest **LTS Version** (currently: `v6.9.2 LTS`). Then install nodejs on your machine.

##### 1.2. Install bower:

Run in your terminal the following command:

```
npm install bower -g
```

##### 1.3. PostgresSQL

TODO

##### 1.4. Create database instance

TODO

### 2. Installation

**Attention: If you want to contribute to this project, please make a FORK on GitHub and send then a PULL-REQUEST with your changes. If you want to run the application, just follow the next steps.**

##### 2.1. Clone the repository

Choose one of the following options:

##### 2.1. a) Cloning with git

Go to [https://git-scm.com](https://git-scm.com) and download and install **Git**. Run then the following command:

```
git clone https://github.com/sitcomlab/Ethics-app.git
```

##### 2.1. b) Cloning with GitHub for Desktop

* Download and install **GitHub for Desktop** [https://desktop.github.com](https://desktop.github.com) and clone then the  repository:

![github for desktop](docs/img/github_desktop.png)


##### 2.2. Install dependencies:

Open a terminal and execute the following commands inside your local repository-folder (you should see the files: `package.json` and `bower.json`):

```
npm install
```

```
bower install
```

or as root:

```
sudo bower install --allow-root
```

##### 2.3. Configure App:

Execute the following Command inside our local repository-folder:
```
cp config.js.sample config.js
```
Open config.js with your preferred Text Editor and configure the App appropiately for your setup.

### 3. Run

* Please make sure, that your Postgres-database is running, otherwise open a new terminal and start the deamon with the following command:

TODO

* Start then the application with the following command:

```
node server.js
```

* As the application can send Emails, you have to specify the SMTP-server by environment variables:

```
SMTP_EMAIL=<SMTP_EMAIL> SMTP_PW=<SMTP_PW> SERVER_URL=<SERVER_URL> node server.js
```
