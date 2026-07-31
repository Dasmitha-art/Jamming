import AddToPlaylist from "./addToPlaylist";
import { useState } from "react";
import Playlist from "./fetchPlaylist";
import addToPlaylist from "./addToPlaylist";


// drop-down list for tracks in playlist 
function SearchResult ({playlist,item}){
 const [isOpen,setIsOpen] = useState(false);
    return ( 
    <div className="result-card">
                <h1>{item.snippet.title}</h1>
                <img src={item.snippet.thumbnails.default.url}></img>
                <button className="secondary-button" onClick={()=>{setIsOpen(true)}}>Add to playlist </button>
                 {
      isOpen && (
       <ul className="add-dropdown">
          {playlist.map(p => (
            <li key={p.id} onClick={() => {
               addToPlaylist(item,p.id)
              setIsOpen(false);
            }}>
              {p.snippet.title}
            </li>
          ))}
        </ul>
      )
    }  
            </div>
      
 )
}

export default SearchResult;