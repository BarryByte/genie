"use client";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import React, { useContext } from "react";

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-7 shadow-md flex justify-between">
      <Image src={"/logo.svg"} alt="logo" width={50} height={50} />
      {user?.picture && <Image src={user.picture} alt="user image" width={50} height={50}
       className="rounded-full"
      />}
    </div>
  );
}

export default Header;
