// getAll
query{
  astronauts {
      id
    name
    gender
    birth_date
    country {
      id
    }
  }
}
// get
query($id: ID){
  astronaut(id: $id) {
    name
    gender
    birth_date
    country {
      name
      date_of_creation
      space_program
    }
  }
}
// create
mutation($name: String!, $space: String!, $date: String!){
  addCountry(name: $name, space_program: $space, date_of_creation: $date) {
    name
    space_program
    date_of_creation
  }
}
mutation($name: String!, $gender: Boolean!, $date: String!!, $country_id: ID){
  addAstronaut(name: $name, gender: $gender, birth_date: $date, country_id: $country_id) {
    name
    gender
    birth_date
    country {
      name
    }
  }
}
// delete
mutation($id: ID){
	deleteCountry(id: $id) {
    name
  }
}
mutation($id: ID){
	deleteAstronaut(id: $id) {
    name
  }
}
// update
mutation ($id: ID, $name: String!, $gender: Boolean!, $date: String!!, $counId: ID) {
  updateAstronaut(id: $id, name: $name, gender: $gender, birth_date: $date, country_id: $counId) {
    name
    gender
    country {
      name
    }
  }
}
mutation ($id: ID, $name: String!, $date: String!!, $space: String!) {
  updateCountry(id: $id, name: $name, date_of_creation: $date, space_program: $space) {
    name
  	date_of_creation
    space_program
  }
}
yarn add apollo-boost react-apollo graphql @material-ui/core @material-ui/icons react-swipeable-views recompose