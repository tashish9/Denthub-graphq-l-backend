This is backend graphql code of denthub clone

# Prerequisites

- MongoDB
- NodeJs
- git

# Setup Project

1. To run this on your machine , clone the repository
2. CD into the project directory
3. Run `npm install` on terminal
4. Create a .env file on root of directory mentioning

```
PORT = 8000
MONGO_URI = "Mongo-db-connection-url"
SECRET = "Secret-string"
ENV = development
```

5. Run `npm start` to start the server
6. You can make requests from postman or browser using http://localhost:8000/graphql
7. And for testing , you can run `npm test` on terminal

# Example Query/Request

Note that you have to provide a proper jwt token for all requests except signup and signin

1. Requesting a Query

```
Query sampleQuery{
  userById(_id : 'a-valid-mongodb-id'){
    username
    phoneNumber
  }
}
```

2. Requesting a Mutation

```
Mutation sampleMutation{
  signup(email : 'avalidemail.com' , username : 'sample-user' , password : 'astrongpassworrd' ){
    email
    username
  }
}
```

3. Subscribing to a particular query/mutation

```
Subscription OnCommentAdded() {
    signin(email : '' , password : '') {
      username
    }
  }
```