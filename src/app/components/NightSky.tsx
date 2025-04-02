import React from "react";

const NightSky: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 bg-cosmic-dark overflow-hidden">
      {/* Static Night Sky Background */}
      <p className="text-white">This is the Night Sky Background</p>
    </div>
  );
};

export default NightSky;
