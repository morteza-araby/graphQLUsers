# How to start

1- Clone the code git@github.com:morteza-araby/graphQLUsers.git

2- Change to source directory and install dependencies

> npm install

3- Run server by 

> npm run serve

4 - open the graphql development ui browsing to

> http://localhost:4000/graphql



## Some queries
### To get an specific company and users who work at that company:

```bash
{
  company(id:"2"){
    description,
    name,
    users{
      firstName
    }
  }
}
```
### To get a user first name, age and company information 
```bash
{
  user(id:"40"){
    firstName,
    age,
    company {
      name,
      description
    }
  }
}
```
### We can nest the query data, for example ask for company and users and inside users ask for company, and inside company again
### ask for users
```bash
{
  company(id:"2"){
    description,
    name,
    users{
      firstName,
	  company {
		  name
		  users {
			  age
		  }
	  }
    }
  }
}
```
### We can name the query
```bash
query findCompany {
	company(id:"2"){
    description,
    name,
    users{
      firstName
    }
  }
}
```
### We can ask several query with same root query, we just have to assign the different key 
### to queries
```bash
{
	apple: company(id:"1"){
    description,
    name
  }
  google: company(id:"2"){
    description,
    name
  }
}
```

### query fragment, a list of different properties that we want to access as a fragment can reduce
### the repetetive code.
```bash
{
	apple: company(id:"1"){
    ...companyDetails
  }
  google: company(id:"2"){
	  ...companyDetails
  }
}

fragment companyDetails on Company {
	id
	name
	description
}

```
## Mutation
### Calling addUser to add a new user to db
```bash
mutation {
	addUser(firstName: "John", age: 33){
		id
		firstName
		age
	}
}
```
### Using deleteUser

```bash
mutation {
	deleteUser(id: "Syl1SEe_W") {
		id
	}
}
```

### Using editUser to overwrite an property

```bash
	mutation {
	editUser(id: "40", age: 10) {
		id
		firstName
		age
	}
}
```