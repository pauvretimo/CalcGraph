import { Suspense, createResource, createSignal, onCleanup, onMount } from "solid-js";
import { init, WASI } from "@wasmer/wasi";
import wasm from "./Calculator.gr.wasm?raw";

const call_culator = async (str) => {

    await init();
    const wasi = new WASI({
        env: {},
        args: str.split(' '),
    });
    const module = await WebAssembly.compile(wasm);
    wasi.instantiate(module, {});
    wasi.start();
    //console.log("stdout : ", wasi.getStdoutString());
    let resp = wasi.getStdoutString()
    return resp
}

const drawCanevas = (array, rect) => {
    
    const canvas = document.getElementById("Canvas1");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (array) {
    const n = array.length
    const mi = Math.min(...array)
    const ma = Math.max(...array)
    ctx.beginPath();
    ctx.moveTo(0, rect.height - ((array[0] - mi) / (ma - mi)) * rect.height)

    array.forEach((f, i) => {
        const x = i / n * rect.width
        const y = rect.height - ((f - mi) / (ma - mi)) * rect.height
        ctx.lineTo(x, y)
    })
    }
}

export default function Graphing (props) {
    const [rect, setRect] = createSignal({
        height: window.innerHeight ? window.innerHeight : 500,
        width: window.innerWidth ? window.innerWidth : 500
      });
      if (props.equation == null || props.equation.trim() == ""|| props.equation == undefined) {
        props.equation = "X"
      }
      if (props.start == null || props.start == undefined) {
        props.start = 0
      }
      if (props.end == null || props.end == undefined) {
        props.end = 1000
      }
      if (props.steps == null || props.steps == undefined) {
        props.steps = 1
      }

      const [formula, setFormula] = createSignal(props.equation);
      const [st, setStart] = createSignal(props.start);
      const [nd, setStop] = createSignal(props.end);
      const [p, setSteps] = createSignal(props.steps);
      const [data] = createResource((formula() + " " + st() + " " + nd() + " " + p()),  call_culator) 
      console.log(formula() + " " + st() + " " + nd() + " " + p())

      const handler = () => {
        setRect({ height: window.innerHeight, width: window.innerWidth });
        drawCanevas(data(), rect())
      };
    
      onMount(() => {
        window.addEventListener('resize', handler);
        drawCanevas(data(), rect())
      });
    
      onCleanup(() => {
        window.removeEventListener('resize', handler);
      })
     

    
    return (
        <>
        <span>{data.loading && "loading..."}</span>
            <canvas 
                id={"Canvas1"}
                width={rect().width}
                height={rect().height}
            />
            <pre>{data()}</pre>
        </>
    )
}


//Graphing("X*cos(X)+pi", 0, 1000000, 1)

//to test : 
// - sin(pi)^2