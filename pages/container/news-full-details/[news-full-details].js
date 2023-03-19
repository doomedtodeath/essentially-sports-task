import {useRouter} from "next/router";
import {useEffect, useState, useContext} from "react";
import RSSParser from "rss-parser";
import {find} from 'lodash'
import AppContext from "../../../public/AppContext";
import {Box, CircularProgress, Typography} from '@mui/material'
import '../../../styles/NewsFullDetails.module.css';


export default function NewsFullDetails() {
    const router = useRouter()
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    let [data, setData] = useState();
    let filteredFeed;
    const globalState = useContext(AppContext);
    useEffect(() => {

        globalState.setIsLoaded(false);
        if (router.isReady) {
            let parser = new RSSParser();
            parser.parseURL(CORS_PROXY + 'https://www.essentiallysports.com/feed/', function (err, feed) {
                if (err) throw err;
                filteredFeed = find(feed.items, (item) => item.guid.includes(router.query['news-full-details']));
                if (!!filteredFeed) {
                    setData(filteredFeed)
                }
                globalState.setData(feed)
                globalState.setFullData(feed)
                globalState.setIsLoaded(true);
            })
        }
    }, [router.isReady]);

    console.log(data);

    const res = data && data['content:encoded'] ? data['content:encoded'] : [];
    return (
        globalState.state.isLoaded ?
            <div>
                {res && res.length ?
                <div style={{width: '100%', margin: '1rem'}}>
                    <Typography variant="h4">{data.title}</Typography>
                    <Typography dangerouslySetInnerHTML={{__html: res}}/>

                    <style jsx global>{`
                      img {
                        max-width: 100% !important;
                        height: 100% !important;
                      }

                      figure {
                        width: 90% !important;
                        height: 100% !important;
                      }
                    `}</style>
                </div> : <span>Page not found</span>}</div> : (<Box sx={{display: 'flex', width: '100%', height: '100vh', alignItems: "center", justifyContent: "center"}}>
                <CircularProgress/>
            </Box>)
    )
}
