import {ChangeEvent, FC, useState} from "react";

export type EditableSpanPropsType = {
    title: string
    classes?: string
    changeTitle: (title: string) => void
}
export const EditableSpan: FC<EditableSpanPropsType> = ({title, classes,changeTitle}) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [localTitle, setLocalTitle] = useState<string>(title)
    const onEditMode = () => setIsEditMode(true)
    const offEditMode = () => {
        changeTitle(localTitle)
        setIsEditMode(false)
    }
    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
    }

    return (
        isEditMode
            ? <input
                value={localTitle}
                autoFocus
                onBlur={offEditMode}
                onChange={setLocalTitleHandler}
            />
            : <span
                onDoubleClick={onEditMode}
                className={classes}
            >{title}</span>

    )
}