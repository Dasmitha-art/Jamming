
import refreshToken from "../src/services/refreshToken";


// removes track with the playlistItem id 
async function removeTrack (playlistItemId,setTracks){
    try {
        let accessToken = await refreshToken()
        const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?id=${playlistItemId}`,{
            method:'DELETE',
            headers:{
                'Authorization':`Bearer ${accessToken}`
            }
        })
        if(!response.ok) throw new Error('Mission Failed!')
    setTracks(prevTracks => prevTracks.filter(track => track.id !== playlistItemId));
    } catch(error){
        console.error('Error is :', error)
    }
}

export default removeTrack