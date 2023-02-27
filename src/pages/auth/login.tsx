import { CredentialResponse, GoogleLogin} from '@react-oauth/google';
import React, { useState } from 'react';

interface LoginProps {
  handleLoginSuccess: (credentialResponse: CredentialResponse) => void;
}

function Login({ handleLoginSuccess }: LoginProps) {


  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center">
      <div className="card w-[40rem] bg-[#E5E5E5]">
  <figure className="px-10 pt-10">
    <img src="../../../darth-vader-1.svg" alt="Shoes" className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title text-black">I'm not the Jedi I should be, I want more but I know I shoudn't - Anakin</h2>
    <div className="card-actions">
    <GoogleLogin
            onSuccess={credentialResponse => {
              console.log('Login Success: currentUser:', credentialResponse);
              localStorage.setItem('accessToken', credentialResponse.credential!);
          
              handleLoginSuccess(credentialResponse);

            }}
          
            onError={() => {
              console.log('Login Failed');
            }}
          
          />
    </div>
  </div>
</div>
    </div>
  )
}

export default Login
