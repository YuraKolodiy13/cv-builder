import React  from 'react'
import './App.scss'
import Info from "./components/Info/Info";
import Experience from "./components/Experience/Experience";
import Pdf from "react-to-pdf";

const App: React.FC = () => {
  const ref = React.createRef();
  return (
    <>
      <Pdf targetRef={ref} filename="document.pdf">
        {({toPdf}) => (
          <button onClick={toPdf} className="button">
            Generate PDF
          </button>
        )}
      </Pdf>
      <div className="App" ref={ref}>
        <Info/>
        <Experience/>
      </div>
    </>
  )
}

export default App
