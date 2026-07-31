import searchTracks from "./searchParams"
import DisplayResults from "./displayResults"
import { useState } from "react"
import Playlist from "../features/fetchPlaylist";
import updateValue from "../features/inputValue";
import postPlaylist from "../features/createPlaylist";
import { useRef } from "react";

function Welcome (){
const [results,setResults] = useState([]);
const [playlist,setPlaylist] = useState([]);
const [playlistName,setPlaylistName] = useState();
const [isSearching,setIsSearching] = useState(false);
const [isCreating,setIsCreating] = useState (false);
const debounceTimer = useRef(null);
    return (
        <>
          <h1 className="welcome-banner">Jamming!</h1>
          <label>Search</label>
          <div className="controls-row">
          <input className="text-input" id='search' onChange={(e)=>{searchTracks(e,setResults,setIsSearching,debounceTimer)}}></input>
          <input  className="text-input" onChange={(e)=>{updateValue(e,setPlaylistName)}}></input>
          <button className="primary-button" onClick={()=>{postPlaylist(playlistName,setPlaylist,setIsCreating)}}>Create Playlist</button>
          {isCreating && <p>Creating Playlist...</p>}
          </div>
          {isSearching&& <h1>Loading...</h1>}
          <DisplayResults results={results} playlist={playlist}/>
          <Playlist setPlaylist={setPlaylist} playlists={playlist}/>
        </>
    )
}

export default Welcome 