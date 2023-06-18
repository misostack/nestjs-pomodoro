# Pomodoro Tracker Application

## Requirements

1. API to manage category
2. API to manage todo
3. API to manage setting
4. API to register with email and password/social accounts
5. API to login with email/social accounts
6. API to reset password with email
7. API to change password
8. API for statistic by : date range

## Getting start

### Create database

```sh
CREATE DATABASE pomodoro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'pomodoro'@'localhost' IDENTIFIED BY 'pomodoro123456';
CREATE ROLE developer_user;
grant alter,create,delete,drop,index,insert,select,update,trigger,alter
 routine,create routine, execute, create temporary tables
on pomodoro.* to 'developer_user';
grant 'developer_user' to 'pomodoro'@'localhost';
```

### Dependencies packages

```sh
npm i @nestjs/typeorm mysql2 dayjs dotenv log4js uuid
```

## Development

```sh
npm i
npm run start:debug
```

> Data migration

```sh
npm run typeorm:migration:generate ./src/database/migrations/migrationName
npm run typeorm migration:show
npm run typeorm migration:run
```
