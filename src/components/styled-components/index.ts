import { Box, styled, Typography } from "@mui/material";
import bg from "../../assets/bg2.jpg";

export const StyledSidebar = styled(Box)(({ theme }) => ({
  width: "300px",
  backgroundImage: `url(${bg})`,
  backgroundSize: "cover",
  padding: theme.spacing(3),
  color: "white",
  position: "relative",
  borderRadius: theme.spacing(1),
  borderBottomLeftRadius: theme.spacing(1),
}));

export const StyledContent = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(4),
  backgroundColor: "white",
  borderTopRightRadius: theme.spacing(1),
  borderBottomRightRadius: theme.spacing(1),
}));
export const StyledStepLabel = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.7,
  marginBottom: "4px",
});
