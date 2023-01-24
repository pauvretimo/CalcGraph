import styles from './App.module.css';
import Graphing from './Wasm/Calculator.jsx';
import { createSignal } from 'solid-js';


function App() {
  const [formula, setFormula] = createSignal("X");
  const [start, setStart] = createSignal(0);
  const [stop, setStop] = createSignal(1000);
  const [steps, setSteps] = createSignal(1);


  return (
    <div class={styles.App}>
        <div class={styles.CanevasDiv}>
          <Graphing equation={formula()} start={start()} stop={stop()} steps={steps()}/>
        </div>
        <div class={styles.InputBoxDiv}>
          <input
            placeholder='formula'
            type="text"
            id="formula"
            value={formula()}
            onChange={(e) => setFormula(e.currentTarget.value)}
          />
          <button onClick={() => {}}>&gt;</button>
        </div>
    </div>
  );
}

export default App;
