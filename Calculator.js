import { init, WASI } from "@wasmer/wasi";
import fs from "fs";


function processStdout(stdout) {
    return stdout.trim();
  }



async function call_culator(str) {
    await init();
    const wasm = fs.readFileSync("Calculator.gr.wasm");
    const wasi = new WASI({
        env: {},
        args: [str],
    });
    const module = await WebAssembly.compile(wasm);
    await wasi.instantiate(module, {});
    wasi.start();
    console.log("stdout : ", wasi.getStdoutString());
}

call_culator("sin(X/pi)")