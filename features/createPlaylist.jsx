
import refreshToken from "../src/services/refreshToken"


//playlist creation is happening 
  async function postPlaylist(playlistName,setPlaylist,setIsCreating){
    setIsCreating(true)
        try {
            let accessToken = await refreshToken()
            let response = await fetch('https://www.googleapis.com/youtube/v3/playlists?part=snippet,status',{
                method : 'POST',
                headers:{
                    'Authorization' : `Bearer ${accessToken}`,
                    'content-type' : 'application/json'
                },
                body: JSON.stringify({
                    'snippet':{'title':`${playlistName}`,'description':"Created with Jamming"},
                    'status' : {'privacyStatus':"private"}
                })
            })
            if(!response.ok) throw new Error ("mission failed")
            const jsonResponse = await response.json()
            
            setPlaylist(prevPlaylists => [...prevPlaylists, jsonResponse]);
        } catch (error){
           console.error('Error fetching data:', error);
        } finally {
            setIsCreating(false)
        }

    }


export default postPlaylist;