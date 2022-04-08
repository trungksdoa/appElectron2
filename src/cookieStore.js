/*eslint-disable */
// @ts-ignore
export const cookie2 = {
  set: (name, value) => {
    window.electron.store.set(name, value);
  },
  get: (name) => {
    return window.electron.store.get(name);
  },
};
