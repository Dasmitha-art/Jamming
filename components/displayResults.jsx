import fetchPlaylist from "../features/fetchPlaylist"
import SearchResult from "../features/searchResult"

//is taking ina componenet to display the results from the search for tracks 
function DisplayResults({results,playlist}){
 return(
    <div className="results-grid">
     {
        results.map(item=> (
            //component mentioned 
           
             <SearchResult key={item.id.videoId} item={item} playlist={playlist} />
            
           ) 

        )
     }
    
    </div>
 )
}

export default DisplayResults