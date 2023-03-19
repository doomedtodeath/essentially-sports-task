import Menu from "./menu";
import Categories from "./categories";
import {Container, Box} from "@mui/material";

export default function Layout( {children} ) {


    return (
        <Container>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", margin: '1rem'}}>
            <Menu />
            <div style={{display: "flex", maxWidth: "100%"}}>
                <Box sx={{display: {xs: 'none', md: 'block'}}}>
                    <Categories/>
                </Box>
                {children}
            </div>
        </div>
        </Container>
    )
}
