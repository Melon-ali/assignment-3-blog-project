# Blogging Platform Backend

A backend application for a blogging platform, built with TypeScript, Node.js, Express.js, and MongoDB, offering secure authentication, role-based access control, and robust CRUD operations for blogs and users..

## Features
## User Roles

1. Admin:

    * Can block users by updating the isBlocked property..

    * Can delete any blog.

    * Cannot update blogs.

2. User:

    * Can register and log in.

    * Can create, update, and delete their own blogs.

    * Cannot perform admin actions.

## Authentication & Authorization

   * Authentication: Required for all write, update, and delete operations.

   * Authorization: Role-based access control ensures that Admins and Users have different permissions.
## Blog API
* Public API to fetch all blogs, supporting:

    * Search: Filter blogs by title or content.
    * Sort: By fields like createdAt or title.
    * Filter: By author.

## Error Handling
* Consistent error responses with detailed messages.

* Handles validation, authentication, authorization, and internal server errors.

## Models
 
* name: Full name of the user.

* email: Email address (used for authentication).

* password: Securely hashed password.

* role: Either admin or user (default: user).

* isBlocked: Boolean flag to indicate if the user is blocked (default: false).

* createdAt, updatedAt: Timestamps for creation and updates.

## Blog Model
* title: Blog post title.
    
* content: Main content of the blog

* author: Reference to the User model.

* isPublished: Boolean flag for 
publication status (default: true).

* createdAt, updatedAt: Timestamps for creation and updates.



## API Endpoints
### Authentication
Register User
Endpoint: POST /api/auth/register
Description: Registers a new user.
Request Body:

    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "securepassword"
    }

 Success (201):

    {
        "success": true,
        "message": "User registered successfully",
        "data": { "_id": "string", "name": "string", "email": "string" }
    }

## Blog Management

Create Blog
Place an Order
Endpoint: POST /api/blogs
Description: Allows a logged-in user to create a blog.
Request Header: Authorization: Bearer<token>
Request Body:

    {
        "title": "My First Blog",
        "content": "This is the content of my blog."
    }
Response:
    Success (201):

    {
        "success": true,
        "message": "Blog created successfully",
        "data": { "_id": "string", "title": "string", "content": "string", "author": { "details" } }
    }
Update Blog
Endpoint: PATCH /api/blogs/:id
Description: Allows a logged-in user to update their own blog
Request Header: Authorization: Bearer<token>
Request Body:


    {
        "title": "Updated Blog Title",
        "content": "Updated content."
    }

Response:
   Success (200):

    {
        "success": true,
        "message": "Blog updated successfully",
            "data": { "_id": "string", "title": "string", "content": "string", "author": { "details" } }
    } 


Delete Blog
Endpoint: DELETE /api/blogs/:id
Description: Allows a logged-in user to delete their own blog.
Request Header: Authorization: Bearer<token>
Response:


    {
        "success": true,
        "message": "User blocked successfully"
    }



## Project Structure

    ├── src
    │   ├── controllers
    │   │   ├── auth.controller.ts
    │   │   ├── blog.controller.ts
    │   │   ├── admin.controller.ts
    │   ├── models
    │   │   ├── user.model.ts
    │   │   ├── blog.model.ts
    │   ├── routes
    │   │   ├── auth.routes.ts
    │   │   ├── blog.routes.ts
    │   │   ├── admin.routes.ts
    │   ├── services
    │   │   ├── auth.service.ts
    │   │   ├── blog.service.ts
    │   │   ├── admin.service.ts
    │   ├── app.ts
    │   └── server.ts
    ├── .env
    ├── package.json
    ├── README.md
    └── tsconfig.json                  

## Technologies Used

* Node.js: Backend runtime environment.

* Express.js: Framework for building APIs.

* MongoDB: NoSQL database for storing products and orders.

* Mongoose: ODM library for MongoDB.

* TypeScript: Strongly typed JavaScript for enhanced reliability.# assignment-3-blog-project
