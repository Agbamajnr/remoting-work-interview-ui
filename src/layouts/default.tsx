import LoginForm from 'components/auth/LoginForm';
import MainSidebar from 'components/MainSidebar';
import TopHeader from 'components/TopHeader';
import React from 'react';

// Define the TopHeader component

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    return (
        <div className="layout flex flex-row dark:bg-gray-900 transition-colors relative h-screen overflow-hidden no-scroll-btn">
            <MainSidebar />
            <main className='w-full'>
                <TopHeader />

                {children}
            </main>

            {/* Login form modal */}
            <LoginForm />

        </div>
    );
};

export default DefaultLayout;
