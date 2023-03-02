<h1 align="center"> 
	SuperSell Server
</h1>

<h3 align="center"> 
	Non-Functional Requirements
</h3>

- [x] SuperSell Server should be developed using the following technologies: Node.js, Nest.js, TypeScript, PostgreSQL, Prisma and Docker.
- [x] REST API should use prefix: '/api/v1/'
- [ ] Should feature a seeder for data.
- [x] Docker container for the database.
- [ ] Docker container for the application.
- [ ] Create Github documentation.
- [ ] Create Swagger REST API documentation.
- [ ] Implement security configuration: SQL Injection, XSS Protection, Security Headers, Rate limiting, HPP & CORS etc.
- [ ] Should include unit and integration tests.
- [ ] Implement server configuration: Nginx, SSL, Domain, PM2 etc.
- [ ] Create basic CI/CD and Github Actions pipeline.
- [ ] Should be deployed to Amazon AWS EC2.
- [ ] Should use AWS S3 to store static files.

<h3 align="center"> 
	Functional Requirements
</h3>

### #Authentication

- [x] Users should be able to sign up.
- [x] Users should be able to sign in.
- [ ] Users should be able to reset their password trough email.

### #Departments

- [x] Server admin should be able to create a new product department.
- [x] Server admin and users should be able to read all the existent department.
- [x] Server admin should be able to read a department with their id.
- [x] Server admin should be able to update an existent department.
- [x] Server admin should be able to delete an existent department.

### #Products

- [x] Users should be able to publish a product to sell.
- [x] Users should be able to update their products.
- [x] Users should be able to delete their products.
- [ ] Users should be able to read information about a given product.
- [ ] Users should be able to read all products in a category and paginate trough the results.
- [ ] Users should be able to search a product by their name.

### #Users

- [x] Create role based permission for admins and user.
- [ ] Users should be able to read all their published product.
- [ ] Users should be able to filter their publish product by sold and not sold.
- [ ] Users should be able to see other users profile.
- [ ] Users should be able to upload an avatar.
- [ ] User rating should be the average of their products rating.

### #Files

- [ ] Users should be able to upload images of their products when is going to publish them.
- [ ] Users should be able to delete images of their published products.

### #Wishlists

- [ ] Users should be able to add a product to their wishlist.
- [ ] Users should be able to read the products on their wishlist.
- [ ] Users should be able to remove a product from their wishlist.

### #Shopping Carts

- [ ] Users should be able to add a product to their shopping cart.
- [ ] Users should be able to delete a product from their shopping cart.
- [ ] Users should be able to read the products from their shopping cart.

### #Orders

- [ ] Users should be able to create an order with a product.
- [ ] Users should be able to read all the products they have an order.
- [ ] Users should be able to filter their orders based on if it is paid or not.
- [ ] Server admin should be able to change the status of a order.

### #Payments

- [ ] Users should be able to pay for a order.

### #Reviews

- [ ] Users should be able to create a review for a product.
- [ ] Users should be able to delete a review for a product.
- [ ] Users should be able to see all the reviews for a product.

### #Emails

- [ ] Users should confirm their account trough email.
- [ ] Users should reset their password trough email.
- [ ] Users should receive email for every status their order get.
