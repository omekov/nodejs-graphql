import React from "react";
import { gql } from "apollo-boost";
import { compose } from "recompose";
import { graphql } from "react-apollo";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ListItemIcon from "@material-ui/core/ListItemIcon";
function Astronauts(props) {
  const { astronauts = [] } = props.data;
  return (
    <>
      <h1>Astronauts</h1>
      <List component="nav" aria-label="secondary mailbox folder">
        {astronauts.map((astr, key) => {
          return (
            <ListItem key={key}>
              <ListItemIcon>
                <>
                  <EditIcon />
                  <DeleteIcon />
                </>
              </ListItemIcon>
              <ListItemText primary={astr.name} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
const astronautsQuery = gql`
  query {
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
`;
const witthHooks = compose(graphql(astronautsQuery));
export default witthHooks(Astronauts);
