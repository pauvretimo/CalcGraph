This is a simple Graphing Calculator in Grain Language.

To test it you will need : 
 - [node and npm](https://nodejs.org/en/)
 - [Grain](https://grain-lang.org/docs/getting_grain)

First you need to compile Calculator.gr :
`grain.gr Calculator.gr`
It will create a Calculator.gr.wasm file

Then install WASI and fs from npm :
`npm install @wasmer/wasi fs`

Now you can run Calculator.js with node, I am still coding an interface.