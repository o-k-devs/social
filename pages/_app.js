/* eslint-disable react/prop-types */
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/globalStyles';
import colors from 'styles/colors';
import 'styles/fonts.css';

const theme = {
  colors,
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
