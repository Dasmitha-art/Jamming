import refreshToken from "../src/services/refreshToken";

async function renamePlaylist(listOfPlaylists,renameValue,setPlaylist,playlist){

try {
let accessToken = await refreshToken()
const response = await fetch ('https://www.googleapis.com/youtube/v3/playlists?part=snippet',{
    method:'PUT',
    headers:{
        'Authorization':`Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({
  id: playlist.id,
  snippet: {
    'title': renameValue,
    'description': playlist.snippet.description
  }
})
})
if(!response.ok) throw new error('mission failed')
const jsonResponse = await response.json();

setPlaylist(listOfPlaylists.map((item)=>{
    if(item.id===jsonResponse.id){
       return jsonResponse
    } else {
        return item
    }
}))

} catch(error){
 console.error('Error:',error)
}


}

export default renamePlaylist