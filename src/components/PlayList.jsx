import { useState } from "react";


const PlayList = ({ playlist, removeFromPlaylist }) => {

    const [nameList, setNameList] = useState('');
    const [saveList, setSaveList] = useState(false);

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
                className="mt-1 p-1 rounded-md opacity-50 w-[140px] h-[30px] text-black" />
            <button
            className="h-8 px-4 mt-1 text-sm bg-blue-400 text-white rounded-md border border-blue-600 transform active:scale-95 transition-transform duration-150">
                Save
            </button>
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
                <p>No Songs in the playlist.</p>
            )}
            </div>
        </>
    );
};

export default PlayList