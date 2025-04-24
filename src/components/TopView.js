import React from "react";
import { Box, Typography, Button, Breadcrumbs, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function TopView({
  breadcrumbs = [],
  title = "",
  buttonLabel = "Add",
  onButtonClick = () => {},
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>

        {/* {breadcrumbs.length > 0 && (
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ mb: 1 }}
          >
            {breadcrumbs.slice(0, 3).map((crumb, index) => (
              <Link
                key={index}
                color={
                  index === breadcrumbs.length - 1 ? "text.primary" : "inherit"
                }
                underline="hover"
                href={crumb.href || "#"}
                sx={{
                  fontWeight: index === breadcrumbs.length - 1 ? 600 : 400,
                  fontSize: "14px",
                }}
              >
                {crumb.label}
              </Link>
            ))}
          </Breadcrumbs>
        )} */}
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={onButtonClick}
        sx={{ whiteSpace: "nowrap" }}
      >
        {buttonLabel}
      </Button>
    </Box>
  );
}

export default TopView;
