import { SelectedTMContext } from "./SelectedTMContext";
import { useContext } from "react";

export const useSelectedTMContext = () => {
    const context = useContext(SelectedTMContext)

    if(!context) {
        throw Error('useSelectedTMContext must be used inside an SelectedTMContextProvider')
    }
    return context
}