import { useState, useEffect } from 'react';
import MusicList from "./MusicList"
import PlayList from "./PlayList"

const InputFile = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [songs, setSongs] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [accessToken, setAccessToken] = useState('');

    const [nameList, setNameList] = useState('');
    const [savedPlaylists, setSavedPlaylists] = useState([]);
    const [selectedPlaylistName, setSelectedPlaylistName] = useState('');

    const clientId = 'Your client ID';
    const clientSecret = 'Your client secret';
    // Go to Spotify for devs to get these credentials

    // Get our access tokenn to use with Spotify for the searching service
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

    // Use the access token to search Spotify adn retrieve our data
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

    // Add songs to our playlist
    const addToPlaylist = (song) => {
        if (!playlist.find(p => p.id === song.id)) {
            setPlaylist([...playlist, song]);
        }
    }

    // Remove songs from our playlist
    const removeFromPlaylist = (songId) => {
        setPlaylist(playlist.filter(song => song.id !== songId));
    }

    useEffect(() => {
        const storedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
        setSavedPlaylists(storedPlaylists);
    }, []);

    // Save the songs into a playlist
    const savePlaylist = () => {
        if (!nameList && !selectedPlaylistName) return;

        const updatedPlaylists = [...savedPlaylists];
        
        if (selectedPlaylistName) {
            const playlistIndex = updatedPlaylists.findIndex(pl => pl.name === selectedPlaylistName);
            if (playlistIndex !== -1) {
                updatedPlaylists[playlistIndex].songs = playlist;
            }
        } else {
            const newPlaylist = {
                name: nameList,
                songs: playlist,
            };
            updatedPlaylists.push(newPlaylist);
        }

        setSavedPlaylists(updatedPlaylists);
        localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
        setNameList('');
        setSelectedPlaylistName('');
    };

    const handleSelectedPlaylist = (e) => {
        const selectedName = e.target.value;
        if (selectedName === "") {
            setPlaylist([]);
            setSelectedPlaylistName("");
            return;
        }

        const selected = savedPlaylists.find(pl => pl.name === selectedName);
        const songs = selected ? selected.songs : [];
        setPlaylist(songs);
        setSelectedPlaylistName(selectedName);
    };

    // Delete our selected playlists
    const deletePlaylist = () => {
        if (!selectedPlaylistName) return;
        const updatedPlaylists = savedPlaylists.filter(pl => pl.name !== selectedPlaylistName);
        setSavedPlaylists(updatedPlaylists);
        localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
        setPlaylist([]);
        setSelectedPlaylistName('');
    };

    return (
        <div>
            <div className="flex flex-col items-center w-full mt-10">
                <div className="flex items-center space-x-2 w-full max-w-lg">
                    <input 
                        type="text" 
                        placeholder="Search songs, artists, or albums" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-3 rounded-md flex-grow opacity-50" />
                    <button 
                        className="p-2 ml-2 bg-blue-400 text-white rounded-md border border-blue-600 transform active:scale-95 transition-transform duration-150"
                        onClick={searchSpotify}
                    >
                        Search
                    </button>
                </div>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <div className="flex items-center mt-4 space-x-2">
                    <input 
                        type="text"
                        placeholder="Create playlist"
                        value={nameList}
                        onChange={(e) => setNameList(e.target.value)}
                        className="p-1 rounded-md opacity-50 w-[180px] h-[32px] text-black" />
                    <button
                        onClick={savePlaylist}
                        className=" ml-2 h-8 px-4 text-sm bg-blue-400 text-white rounded-md border border-blue-600 transform active:scale-95 transition-transform duration-150">
                            Save
                    </button>
                </div>

                <div className="flex flex-col items-center mt-4 space-y-2">
                    <h3 className="text-md font-semibold text-white">Saved Playlists:</h3>
                    <select className="mt-2 p-2 rounded-md opacity-50" onChange={handleSelectedPlaylist} value={selectedPlaylistName}>
                        <option value="" disabled>Select playlist</option>
                        {savedPlaylists.length > 0 ? (
                            savedPlaylists.map((playlist, index) => (
                                <option key={index} value={playlist.name}>
                                    {playlist.name}
                                </option>
                            ))
                        ) : (
                            <option>No playlists</option>
                        )}
                    </select>
                    <button 
                    onClick={deletePlaylist}
                    className="ml-2 bg-red-500 text-sm text-white p-2 rounded-md border border-red-600 transform active:scale-95 transition-transform duration-150">
                        Delete Playlist
                    </button>
                </div>
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
