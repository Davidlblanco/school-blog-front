import MainProvider from './contexts/useMainContext.tsx';
import IsLoggedIn from './IisLoggedIn.tsx';

function App() {
    return (
        <MainProvider>
            <IsLoggedIn />
        </MainProvider>
    );
}

export default App;
