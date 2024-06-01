# ago-input store backend

Our store provides high-quality seeds and fertilizers to help you achieve a bountiful harvest


---
## Project setup
---

### Start Up

- Clone the repository
- navigate to project folder
- install `node js` and `npm`
- Install packages by running `npm install` 
- install postgreSQL that will be used fo database [download](https://www.postgresql.org/download/)
- install postman for APIs testing  [download](https://www.postman.com/downloads/)

### Dotenv setup

- Create `.env` in project root directory
- add PORT value `PORT=`
- add database `type`,`host`,`username`,`password` and `port`


### Running server

- Run `npm run start` to run server local
- Run `npm run test` for testing
- Run `test:watch`  check test
- Run `test:coverage`  test coverage

### Running server localy

[swagger documentation](http://localhost:4000/api-docs)

## APIs
- [Signup](http://localhost:4000/api/signup) 
- [Login](http://localhost:4000/api/login)
- [Create order](http://localhost:4000/api/order)
- [get order](http://localhost:4000/api/orders)
- [approver or reject order](http://localhost:4000/api/orders/2/approve)


## Tasks
- signup and login
- view list of orders by with only admin role and view own orders by customers
- create order when only logged in

## screenshot

![Screenshot from 2024-06-01 12-31-01](https://github.com/TuyizeeAnastase/ago-input-store/assets/42033331/09afcca2-17ca-4586-8447-c443065a2609)

