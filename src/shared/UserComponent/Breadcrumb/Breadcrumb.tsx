import { Breadcrumbs, Link as MUILink, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface BreadcrumbProps {
  label: string;
  to: string;
}

interface RoomBreadcrumbsProps {
  links: BreadcrumbProps[];
}

const RoomBreadcrumbs = ({ links }: RoomBreadcrumbsProps) => {
  const { pathname } = useLocation();
  const theme = useTheme();
  const { t } = useTranslation();

  if (!links) return null;

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      {links.map(({ label, to }: BreadcrumbProps) => {
        const isActive = to === pathname;
        return (
          <MUILink
            component={Link}
            key={to}
            to={to}
            underline="hover"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: isActive
                ? theme.custom.activeBreadcrumb
                : theme.custom.inactiveBreadcrumb,
              fontWeight: isActive ? "bold" : "normal",
            }}
          >
            {t(`${label}`)}
          </MUILink>
        );
      })}
    </Breadcrumbs>
  );
};

export default RoomBreadcrumbs;
