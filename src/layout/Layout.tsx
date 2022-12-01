import { styled } from '@mui/material/styles';
import {
    Container,
    Box,
    CssBaseline,
} from '@mui/material/';
import Topbar from './topbar/Topbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type mainProps = {
    mainPage: JSX.Element;
};
const Main = styled('main')<{}>(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
}));

const Header = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),

    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Layout(props: mainProps) {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Topbar />
            <Main>
                <Header />
                <Container maxWidth="xl">{props.mainPage}</Container>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover
                    theme="colored"
                />
            </Main>
        </Box>
    );
}
