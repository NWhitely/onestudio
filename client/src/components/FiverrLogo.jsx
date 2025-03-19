import React from "react";
import Image from "next/image";

function FiverrLogo() {
  return (
    <Image
      src="/logo.svg"  // Make sure this matches the filename in /public
      alt="OneStudio Logo"
      width={240}  // Adjust size as needed
      height={80}
    />
  );
}

export default FiverrLogo;
