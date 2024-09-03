import { Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        textAlign: "center",
        padding: "10px 0",
        backgroundColor: "transparent",
        color: "text.primary",
      }}
    >
      <Typography variant="body3" fontWeight={600}>
        2024 Krhyst Ferrari
      </Typography>
    </Box>
  );
};

export default Footer;
