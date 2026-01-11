import React, { useState, useEffect } from 'react';

const COOKIE_KEY = 'culinai_cookie_consent';

const CookieConsent: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, 'true');
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, 'false');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in-up">
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-md border border-stone-200 shadow-2xl rounded-2xl p-6 md:flex items-center justify-between gap-6">
        <div className="mb-4 md:mb-0">
          <h4 className="font-serif font-bold text-stone-900 text-lg mb-1">
            <i className="fas fa-cookie-bite text-chef-600 mr-2"></i>
            We use cookies
          </h4>
          <p className="text-sm text-stone-600">
            We use cookies to save your recipe history and preferences locally. 
            We do not track your personal data or share it with third parties.
            By using this worldwide recipe platform, you agree to our use of cookies.
          </p>
        </div>
        <div className="flex items-center gap-3 whitespace-nowrap">
          <button 
            onClick={handleDecline}
            className="px-4 py-2 text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors"
          >
            Decline
          </button>
          <button 
            onClick={handleAccept}
            className="px-6 py-2 text-sm font-bold bg-chef-600 hover:bg-chef-700 text-white rounded-xl shadow-lg shadow-chef-600/20 transition-all"
          >
            Accept Cookies
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;