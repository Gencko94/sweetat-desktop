import dynamic from "next/dynamic";

const DesktopNavbar = dynamic(() => import("../DesktopNavbar"), { ssr: true });
const MobileHeader = dynamic(() => import("../MobileHeader"), { ssr: true });

const Navbar = ({ isMobileDevice }: { isMobileDevice: boolean }) => {
  return <>{isMobileDevice ? <MobileHeader /> : <DesktopNavbar />}</>;
};

export default Navbar;
