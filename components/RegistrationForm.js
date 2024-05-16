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

const RegisterForm = () => {
  const [name, setName] = useState("");
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

    // Validation checks
    if (name.length < 4) {
      setError("Name must be at least 4 characters long");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // Prepare registration data
    const userData = {
      name: name,
      email: email,
      password: password,
    };

    try {
      // Send POST request to registration endpoint
      const response = await fetch(
        "https://voicechatfinal.onrender.com/users/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      // Check response status
      if (response.ok) {
        console.log("Registration successful");
        // Navigate to login page
        router.push("/login"); // Use router.push to navigate to the login page
      } else {
        const data = await response.json();
        console.error("Registration failed:", data.error);
        setError(data.error); // Set error message received from the server
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An error occurred during registration"); // Set generic error message
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
          Register
        </Typography>
        {error && (
          <Typography variant="body2" color="error" align="center">
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            margin="normal"
          />
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
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterForm;
