import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <div className="animate-fade-in" style={{ width: '100%', height: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
  );
};
export default PageTransition;
