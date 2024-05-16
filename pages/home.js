import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const Home = () => {
  const router = useRouter();
  const [newMeetingId, setNewMeetingId] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || ""); // Get token from local storage

  // Function to generate a random meeting ID
  const generateMeetingId = () => {
    const meetingId = Math.random().toString(36).substr(2, 8); // Generate random alphanumeric string
    setNewMeetingId(meetingId);
  };

  // Function to handle joining a meeting
  const handleJoinMeeting = async () => {
    const meetingId = document.getElementById("meetingId").value;
    try {
      const response = await fetch(
        "https://voicechatfinal.onrender.com/joinroom ",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
          body: JSON.stringify({ meetingId, token }), // Send meeting ID and token in the request body
        }
      );

      if (response.ok) {
        // Navigate to the joinroom page with the meeting ID
        router.push(`/joinroom?meetingId=${meetingId}`);
      } else {
        console.error("Failed to join meeting");
        // Handle failure to join meeting (e.g., show error message)
      }
    } catch (error) {
      console.error("Error joining meeting:", error);
      // Handle error (e.g., show error message)
    }
  };

  // Function to handle creating a new meeting
  const handleCreateMeeting = () => {
    // Generate a random meeting ID
    generateMeetingId();
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Set height to full viewport height
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Home Page
      </Typography>
      <div>
        <TextField
          label="Enter Meeting ID"
          variant="outlined"
          fullWidth
          id="meetingId"
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<PlayArrowIcon />}
          onClick={handleJoinMeeting}
          fullWidth
          sx={{ mb: 2 }}
        >
          Join
        </Button>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          endIcon={<AddIcon />}
          onClick={handleCreateMeeting}
          fullWidth
          sx={{ mb: 2 }}
        >
          Create New Meeting
        </Button>
        {newMeetingId && (
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            Meeting ID: {newMeetingId}
          </Typography>
        )}
      </div>
    </Container>
  );
};

export default Home;
