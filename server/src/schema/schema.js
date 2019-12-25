const graphql = require("graphql");
const Countries = require("../models/country");
const Astronauts = require("../models/astronaut");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;
const reAstronautType = {
  name: { type: new GraphQLNonNull(GraphQLString) },
  gender: { type: new GraphQLNonNull(GraphQLBoolean) },
  birth_date: { type: new GraphQLNonNull(GraphQLString) }
};
const reCountryType = {
  name: { type: new GraphQLNonNull(GraphQLString) },
  space_program: { type: new GraphQLNonNull(GraphQLString) },
  date_of_creation: { type: new GraphQLNonNull(GraphQLString) }
};
const AstronautType = new GraphQLObjectType({
  name: "Astronaut",
  fields: () => ({
    id: { type: GraphQLID },
    ...reAstronautType,
    country: {
      type: CountryType,
      resolve(parent, args) {
        return Countries.findById(parent.country_id);
      }
    }
  })
});
const CountryType = new GraphQLObjectType({
  name: "Country",
  fields: () => ({
    id: { type: GraphQLID },
    ...reCountryType,
    astronauts: {
      type: new GraphQLList(AstronautType),
      resolve(parent) {
        return Astronauts.find({ country_id: parent.id });
      }
    }
  })
});
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCountry: {
      type: CountryType,
      args: {
        ...reCountryType
      },
      resolve(parent, { name, space_program, date_of_creation }) {
        const countries = new Countries({
          name,
          space_program,
          date_of_creation
        });
        return countries.save();
      }
    },
    addAstronaut: {
      type: AstronautType,
      args: {
        ...reAstronautType,
        country_id: { type: GraphQLID }
      },
      resolve(parent, { name, gender, birth_date, country_id }) {
        const astronaut = new Astronauts({
          name,
          gender,
          birth_date,
          country_id
        });
        return astronaut.save();
      }
    },
    updateCountry: {
      type: CountryType,
      args: {
        id: { type: GraphQLID },
        ...reCountryType
      },
      resolve(parent, { id, name, space_program, date_of_creation }) {
        return Countries.findOneAndUpdate(
          id,
          {
            $set: {
              name,
              space_program,
              date_of_creation
            }
          },
          { new: true }
        );
      }
    },
    updateAstronaut: {
      type: AstronautType,
      args: {
        id: { type: GraphQLID },
        ...reAstronautType,
        country_id: { type: GraphQLID }
      },
      resolve(parent, { id, name, gender, birth_date, country_id }) {
        return Astronauts.findOneAndUpdate(
          id,
          {
            $set: {
              name,
              gender,
              birth_date,
              country_id
            }
          },
          { new: true }
        );
      }
    },
    deleteCountry: {
      type: CountryType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Countries.findOneAndDelete(id);
      }
    },
    deleteAstronaut: {
      type: AstronautType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Astronauts.findOneAndDelete(id);
      }
    }
  }
});
const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    astronaut: {
      type: AstronautType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Astronauts.findById(id);
      }
    },
    country: {
      type: CountryType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Countries.findById(id);
      }
    },
    astronauts: {
      type: new GraphQLList(AstronautType),
      resolve() {
        return Astronauts.find({});
      }
    },
    countries: {
      type: new GraphQLList(CountryType),
      resolve() {
        return Countries.find({});
      }
    }
  }
});
module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});
