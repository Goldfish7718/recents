import ProtectRoute from "@/components/ProtectRoute";

interface ProfileLayoutProps {
    children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <ProtectRoute>
      {children}
    </ProtectRoute>        
  )
}

export default ProfileLayout