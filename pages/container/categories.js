import {List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import {filter, uniq} from "lodash";
import AppContext from "../AppContext";
import {useContext} from "react";
import {useRouter} from "next/router";


export default function Categories(props) {
    let categories = ['All'];
    const globalState = useContext(AppContext);
    const router = useRouter();
    let selectedCategory = '';
    console.log(router);
    if (globalState.state.fullData && globalState.state.fullData.items) {
        globalState.state.fullData.items.map((data) => categories = [...categories, ...data.categories]);
        categories = uniq(categories)
    }

    function selectCategory(index) {
        selectedCategory = categories[index];
        if (!selectedCategory) {
            return;
        }
        if (!router.asPath.includes('news-full-details')) {
            const data = globalState.state.fullData;
            if (selectedCategory === 'All') {
                globalState.setData(globalState.state.fullData);
            } else if (data && data.items) {
                const filteredItems = filter(data.items, (item) => item.categories.includes(selectedCategory));
                globalState.setData({
                    ...data,
                    items: filteredItems
                });
            }
        } else {
            router.query.category = selectedCategory;
            router.push({pathname: '/container/news-home', query: {category: selectedCategory}})
        }
    }

    return (
        <div style={{marginTop: "1rem", marginBottom: "1rem", marginRight: "0.5rem", width: "100%", borderRight: "2px solid black"}}>
            {/*{categories.length ? categories.map((category, index) => <Chip sx={{mr: '0.2rem' }} key={category+index} label={category}/>) : null}*/}
            {globalState.state.isLoaded && categories.length >1 ? <Typography variant="subtitle1" color="text.secondary" component="div"
                                             sx={{color: "black"}}>Categories</Typography> : null}
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                {categories.map((category, index) => (
                    <ListItem
                        key={category}
                        disableGutters
                        onClick={selectCategory}
                    >
                        <ListItemButton
                            selected={selectedCategory === category}
                            onClick={() => selectCategory(index)}
                        >
                        <ListItemText primary={category}
                                      primaryTypographyProps={{fontSize: '0.8rem', color: "grey"}}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}
