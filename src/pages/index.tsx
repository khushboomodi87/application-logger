import { Container, Typography, Grid } from '@mui/material';

export default function Index() {
  return <Container>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome To Application Logger
        </Typography>
      </Grid>
    </Grid>
  </Container>;
}
