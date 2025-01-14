import MainSidebar from 'components/MainSidebar';
import React from 'react';

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="layout flex flex-row dark:bg-gray-900 transition-colors">
            <MainSidebar />
            <main>
                {children}
            </main>

        </div>
    );
};

export default DefaultLayout;
