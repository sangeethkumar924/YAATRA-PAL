import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import axios from 'axios';

function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const user=JSON.parse(localStorage.getItem('user'));
  useEffect(()=>{
    console.log(user);
  },[])
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });
  const GetUserProfile = (tokenInfo) => {
    axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'Application/json'
        }
      }
    ).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    });
  };
  return (
    <div className="p-2 shadow-sm flex items-center px-5">
  
  {/* Left side: Logo + Title */}
        <div className="flex items-center gap-2">
        <a href='/'> <img src="/logo.svg" alt="logo" className="h-8 w-8" /></a> 
          <h2 className="font-extrabold text-2xl">YAATRA PAL</h2>
        </div>

  {/* Right side: Button */}
        <div className="ml-auto">
          {
            user ?
            <div className='flex gap-2'>
           <a href='/create-trip'> <Button varient="outline" className="rounded-full">+ Create trip</Button></a>
           <a href='/my-trips'> <Button varient="outline" className="rounded-full">My trips</Button></a>
            
            <Popover>
               <PopoverTrigger>
                <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' />
               </PopoverTrigger>
               <PopoverContent>
                <h2 className='cursor-pointer' onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2>
               </PopoverContent>
            </Popover>
            </div>
            :
            <Button onClick={()=>setOpenDialog(true)}>Sign in</Button>
          }
        </div>
        <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className='font-bold text-lg text-black mt-7'>Sign-In With Google</h2>
              <p>Sign in with Google securely</p>
              <Button onClick={login} className="w-full mt-5">
                Sign-in With Google Account
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>

     
   
    

  )
}

export default Header
