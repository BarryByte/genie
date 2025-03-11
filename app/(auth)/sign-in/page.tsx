"use client"
import { GetAuthUserData } from "@/app/services/GlobalApi";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Image from "next/image";
import React from "react";

function SignIn() {

const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    console.log(tokenResponse);
    // save it to local storage, case for local storage in nextjs

    if(typeof window !== 'undefined'){
      localStorage.setItem('user_token', tokenResponse.access_token);
    }

    // reused this api call to get user info in GlobalApi.tsx
    // const userInfo = await axios.get(
    //   'https://www.googleapis.com/oauth2/v3/userinfo',
    //   { headers: { Authorization: 'Bearer' + tokenResponse.access_token } },
    // );

    const user = GetAuthUserData(tokenResponse.access_token);
    
    console.log(user);
  },
  onError: errorResponse => console.log(errorResponse),
});
  return (
    <div className="flex items-center flex-col justify-center h-screen ">
      <div className="flex items-center flex-col justify-center gap-6 border rounded-3xl p-10 shadow-lg">
        <Image src={"/logo.svg"} width={150} height={150} alt="logo" />
        <h2 className="text-2xl">Sign In to Genie - Your Personal assistant</h2>
        <Button onClick={()=>googleLogin()}>Sign in with Gmail</Button>
      </div>
    </div>
  );
}

export default SignIn;
