import Header from "./components/Header"
import MusicList from "./components/MusicList"
import PlayList from "./components/PlayList"


function App() {

  return (
    <>
    <div className="bg-slate-500">
      <div className="h-[100px]">
          <Header />
      </div>
      <div className="flex flex-row h-screen">
        <MusicList />
        <PlayList />
      </div>
    </div>
    </>
  )
}

export default App
