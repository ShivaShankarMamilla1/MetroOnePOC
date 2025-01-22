import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const LoginPage = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error on input
    setErrors({ ...errors, [name]: "" });
  };

  // Validate inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    //  else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   newErrors.email = "Enter a valid email address";
    // }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      // If validation passes, authenticate the user
      setIsAuthenticated(true);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F7F7F7", // Light grey background
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",        
        backgroundImage:
            "url(https://metroonelpsg.com/wp-content/uploads/2022/01/Metro_badge_website_mobile-682x1024.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",   
      }}
    >
      <Box
        sx={{
          width: "400px",
          padding: "40px",
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Title Section */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            marginBottom: "16px",
            color: "#333333",
          }}
        >
          LOGIN TO YOUR ACCOUNT
        </Typography>

        {/* Subtitle Section */}
        <Typography
          variant="body1"
          sx={{
            fontSize: "14px",
            color: "#666666",
            marginBottom: "24px",
          }}
        >
          Enter your credentials to access your account.
        </Typography>

        {/* Input Fields */}
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          sx={{
            marginBottom: "16px",
          }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          sx={{
            marginBottom: "24px",
          }}
        />

        {/* Button Section */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{
            background:
              "-webkit-radial-gradient(49.11% 47.83%, circle farthest-corner, #fff 7.05%, #bcbcbc 38.93%, #888 66.78%, #686868 87.67%, #5c5c5c 99.22%)",
            color: "#000000",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: "14px",
            boxShadow:
              "inset 0px 1px 2px rgba(255, 255, 255, 0.6), 0px 4px 6px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              boxShadow:
                "inset 0px 1px 2px rgba(255, 255, 255, 0.8), 0px 6px 8px rgba(0, 0, 0, 0.3)",
              transform: "translateY(-1px)",
            },
          }}
        >
          Login
        </Button>

        {/* Footer Section */}
        {/* <Typography
          variant="body2"
          sx={{
            marginTop: "16px",
            fontSize: "12px",
            color: "#AAAAAA",
          }}
        >
          Don't have an account?{" "}
          <a href="/signup" style={{ color: "#007FFF" }}>
            Sign Up
          </a>
        </Typography> */}
      </Box>
    </Box>
  );
};

export default LoginPage;
