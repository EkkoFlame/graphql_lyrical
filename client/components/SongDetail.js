// Shows details of particular song
import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import fetchSong from "../queries/fetchSong";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;
    if (!song) {
      return <div>"Loading..."</div>; // watch out RETURN must be here!
    }
    // console.log(song.title);
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>song detail</h3>
        <div>{song.title}</div>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.params.id} />
      </div>
    );
  }
}
// passing query variabe to a non-mutation i.e. query:
export default graphql(fetchSong, {
  options: props => {
    return { variables: { id: props.params.id } };
  }
})(SongDetail);
