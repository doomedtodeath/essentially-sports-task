import {TextField, InputAdornment} from "@mui/material";
import {SearchRounded} from "@mui/icons-material";
import AppContext from "../../public/AppContext";
import {useContext} from "react";
import {filter} from "lodash";

export default function Menu(){

    const globalState = useContext(AppContext);

    function search(event) {
        console.log(event);
        if (event.key !== 'Enter' || event.target.value === '') {
            return;
        }
        if (globalState.state.fullData && globalState.state.fullData.items) {
            const data = filter(globalState.state.fullData.items, (item) => item.categories.includes(event.target.value))
            globalState.setData({
                ...globalState.state.data,
                items: data
            })
        }
    }

    return (
        <TextField style={{width: "100%"}} id="outlined-basic" variant="outlined"
                   InputProps={{
            startAdornment: <InputAdornment position="start"><SearchRounded/></InputAdornment>}} onKeyUp={search} />
    )

}
