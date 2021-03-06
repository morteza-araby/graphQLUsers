const graphql = require('graphql');
const axios = require('axios');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull,
} = graphql;

const CompanyType = new GraphQLObjectType({
	name: 'Company',
	fields: () => ({ // using the clouser to overcome circular definition video 23
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		users: {
			type: new GraphQLList(UserType),
			resolve (parentValue, args) {
				console.log(parentValue, args)
				return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
					.then(resp => resp.data);
			}
		}
	})
});

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: { type: GraphQLString },
		firstName: { type: GraphQLString },
		age: { type: GraphQLInt },
		company: {
			type: CompanyType,
			resolve (parentValue, args) {
				return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
					.then(resp => resp.data);
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLString } },
			resolve (parentValue, args) {
				//return _.find(users, {id: args.id});
				return axios.get(`http://localhost:3000/users/${args.id}`)
					.then(resp => {
						return resp.data;
					});
			}
		},
		company: {
			type: CompanyType,
			args: { id: { type: GraphQLString } },
			resolve (parentValue, args) {
				return axios.get(`http://localhost:3000/companies/${args.id}`)
					.then(resp => resp.data);
			}
		}
	}
});

const mutation = new GraphQLObjectType({
	name: 'Mutaion',
	fields: {
		addUser: {
			type: UserType,
			args: {
				firstName: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
				companyId: { type: GraphQLString }
			},
			resolve (parentValue, { firstName, age }) {
				return axios.post('http://localhost:3000/users/', { firstName, age })
					.then(resp => resp.data);
			}
		},

		deleteUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve (parentValue, args) {
				return axios.delete(`http://localhost:3000/users/${args.id}`)
					.then(resp => resp.data)
			}
		},

		/**
		 * Put request will completely replace the current record (overwrite). Patch Request will only
		 * overwrite the property that is inclueds in request
		 */
		editUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
				firstName: { type: GraphQLString },
				age: { type: GraphQLInt },
				companyId: { type: GraphQLString },
			},
			resolve (parentValue, args) {
				return axios.patch(`http://localhost:3000/users/${args.id}`, args)
					.then(resp => resp.data);
			}
		},
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation
});
//module.exports = Schema;