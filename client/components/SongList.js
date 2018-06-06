import React, { Component } from "react";
// import { DIRECTIVE } from "graphql/language/kinds";
import gql from "graphql-tag";
import { graphql } from "react-apollo"; //
import { Link } from "react-router";
import query from "../queries/fetchSongs";

class SongList extends Component {
  onSongDelete(id) {
    // call mutation. query variables we want is id prop
    this.props
      .mutate({ variables: { id } })
      .then(() => this.props.data.refetch());
  }
  // Helper function to map over songs from query (this.props.data.songs)
  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`songs/${id}`}>{title}</Link>
          <i className="material-icons" onClick={() => this.onSongDelete(id)}>
            delete
          </i>
        </li>
      );
    });
  }
  render() {
    console.log(this.props);
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}
const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
      title
    }
  }
`;
// graphql wraps our query and we will get our data as this.props.data.songs
// songs because above in gql`` query we 1st specified "songs" arg.
export default graphql(mutation)(graphql(query)(SongList));
