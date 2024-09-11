import MusicList from "./MusicList"
import PlayList from "./PlayList"



const InputFile = () => {
    return (
        <div>
            <div className="flex items-center w-full">
                <input 
                    type="text" 
                    placeholder="Search songs, artists, or albums" 
                    className="p-3 rounded-md w-4/5 mx-auto" />
                <button className="w-1/5 p-2 ml-2 bg-blue-400 text-white rounded-md border border-blue-600 transform active:scale-95 transition-transform duration-150">
                    Search
                </button>
            </div>
            <div className="flex justify-center p-5 gap-x-40 h-full">
                <MusicList />
                <PlayList />
            </div>
        </div>
    )
}

export default InputFile