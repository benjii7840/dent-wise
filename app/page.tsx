import Header from '@/Landing/Header';
import Hero from '@/Landing/Hero';
import HowItWorks from '@/Landing/HowItWorks';
import WhatToAsk from '@/Landing/WhatToAsk';
import PricingSection from '@/Landing/PricingSection';
import CTA from '@/Landing/CTA';
import Footer from '@/Landing/Footer';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { syncUser } from '@/lib/actions/users';

export default async function Home() {
  const user =await currentUser()

  await syncUser();

  if(user) redirect('/dashboard')
  return (
    <div className='min-h-screen bg-background'>
      <Header/>
      <Hero/>
      <HowItWorks/> 
      <WhatToAsk/>
      <PricingSection/>
      <CTA/>
      <Footer/>  
    </div>
  );
}
