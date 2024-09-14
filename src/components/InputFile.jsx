import { useState } from 'react';
import MusicList from "./MusicList"
import PlayList from "./PlayList"

// We need to be able to save playlists in a profile and be able to 
// bring them back when loaded again.
// Also we need to be able to create multiple playlists.


const InputFile = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [songs, setSongs] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [accessToken, setAccessToken] = useState('');
    const [saveList, setSaveList] = useState([]);

    const clientId = 'Your client Id';
    const clientSecret = 'Your client secret';
    // Go to Spotify for devs to get these credentials

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
        setSearchTerm('');
    }

    const addToPlaylist = (song) => {
        setPlaylist([...playlist, song]);
    }

    const removeFromPlaylist = (songId) => {
        setPlaylist(playlist.filter(song => song.id !== songId));
    }

    // adding in functionality to save our playlists
    const savePlayList = () => {
        localStorage.setItem('savedPlaylist', JSON.stringify(saveList))
    }

    return (
        <div>
            <div className="flex items-center w-full mt-10 justify-center">
                <input 
                    type="text" 
                    placeholder="Search songs, artists, or albums" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-3 rounded-md w-4/5 sm:w-2/3 md:w-1/2 lg:w-1/3 opacity-50" />
                <button 
                    className="p-2 ml-2 bg-blue-400 text-white rounded-md border border-blue-600 transform active:scale-95 transition-transform duration-150"
                    onClick={searchSpotify}
                >
                    Search
                </button>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
            </div>
            {!loading && !error && (
                <div className="flex justify-center p-5 h-full mt-20">
                <MusicList songs={songs} addToPlaylist={addToPlaylist} />
                <PlayList playlist={playlist} removeFromPlaylist={removeFromPlaylist} />
            </div>
            )}
        </div>
    )
}

export default InputFile
