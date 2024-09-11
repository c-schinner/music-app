import MusicList from "./MusicList"
import PlayList from "./PlayList"



const InputFile = () => {
    return (
        <div>
            <div className="flex items-center w-full mt-10">
                <input 
                    type="text" 
                    placeholder="Search songs, artists, or albums" 
                    className="p-3 rounded-md w-4/5 mx-auto opacity-50" />
                <button className="w-1/5 p-2 ml-2 bg-blue-400 text-white rounded-md border border-blue-600 transform active:scale-95 transition-transform duration-150">
                    Search
                </button>
            </div>
            <div className="flex justify-center p-5 h-full mt-20">
                <MusicList />
                <PlayList />
            </div>
        </div>
    )
}

export default InputFile