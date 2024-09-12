

const MusicList = ({ songs }) => {


    return (
        <>
            <div className="h-full w-1/2 mx-auto text-black">
                <h2 className="text-2xl font-semibold mb-4">Music List:</h2>
                {songs.length > 0 ? (
                    <ul className="space-y-4">
                        {songs.map((song) => (
                            <li key={song.id} className="border-b pb-2">
                                <p className="text-lg font-bold">{song.name}</p>
                                <p className="text-sm">{song.artists.map(artist => artist.name).join(', ')}</p>
                                <p className="text-sm">{song.album.name}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No songs found. Try searching for something else!</p>
                )}
            </div>
        </>
    )
}

export default MusicList