
 


 async function refreshToken (){
 const params = new URLSearchParams ({
  'client_id': import.meta.env.VITE_YOUTUBE_CLIENT_ID,
  'client_secret':  import.meta.env.VITE_YOUTUBE_CLIENT_SECRET,
  'refresh_token': localStorage.getItem('refresh_token'),
  'grant_type': 'refresh_token'
        })
   if(Date.now() > Number(localStorage.getItem('expires_at'))){

    try {
      let response = await fetch('https://oauth2.googleapis.com/token',{
        method:'POST',
        body:params
     })
     if(!response.ok) throw new Error('Mission Failed')
     let jsonResponse = await response.json()

     localStorage.setItem('access_token',jsonResponse.access_token)
     let expiresAt = Date.now() + jsonResponse.expires_in * 1000
     localStorage.setItem('expires_at',expiresAt)

      return localStorage.getItem('access_token');

    }catch(error){
      console.error('error:',error)
    } 

   } else {
     return localStorage.getItem('access_token');
   }
}

export default refreshToken