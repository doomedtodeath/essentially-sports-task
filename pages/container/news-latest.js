import NewsCard from "./news-card";
import AppContext from "../AppContext";
import {useContext} from 'react'
import {Box, CircularProgress} from "@mui/material";

export default function NewsLatest(){
    let latestNews = useContext(AppContext)
    let news = latestNews.state.data;
    console.log(news);
    return (
        <div>
            {latestNews.state.isLoaded ?
                <div>
                    {news && news.items && news.items.length ? news.items.map((news) => (
                        <div style={{marginTop: "1rem", marginBottom: "1rem"}} key={news.guid}>
                            <NewsCard data={news}/>
                        </div>
                    )) : <span>Page Not Found</span>}
                </div>
                :
                <Box sx={{display: 'flex'}}>
                    <CircularProgress/>
                </Box>}
        </div>
    )
}
