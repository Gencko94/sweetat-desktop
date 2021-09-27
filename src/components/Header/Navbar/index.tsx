import isMobile from "../../../../utils/isMobile";
import dynamic from "next/dynamic";

const DesktopNavbar = dynamic(() => import("../DesktopNavbar"));
const MobileHeader = dynamic(() => import("../MobileHeader"));

const Navbar = () => {
  const isMobileDevice = isMobile();
  return <>{isMobileDevice ? <MobileHeader /> : <DesktopNavbar />}</>;
};

export default Navbar;
