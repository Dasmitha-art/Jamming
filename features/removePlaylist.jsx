
import refreshToken from "../src/services/refreshToken"

async function removePlaylist (playlistId,setPlaylist){
  let accessToken = await refreshToken();
    fetch(`https://www.googleapis.com/youtube/v3/playlists?id=${playlistId}`,{
        method:'DELETE',
        headers:{
            'Authorization':`Bearer ${accessToken}`
        }
    }).then(response=>{
      if(response.ok){
        setPlaylist(prevItem=> prevItem.filter(item=>item.id !== playlistId))
      } else {
        throw new Error('mission failed')
      }
    })
}


export default removePlaylist