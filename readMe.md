# Introduction

This project with product named Foodmarket is a Grazaz Academy accelerator challenge 3 task assigned to me as an Intern Backend developer. 

Everyone is tired of going to the market, and a team of friends have decided to build a simple platform to order foodstuffs online. So I was tasked as a back-end developer to write and built an endpoint that has the features of the following:

## Building and creating endpoints for foodmarket app

1.Authenticate users with Oauth2 and social login (Facebook and Google)
2.Create an endpoint to view all available foodstuffs fetching 10 events per time (Pagination).
3.Create an endpoint to create a new foodstuff package but only for someone with role “ROLE_ADMIN”
4. Create an endpoint to pay for foodstuffs. Use flutterwave to process the payment, ask for number of KG to calculate the final price to pay
5. Create endpoint to add to cart before checkout

In this pattern, we show how to create endpoints to differenciate between Users and Admin, and then profiling Admin rights for authentication and authorization using Oauth2 Authorization code grant types, MySQL to store users' data and PostgreSQL to store other data. I'm also Connecting to database through AWS database service. For Ouath2, middleware jasonwebtoken and joi validation was used intead of KeyCloak or Okta.

### Postman Documentation
[Foodmarket app] https://documenter.getpostman.com/view/19468470/UVz1MBxQ

### Heroku Documentation
https://fathomless-beyond-10355.herokuapp.com/

#### Developer Documentation
Twitter: https://www.twitter.com/makamakanaki
Linkedin: https://www.linkedin.com/in/makacoder

Copyright(c) 2022 - 2024 Maka Inc.
All rights reserved.