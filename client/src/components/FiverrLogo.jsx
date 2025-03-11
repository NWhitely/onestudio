import Image from "next/image";

function FiverrLogo() {
  return (
    <Image
      src="/logo.svg"  // Make sure this matches the filename in /public
      alt="OneStudio Logo"
      width={120}  // Adjust size as needed
      height={40}
    />
  );
}

export default FiverrLogo;
