import React from "react";
import { Link } from "react-router-dom";
import piagetLogo from "@/assets/logo2.png";

interface PropType {
  url?: string;
  width?: number;
  height?: number;
  showRightLogo?: boolean;
  showLeftLogo?: boolean;
}

const SiteLogo = ({
  url = "/",
  width = 40,
  height = 40,
  showLeftLogo = false,
  showRightLogo = true,
}: PropType) => {
  return (
    <Link to={url} className="flex items-center gap-2">
      {showLeftLogo && (
        <img width={width} height={height} src={piagetLogo} alt="site-logo" />
      )}
      {showRightLogo && (
        <img src={piagetLogo} width={120} height={40} alt="site-logo-1" />
      )}
    </Link>
  );
};

export default SiteLogo;
