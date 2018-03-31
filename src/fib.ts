export function fib(n: i32): i32 {
  let i: i32, t: i32, a: i32 = 0, b: i32 = 1;
  for (i = 0; i < n; i++) {
    t = a + b; a = b; b = t;
  }
  return b;
}

export function addTwo(num: i32): i32 {
  return num + 2;
}
