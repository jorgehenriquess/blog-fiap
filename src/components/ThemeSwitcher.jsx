import { useTheme } from './ThemeProvider';

const ThemeSwitcher = () => {
    const { toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme}>
            Trocar Tema
        </button>
    );
};

export default ThemeSwitcher;
