(() => {
  const TOTAL_CASES = 1000000;

  function calcjs() {
    console.time('js');
    console.timeEnd('js');
  }

  function calcwasm(mod) {
    console.time('wasm');
    for (let i = 0; i < TOTAL_CASES; i++) {
      mod.fib(5);
    }
    console.timeEnd('wasm');
  }

  const onload = async () => {
    const binary = await fetch('./fib.wasm');
    const bytes = await binary.arrayBuffer();
    const instance = await WebAssembly.instantiate(bytes);
    const mod = instance.instance.exports;

    calcjs();
    calcwasm(mod);
  };

  window.addEventListener('load', onload);
})();
