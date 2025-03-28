'use client'

import React from "react";
import ShareContent from "../components/ShareContent";
import ReceiveContent from "../components/RecieveContent";
import Footer from "../components/ui/Footer";

const App = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row min-h-screen">
        <ShareContent />
        <ReceiveContent />
      </div>
      <Footer />
    </div>
  );
};

export default App;
