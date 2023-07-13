import React from 'react';
import TestButton from "./components/TestButton";
import Header from "./components/Header";

import './css/app.css'
import TrainingsButtonsComposer, {TrainingsButtonsComposerProps, ButtonProps} from "./components/TrainingsButtonsComposer";


let testAction1 = () => {
  (document.querySelector("body") as HTMLBodyElement)
      .style.backgroundColor = "blue"

}

let testAction2 = () => {
  (document.querySelector("body") as HTMLBodyElement)
      .style.backgroundColor = "red"

}

let testAction3 = () => {
  (document.querySelector("body") as HTMLBodyElement)
      .style.backgroundColor = "black"

}

const App: React.FC = () => {
  let bp: ButtonProps[] = [
    {
      text: "Button 1",
      action: testAction1
    },
    {
      text: "Button 2",
      action: testAction2
    },
    {
      text: "Button 3",
      action: testAction3
    }
  ]

  return (
    <div className="App" id='App'>
      Привет дарина!!
        <Header/>
        <TrainingsButtonsComposer buttonsProps={bp}/>
    </div>
  );
}

export default App;
