import ProtectRoute from "@/components/ProtectRoute";

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return <>{children}</>;
};

export default ProfileLayout;
