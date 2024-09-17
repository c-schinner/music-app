
const PlayList = ({ playlist, removeFromPlaylist }) => {

    return (
        <>
            <div className="w-full sm:w-1/2 mx-auto text-white ml-10 p-4">
            <h2 className="text-2xl font-semibold mb-4">Play List:</h2>
            {playlist.length > 0 ? (
                <ul className="space-y-4">
                    {playlist.map((song) => (
                        <li key={song.id} className="border-b pb-2 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <img 
                            src={song.album.images[0].url}
                            alt={song.album.name}
                            className="w-16 h-16 object-cover rounded"
                        />
                            <div className="flex-grow text-center sm:text-left">
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
                <p>No songs in the playlist</p>
            )}
            </div>
        </>
    );
};

export default PlayList