import { useEffect, useState } from "react";


const PlayList = ({ playlist, removeFromPlaylist }) => {

    const [nameList, setNameList] = useState('');
    const [savedPlaylists, setSavedPlaylists] = useState([]);

    useEffect(() => {
        const storedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
        setSavedPlaylists(storedPlaylists);
    }, []);

    const savePlaylist = () => {
        if (!nameList) return;

        const newPlaylist = {
            name: nameList,
            songs: playlist,
        }

        const updatedPlaylists = [...savedPlaylists, newPlaylist];
        setSavedPlaylists(updatedPlaylists);
        localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
        setNameList('');
    };

    return (
        <>
            <div className="h-full w-1/2 mx-auto text-white ml-10">
            <div className="flex flex-row space-x-2">
            <h2 className="text-2xl font-semibold mb-4">Play List:</h2>
            <input 
                type="text"
                placeholder="Create playlist"
                value={nameList}
                onChange={(e) => setNameList(e.target.value)}
                className="p-1 rounded-md opacity-50 w-[140px] h-[32px] text-black" />
            <button
            onClick={savePlaylist}
            className="h-8 px-4 text-sm bg-blue-400 text-white rounded-md border border-blue-600 transform active:scale-95 transition-transform duration-150">
                Save
            </button>
            </div>

            <div className="mt-5">
                <h3 className="text-md font-semibold">Saved Playlists:</h3>
                <select className="mt-2 p-2 rounded-md opacity-50">
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
            </div>
            
            {playlist.length > 0 ? (
                <ul className="space-y-4">
                    {playlist.map((song) => (
                        <li key={song.id} className="border-b pb-2 flex items-center space-x-4">
                            <img 
                            src={song.album.images[0].url}
                            alt={song.album.name}
                            className="w-16 h-16 object-cover rounded"
                        />
                            <div className="flex-grow">
                                <p className="text-lg font-bold">{song.name}</p>
                                <p className="text-sm">{song.artists.map(artist => artist.name).join(', ')}</p>
                                <p className="text-sm">{song.album.name}</p>
                            </div>
                            <button
                            className="bg-red-500 text-white px-3 py-1 rounded"
                            onClick={() => removeFromPlaylist(song.id)}
                            >
                                -
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p></p>
            )}
            </div>
        </>
    );
};

export default PlayList