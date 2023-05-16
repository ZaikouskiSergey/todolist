import {Checkbox} from "@mui/material";
import React, {ChangeEvent} from "react";

type SuperCheckBoxType = {
    isDone: boolean
    callback: (changeEvent:boolean) => void

}
export const SuperCheckBox: React.FC<SuperCheckBoxType>= ({isDone, callback}) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
       callback(e.currentTarget.checked)
    }
    return (
        <Checkbox
            checked={isDone}
            onChange={onChangeHandler}
        />
    )
}