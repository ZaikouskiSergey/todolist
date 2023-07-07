export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type initialAppStateType = {
    status: RequestStatusType,
    error: string | null
}

export type ActionsType = SetAppStatusAC | SetAppErrorAC

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null
}

export const appReducer = (state: initialAppStateType = initialState, action: ActionsType): initialAppStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}
export type SetAppStatusAC = ReturnType<typeof setAppStatusAC>
export type SetAppErrorAC = ReturnType<typeof setAppErrorAC>
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)