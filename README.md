#How to start

1- Clone the code git@github.com:morteza-araby/graphQLUsers.git

2- Change to source directory and install dependencies

> npm install

3- Run server by 

> npm run serve

4 - open the graphql development ui browsing to

> http://localhost:4000/graphql



### Some queries
# To get an specific company and users who work at that company:

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
# To get a user first name, age and company information 
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
# We can nest the query data, for example ask for company and users and inside users ask for company, and inside company again
# ask for users
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
## We can name the query
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
## We can ask several query with same root query, we just have to assign the different key 
## to queries
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