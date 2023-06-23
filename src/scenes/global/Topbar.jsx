import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingstOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      sx={{
        listStyleType: "none",
        padding: 0,
        margin: 0,
        backgroundColor: colors.primary[500],
      }}
    >
      {/* Search Bar */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        sx={{ alignItems: "center", padding: "0 8px" }}
      >
        <SearchIcon sx={{ color: colors.textPrimary }} />
        <InputBase
          sx={{
            ml: 2,
            flex: 1,
            color: colors.textPrimary,
            "& .MuiInputBase-input": {
              "&::placeholder": {
                color: colors.textSecondary,
              },
            },
          }}
          placeholder="Search"
        />
        <IconButton type="button">
          <SearchIcon sx={{ color: colors.textPrimary }} />
        </IconButton>
      </Box>
      {/* Icons section */}
      <Box display="flex" sx={{ alignItems: "center" }}>
        <IconButton>
          <NotificationsOutlinedIcon sx={{ color: colors.textPrimary }} />
        </IconButton>
        <IconButton>
          <SettingstOutlinedIcon sx={{ color: colors.textPrimary }} />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon sx={{ color: colors.textPrimary }} />
        </IconButton>
        <IconButton>
          <SearchIcon sx={{ color: colors.textPrimary }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
