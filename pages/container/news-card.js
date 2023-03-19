import {Card, Box, Typography, IconButton, CardContent, CardMedia, Chip, Button} from "@mui/material";
import Link from "next/link";
import {useRouter} from 'next/router';

export default function NewsCard(props) {
    const data = props.data;
    const router = useRouter();

    function getGUID(link) {
        let start = link.indexOf('?p=')
        let guid = ''
        if (start !== -1) {
            guid = link.slice(start + 3)
        }
        return 'container/news-full-details/' + guid;
    }

    function routeToNewsDetails(link) {
        let start = link.indexOf('?p=')
        let guid = ''
        if (start !== -1) {
            guid = link.slice(start + 3)
        }
        router.push({pathname: '/container/news-full-details/' + guid})
    }

    return (
        <div>
            {data && data.categories ?
                <Card sx={{display: 'flex'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <CardContent sx={{flex: '1 0 auto'}}>
                            <div style={{margin: '0.2rem'}}>
                                <Chip label={data.categories[0]}/>
                            </div>
                            <Button onClick={() => {
                                routeToNewsDetails(data.guid)
                            }} variant="text">
                                <Typography component="div" variant="h5" sx={{color: 'black'}}>
                                    {/*<Link href={getGUID(data.guid)} color="inherit">{data.title}</Link>*/}
                                    {data.title}

                                </Typography>
                            </Button>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {data.creator}, {new Date(data.pubDate).toDateString()}
                            </Typography>
                        </CardContent>
                        <Box sx={{display: 'flex', alignItems: 'center', p: 2}}>
                            <Typography variant="body2" color="text.secondary" component="div">
                                {data.contentSnippet}
                            </Typography>
                        </Box>
                    </Box>
                </Card>
                : null}
        </div>
    )
}
