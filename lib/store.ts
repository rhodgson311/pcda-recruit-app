// Placeholder store so '@/lib/store' resolves during build
export type AppStore = Record<string, unknown>;
const store: AppStore = {};
export default store;
export const getState = () => store;
