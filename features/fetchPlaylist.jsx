import { useEffect, useState } from "react";
import PlaylistCard from "../components/PlaylistCard";
import refreshToken from "../src/services/refreshToken";

// fetching the playlists available on the account 

function Playlist({setPlaylist,playlists}){
const [isFetchingPlaylist,setIsFetchingPlaylist] = useState(true);
  useEffect ( ()=>{
async function fetchPlaylist () {
 try {
  let accessToken = await refreshToken();
  let response = await fetch('https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true',{
   headers :{
    'Authorization':`Bearer ${accessToken}`
   }
  }) 
   if(!response.ok) throw new Error('Mission failed');
   const jsonResponse = await response.json();
   
   setPlaylist(jsonResponse.items)
  } catch(error){
    console.error('Error fetching data:', error);
  }finally {
    setIsFetchingPlaylist(false)
  }



}
fetchPlaylist();

},[])

  return (
    <>
    {isFetchingPlaylist&& <h1>fetching your playlists...</h1>}
    <h1>Playlist</h1>
   {
    playlists.map(playlist=>(
       // component to display drop down tracks of the playlist 
        <PlaylistCard key={playlist.id} playlist={playlist} setPlaylist={setPlaylist} listOfPlaylists={playlists}/>
    ))
   }
   </>
  
  )

}

export default Playlist