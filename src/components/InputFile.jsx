import { useState } from 'react';
import MusicList from "./MusicList"
import PlayList from "./PlayList"



const InputFile = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [songs, setSongs] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchSpotify = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(``);
            if (!response.ok) {
                throw new Error('Failed to load information.')
            }
            const data = await response.json();
            setSongs(data.tracks.itsm);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }

    return (
        <div>
            <div className="flex items-center w-full mt-10">
                <input 
                    type="text" 
                    placeholder="Search songs, artists, or albums" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-3 rounded-md w-4/5 mx-auto opacity-50" />
                <button 
                    className="w-1/5 p-2 ml-2 bg-blue-400 text-white rounded-md border border-blue-600 transform active:scale-95 transition-transform duration-150"
                    onClick={searchSpotify}
                >
                    Search
                </button>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
            </div>
            {!loading && !error && (
                <div className="flex justify-center p-5 h-full mt-20">
                <MusicList songs={songs} />
                <PlayList playlist={playlist} setPlaylist={setPlaylist} />
            </div>
            )}
        </div>
    )
}

export default InputFile