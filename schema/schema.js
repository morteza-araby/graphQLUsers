const graphql = require('graphql');
const _  = require('lodash');

const users = [
	{id: '23', firstName: 'Bil', age: 20},
	{id: '47', firstName: 'Samantha', age: 21},
]
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
} = graphql;

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: { type: GraphQLString },
		firstName: {type: GraphQLString},
		age: {type: GraphQLInt},
	}
});

const RootQuery = new GraphQLObjectType({
	name:'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: {id: {type: GraphQLString}},
			resolve(parentValue, args) {
				return _.find(users, {id: args.id});
			}
		}
	}
});

module.exports = new GraphQLSchema ({	
	query: RootQuery
});

//module.exports = Schema;