import { State, StateCreator, GetState, StoreApi } from "zustand";
import produce from "immer";

export const withImmer =
    <PrimaryState extends State, SecondaryState extends State>(
        initialState: PrimaryState,
        createState: (
            set: (fn: (draftState: PrimaryState) => void) => void,
            get: GetState<PrimaryState>,
            api: StoreApi<PrimaryState>
        ) => SecondaryState
    ): StateCreator<PrimaryState & SecondaryState> =>
    (set, get, api) =>
        Object.assign(
            {},
            initialState,
            createState(
                (fn) => set((baseState) => produce(baseState, fn)),
                get as GetState<PrimaryState>,
                //@ts-ignore
                api as StoreApi<PrimaryState>
            )
        );
