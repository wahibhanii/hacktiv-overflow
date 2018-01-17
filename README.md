# [Hacktiv Overflow](https://hackflow.wahibhanii.xyz)

A Q&amp;A website project
[hackflow.wahibhanii.xyz](https://hackflow.wahibhanii.xyz)
____________________
## App Usage 

### Page
  - regular signup using email
  - regular login people you follow
  - Browse Question Entries:
    - All: see all question
    - By You: see your questions
  - Add new question entry: post new question entry / article
  - Question detail: show Question content and detailed info
  - Edit Question: edit a Question /article

## Feature
  - __Admin mode__: make you act as an admin
    - Able to edit all posts
    - Able to delete all posts
  - __Add Question__: Post new question entry / article
  - __Edit Question__: Edit a question /article
  - The API server was built using TDD and BDD method
  - __Post Answer__: Post answer to someone's question
  - __Delete Answer__: delete answer you've posted
  - __Upvotes and Downvotes__: upvote or downvote question or answer
  - __Emal notification__: You will get email notification everytime someone give answer to your question

-------
# Hacktiv Overflow API
## Users API
### List of Users API endpoint:
| Route                       | HTTP   | Description                         | 
| -------------------------   |:------ | ----------------------------------- |
| `/users/login`              | POST   | Regular Login, returns access token |
| `/users/`                   | POST   | Create new User / Signup            |

### Endpoint Usage
- POST : `/users/login`
  - req.body.email: should contain user's email
  - req.body.password: should contain user's password
- POST : `/users/`
  - req.body.email: should contain user's email
  - req.body.userName: should contain user's username
  - req.body.password: should contain user's password

## Question API
### List of Article API endpoint:
| Route                      | HTTP   | Description           | 
| -------------------------- |:------ | --------------------  |
| `/questions/`              | GET    | Get all questions     |
| `/questions/:id`           | GET    | Get question by ID    |
| `/questions/`              | POST   | Create new question   |
| `/questions/:id`           | DELETE | Delete a question     |
| `/questions/:id/`          | PUT    | Edit a question       |
| `/questions/:id/upvote`    | PUT    | upvote /unupvote a question |
| `/questions/:id/downvote`  | PUT    | downvote/ undownvote a question|

### Endpoint Usage
- GET : `/questions/`
- GET : `/questions/:id`
  - `req.headers.token`: contain token from login
  - `req.params.id`: target question's ID
- POST : `/questions/` 
  - `req.headers.token`: contain token from login
  - `req.body.title`: question title
  - `req.body.content`: question content
- DELETE : `/questions/:id`  
  - `req.headers.token`: contain token from login
  - `req.params.id`: target question's ID
- PUT : `/questions/:id/`
  - `req.headers.token`: contain token from login
  - `req.params.id`: target question's ID
  - `req.body`: should contain updated field and it's value (write in stringified JSON)
- PUT : `/questions/:id/upvote`:
  - `req.headers.token`: contain token from login
  - `req.params.id`: question's id
- PUT : `/questions/:id/downvote`:
  - `req.headers.token`: contain token from login
  - `req.params.id`: question's id

## Answer API
### List of Article API endpoint:
| Route                      | HTTP   | Description           | 
| -------------------------- |:------ | --------------------  |
| `/answers/`                | GET    | Get all answers       |
| `/answers/:id`             | GET    | Get answer by ID      |
| `/answers/`                | POST   | Create new answer     |
| `/answers/:id`             | DELETE | Delete an answer       |
| `/answers/:id/`            | PUT    | Edit an answer         |
| `/answers/:id/upvote`      | PUT    | upvote /unupvote an answer |
| `/answers/:id/downvote`    | PUT    | downvote /undownvote an answer|

### Endpoint Usage
- GET : `/answers/`
- GET : `/answers/:id`
  - `req.headers.token`: contain token from login
  - `req.params.id`: target answer's ID
- POST : `/answers/` 
  - `req.headers.token`: contain token from login
  - `req.body.title`: answer title
  - `req.body.content`: answer content
- DELETE : `/answers/:id`  
  - `req.headers.token`: contain token from login
  - `req.params.id`: target answer's ID
- PUT : `/answers/:id/`
  - `req.headers.token`: contain token from login
  - `req.params.id`: target answer's ID
  - `req.body`: should contain updated field and it's value (write in stringified JSON)
- PUT : `/answers/:id/upvote`:
  - `req.headers.token`: contain token from login
  - `req.params.id`: answer's id
- PUT : `/answers/:id/downvote`:
  - `req.headers.token`: contain token from login
  - `req.params.id`: answer's id

Access the website via [hackflow.wahibhanii.xyz](https://hackflow.wahibhanii.xyz) or API via `https://api.hackflow.wahibhanii.com`

