(() => {
  const TOTAL_CASES = 1000000;

  function fib(n) {
    let i, t, a = 0, b = 1

    for (i = 0; i < n; i++) {
      t = a + b; a = b; b = t;
    }

    return b
  }

  function calcjs() {
    console.time('js');

    for (let i = 0; i < TOTAL_CASES; i++) {
      fib(5);
    }

    console.timeEnd('js');
  }

  function calcwasm(mod) {
    console.time('wasm')

    for (let i = 0; i < TOTAL_CASES; i++) {
      mod.fib(5);
    }

    console.timeEnd('wasm')
  }

  const worker = new Worker('./ww.js')
  const ww = n => new Promise(res => {
    worker.onmessage = e => res(e.data.result);
    worker.postMessage({ n })
  })

  async function calcww() {
    console.time('ww: 1000')

    for (let i = 0; i < 1000; i++) {
      await ww(5);
    }

    console.timeEnd('ww: 1000')
  }

  const onload = async () => {
    const binary = await fetch('./fib.wasm')
    const bytes = await binary.arrayBuffer()
    const instance = await WebAssembly.instantiate(bytes)
    const mod = instance.instance.exports

    calcww();
    calcjs();
    calcwasm(mod);
  };

  window.addEventListener('load', onload);
})();
