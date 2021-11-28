const itemState$ = state => state.items.data;
const authState$ = state => state.auth.data;

export { itemState$, authState$ };
