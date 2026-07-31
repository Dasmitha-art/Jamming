import { useState } from "react"
import Playlist from "../features/fetchPlaylist"
import removeTrack from "../features/removeTrack";
import removePlaylist from "../features/removePlaylist";
import renamePlaylist from "../features/renamePlaylist";
import refreshToken from "../src/services/refreshToken";

// displaying the playlist and depending on the state drop-downs the tracks inside 
function PlaylistCard ({playlist,setPlaylist,listOfPlaylists}){
const [isOpen,setIsOpen] = useState(false)
const [tracks,setTracks] = useState([]);
const [isRenaming,setIsRenaming] = useState(false);
const [renameValue,setRenameValue] = useState('');

async function handleClick ()  {
   let accessToken = await refreshToken()
    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlist.id}`,{
   headers :{
    'Authorization':`Bearer ${accessToken}`
   }
  })
    .then(response=>{
        if(response.ok){
           return response.json()
        } else {
            throw new Error('Mission failed')
        }
    }).then(jsonResponse=>{
       
       setTracks(jsonResponse.items)
    })
}

   return (
     
       
        <div className="playlist-card" onClick={()=>{
            handleClick()
            setIsOpen(true)
        }}>
        <div className="playlist-card-header" >
        <img src={playlist.snippet.thumbnails.default.url}></img>

        <div className="playlist-card-title">
           <h1>{playlist.snippet.title}</h1>
        </div>

        <div className="playlist-card-actions">
           <button onClick={(e)=>{
             e.stopPropagation()
             setIsRenaming(true);
            
           }}>Rename</button>
           <button onClick={(e)=>{
              e.stopPropagation()
            removePlaylist(playlist.id,setPlaylist) 
          }}>Remove Playlist </button>
          </div>
          </div>
         {
            isOpen && (
             <ul className="track-list">
             { tracks.map(track=>(
                
                    <li key={track.id} className="track-row" >
                         <img src={track.snippet.thumbnails.default.url}   ></img>
                        <p>{track.snippet.title}</p>
                       
            
                        <button className="danger-button" onClick={(e) => {
                         e.stopPropagation()
                        removeTrack(track.id,setTracks)}}> Remove from playlist </button>
                    </li>
                
               ))
            }
            </ul>
            )
         }
         {
            isRenaming && (
               <div className="rename-row">
                <input className="text-input" onClick={(e) => e.stopPropagation()} 
                onChange={(e)=>{
                    e.stopPropagation()
                    setRenameValue(e.target.value)}}></input>
                <button  className="primary-button" onClick={(e)=>{
                    e.stopPropagation()
                    renamePlaylist(listOfPlaylists,renameValue,setPlaylist,playlist)
                    setIsRenaming(false)
                }}>Confirm</button>
               </div>
            )
         }
        </div>
    
   )
}

export default PlaylistCard