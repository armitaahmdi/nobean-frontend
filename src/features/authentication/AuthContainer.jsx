// Example usage of authentication slices in a parent component
// This file demonstrates how to integrate the authentication flow

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginForm from './LoginForm';
import OtpForm from './OtpForm';
import { clearAuth } from './slices/loginSlice';
import { resetOtpState } from './slices/otpSlice';

export default function AuthContainer() {
    const [currentStep, setCurrentStep] = useState('login'); // 'login' or 'otp'
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get authentication state from Redux
    const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);

    // Handle authentication state changes
    useEffect(() => {
        if (isAuthenticated) {
            // Show success toast
            toast.success("خوش آمدید! شما با موفقیت وارد شدید", {
                className: "text-lg font-semibold",
                position: "top-center",
                autoClose: 3000,
            });
            
            // Redirect to main page or previous page
            const returnUrl = new URLSearchParams(location.search).get('returnUrl') || '/';
            navigate(returnUrl);
        }
    }, [isAuthenticated, navigate, location.search]);

    // Handle login form submission
    const handleLoginSubmit = (data) => {
        // Navigate to OTP form
        setCurrentStep('otp');
    };

    // Handle OTP form submission
    const handleOtpSubmit = (data) => {
        // User is now authenticated, redirect will be handled by useEffect
        console.log('User authenticated:', user);
    };

    // Handle back button from OTP form
    const handleBackToLogin = () => {
        setCurrentStep('login');
        // Clear any OTP-related state
        dispatch(resetOtpState());
    };

    // Handle logout
    const handleLogout = () => {
        dispatch(clearAuth());
        setCurrentStep('login');
    };

    // If user is authenticated, redirect (handled by useEffect above)
    if (isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">در حال انتقال...</p>
                </div>
            </div>
        );
    }

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">در حال پردازش...</p>
                </div>
            </div>
        );
    }

    // Show appropriate form based on current step
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            {currentStep === 'login' ? (
                <LoginForm onSubmit={handleLoginSubmit} />
            ) : (
                <OtpForm 
                    onSubmit={handleOtpSubmit} 
                    onBack={handleBackToLogin}
                />
            )}
        </div>
    );
}