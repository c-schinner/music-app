import Header from "./components/Header"
import InputFile from "./components/InputFile"
import musicpic from "./assets/musicpic.jpeg"


function App() {

  return (
    <>
    <div 
    className="flex flex-col h-screen"
    style={{
      backgroundImage: `url(${musicpic})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
    >
      <div className="h-[100px] p-10">
          <Header />
      </div>
      <div className="flex-grow">
        <InputFile />
      </div>
    </div>
    </>
  )
}

export default App