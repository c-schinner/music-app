
const MusicList = ({ songs, addToPlaylist }) => {


    return (
        <>
            <div className="h-full w-1/2 mx-auto text-white">
                <h2 className="text-2xl font-semibold mb-4">Music List:</h2>
                {songs.length > 0 ? (
                    <ul className="space-y-4">
                        {songs.map((song) => (
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
                                className="bg-green-500 text-white px-3 py-1 rounded"
                                onClick={() => addToPlaylist(song)}
                                >
                                    +
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Try searching for something.</p>
                )}
            </div>
        </>
    )
}

export default MusicList