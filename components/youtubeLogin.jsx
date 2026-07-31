
import { generateCodeVerifier,generateCodeChallenge } from "../src/services/youtubeAuth";
import { useEffect,useRef, useState} from "react";
 import Welcome from "./welcome";
// is loggin in 



function YoutubeLogin (){

let [token, setToken] = useState();

const clientId =  import.meta.env.VITE_YOUTUBE_CLIENT_ID;

async function handleLogin (){
  const verifier = generateCodeVerifier();
  let challenge = await generateCodeChallenge(verifier);

  localStorage.setItem('verifier', verifier);

  const params = new URLSearchParams({
     'client_id' : clientId,
     'response_type':'code',
     'redirect_uri' : window.location.origin,
      'code_challenge_method': 'S256',
      'code_challenge' : challenge,
      'scope' : 'https://www.googleapis.com/auth/youtube',
      'access_type': 'offline'
  })

window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

}

// getting the access token once the page mounts 
const hasRun = useRef(false);
useEffect(()=>{
    if (hasRun.current) return;
    hasRun.current = true;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    if (code) {
    const tokenParams = new URLSearchParams ({
        'client_id' : clientId,
         'grant_type': 'authorization_code',
          'code': code ,
          'redirect_uri' : window.location.origin,
          'code_verifier' : localStorage.getItem('verifier'),
          'client_secret': import.meta.env.VITE_YOUTUBE_CLIENT_SECRET
    
     })
    
    fetch ('https://oauth2.googleapis.com/token',{
        method:'POST',
        body:tokenParams
    }).then(response=>{
        if(response.ok){
           return response.json()
        } else {
            throw new Error('Request failed')
        }
    }).then(jsonResponse=>{
        let accessToken = jsonResponse.access_token;
        let refreshToken = jsonResponse.refresh_token;
        let expiresIn = jsonResponse.expires_in;
        localStorage.setItem('access_token',accessToken);
        localStorage.setItem('refresh_token',refreshToken);
        localStorage.setItem('expires_in',expiresIn)
        setToken(true)

const expiresAt = Date.now() + (expiresIn * 1000);
localStorage.setItem('expires_at', expiresAt);

        window.history.replaceState({}, document.title, '/')
    })
    } else {
    if(localStorage.getItem('access_token')){
        setToken(true)
    } else {
        setToken(false)
    }
}
    },[])



    return (
        <>
         {token? <Welcome/> : <button   className="login-button" onClick={handleLogin}>Jamming</button>}
        
        </>
    )
}

export default YoutubeLogin;