import React from "react";

interface CurtainTransitionProps {
  children: React.ReactNode;
}

export function CurtainTransition({ children }: CurtainTransitionProps) {
  return <>{children}</>;
}

export default CurtainTransition;
