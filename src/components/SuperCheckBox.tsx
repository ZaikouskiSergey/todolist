import {ChangeEvent} from "react";

type PropsType = {
    callBack: (newIsDone: boolean) => void
    isDone: boolean
}

export const SuperCheckBox = (props: PropsType) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callBack(event.currentTarget.checked)
    }
    return (
        <input type="checkbox" onChange={onChangeHandler} checked={props.isDone}/>
    )
}