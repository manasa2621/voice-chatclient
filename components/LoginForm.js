import HomeIcon from "@mui/icons-material/Home";
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message
  const router = useRouter();

  // Function to handle navigation to home page
  const handleHomeClick = () => {
    router.push("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        "https://voicechatfinal.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful");
        console.log("Token:", data.token);

        // Store token in local storage
        localStorage.setItem("token", data.token);

        // Navigate to home page
        router.push("/home");
      } else {
        console.error("Login failed");
        setError("Incorrect email or password"); // Set error message
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred while logging in"); // Set error message
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 8 }}>
        {/* Home Icon Button */}

        <IconButton
          onClick={handleHomeClick}
          color="primary"
          sx={{ position: "absolute", right: "100px", top: "20px" }}
        >
          <HomeIcon />
        </IconButton>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        {error && (
          <Typography variant="body2" color="error" align="center">
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
