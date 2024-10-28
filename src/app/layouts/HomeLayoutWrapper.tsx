import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

interface HomeLayoutWrapperProps {
  children: React.ReactNode;
}

function HomeLayoutWrapper({ children }: HomeLayoutWrapperProps) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default HomeLayoutWrapper;
