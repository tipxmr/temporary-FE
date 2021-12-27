import { Box } from "@mui/material";

const HorizontalCentering = ({ children }: any) => {
    return (
        <div>
            <Box
                sx={{
                    mx: 'auto',
                    p: 1,
                    m: 1,
                    borderRadius: 1,
                    textAlign: 'center',
                }}
            >
                {children}
            </Box>
        </div>
    );
}

export default HorizontalCentering
