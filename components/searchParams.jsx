
//looking for the tracks based on the value in the search bar 
async function searchTracks(e,setResults,setIsSearching,debounceTimer){

   clearTimeout(debounceTimer.current)
    const searchTerm = e.target.value
debounceTimer.current = setTimeout( async ()=>{
   setIsSearching(true)
       const params = new URLSearchParams({
         'part' : 'snippet',
        'q':searchTerm,
        'type': 'video',
        'maxResults':'40',
        'key': import.meta.env.VITE_YOUTUBE_API_KEY 

    })
    const url = `https://www.googleapis.com/youtube/v3/search?${params.toString()}`
  
   try {
      const response = await fetch(url);
   if (!response.ok) throw new Error(`Status: ${response.status}`);
   const jsonResponse = await response.json();
   console.log(jsonResponse)
   setResults(jsonResponse.items);
   } catch (error) {
        console.error('Error fetching data:', error);
   } finally {
      setIsSearching(false)
   }
},400)

}

export default searchTracks;