import {Dispatch} from "redux";
import {setAppErrorAC, SetAppErrorAC, setAppStatusAC, SetAppStatusAC} from "../app/app-reducer";

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType ,error:string) => {
    dispatch(setAppErrorAC(error))
    dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetAppStatusAC |SetAppErrorAC>