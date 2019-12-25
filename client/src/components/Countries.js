import React from "react";
import { gql } from "apollo-boost";
import { compose } from "recompose";
import { graphql } from "react-apollo";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemIcon from "@material-ui/core/ListItemIcon";
function Countries(props) {
  const { countries = [] } = props.data;

  return (
    <>
      <h1>Countries</h1>
      <List component="nav" aria-label="secondary mailbox folder">
        {countries.map((count, key) => {
          return (
            <ListItem key={key}>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary={count.name} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
const CountriesQuery = gql`
  query {
    countries {
      id
      name
      space_program
      date_of_creation
    }
  }
`;
const witthHooks = compose(graphql(CountriesQuery));
export default witthHooks(Countries);
