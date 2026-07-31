import refreshToken from "../src/services/refreshToken"

//adding tracks to the playlist 
async function addToPlaylist (item,playlistId) {
 const videoId = item.id.videoId
  try {
 let accessToken = await refreshToken()
   const response = await fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet',{
        method : 'POST',
        headers:{
            'Authorization':`Bearer ${accessToken}`,
            'Content-type' : 'application/json'
        },
        body:JSON.stringify({
            'snippet' :{
                'playlistId': `${playlistId}`,
                'resourceId':{
                    'kind':'youtube#video',
                    'videoId': `${videoId}`
                }
            }
        })
    })
    if(!response.ok) throw new Error('Mission failed')
    const jsonResponse = await response.json()
    
} catch (error) {
    console.error('Error fetching data:', error)
}
}

export default addToPlaylist