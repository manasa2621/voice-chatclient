import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import voiceImage from "../components/voice.jpg";

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Voice Chat</title>
        <meta name="description" content="Welcome to our voice communication app" />
        <link rel="icon" href="/favicon.ico" />
        <style>
          {`
            @keyframes fadeIn {
              0% { opacity: 0; }
              100% { opacity: 1; }
            }
            .animated-text {
              animation: fadeIn 2s ease-in-out;
            }
          `}
        </style>
      </Head>
      <body style={{ margin: 0, padding: 0, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Voice Chat
            </Typography>
            <Button color="inherit">
              <Link href="/login" passHref>
                <Typography variant="body1" style={{ color: 'white' }}>
                  Login
                </Typography>
              </Link>
            </Button>
            <Button color="inherit">
              <Link href="/register" passHref>
                <Typography variant="body1" style={{ color: 'white' }}>
                  Register
                </Typography>
              </Link>
            </Button>

          </Toolbar>
        </AppBar>
        <Container component="main" sx={{ flexGrow: 1, paddingTop: "20px", display: "flex" }}>
          <div style={{ flex: 1 }}>
            <Typography variant="h4" component="h1" className="animated-text">
              Welcome to Our Voice Communication App
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Experience seamless voice communication with our cutting-edge platform.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Connect with friends and colleagues effortlessly!
            </Typography>
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            {/* Use the imported image */}
            <img src={voiceImage.src} alt="Voice Chat" style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "8px" }} />
          </div>
        </Container>
        <footer style={{ marginTop: "auto", textAlign: "center", backgroundColor: "#5f84e8", padding: "20px", color: "#fff" }}>
          &copy; {new Date().getFullYear()} Voice Chat. All rights reserved.
        </footer>
      </body>
    </html>
  );
};

export default Layout;
