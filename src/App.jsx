import Header from "./components/Header"
import InputFile from "./components/InputFile"


function App() {

  return (
    <>
    <div className="bg-slate-500 flex flex-col h-screen">
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
