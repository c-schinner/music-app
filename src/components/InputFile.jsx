import { useState } from 'react';
import MusicList from "./MusicList"
import PlayList from "./PlayList"



const InputFile = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [songs, setSongs] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [accessToken, setAccessToken] = useState('');

    const clientId = 'e59d2b167a764ea19850debe44ebea90';
    const clientSecret = '83fbe50af7f64efc894a4317ed737bee';

    const getAccessToken = async () => {
        if (accessToken) return accessToken;

        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
            },
            body: 'grant_type=client_credentials'
        });

        const data = await response.json();
        setAccessToken(data.access_token);
        return data.access_token;
    }

    const searchSpotify = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = await getAccessToken();
            const response = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to load information.');
            }

            const data = await response.json();
            setSongs(data.tracks.items);

        } catch (e) {
            setError(e.message);
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