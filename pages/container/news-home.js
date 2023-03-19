import NewsLatest from "./news-latest";
import {Chip, List, ListItem, ListItemText, Typography} from "@mui/material";
import {useRouter} from "next/router";
import {useContext, useEffect, useState} from "react";
import RSSParser from "rss-parser";
import AppContext from "../AppContext";
import {cloneDeep, filter} from "lodash";


export default function NewsHome(){
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    const router = useRouter();
    const globalState = useContext(AppContext);
    useEffect(() => {
        let parser = new RSSParser();
        parser.parseURL(CORS_PROXY + 'https://www.essentiallysports.com/feed/', function(err, feed) {
            if (err) throw err;
            console.log('##########', router);
            const clonedFeed = cloneDeep(feed)
            globalState.setFullData(feed);
            globalState.setIsLoaded(true);
            if (router.query['category'] && router.query['category'] !== 'All'){
                clonedFeed.items = filter(clonedFeed.items, (item) => item.categories.includes(router.query['category']))
            }
            globalState.setData(clonedFeed);
        })
    }, [])

    return (
        <div style={{margin: '1rem'}}>
             <NewsLatest/>
        </div>
    )
}
