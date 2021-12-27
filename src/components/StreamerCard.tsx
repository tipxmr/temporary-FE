import { Card, CardContent, Typography } from "@mui/material"

function StreamerCard({ streamer }: any) {

    const { name } = streamer

    return (
        <Card>
            <CardContent>
                <Typography variant='h2' align="center">
                    {name}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default StreamerCard
