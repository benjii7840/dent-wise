import Header from '@/Landing/Header';
import Hero from '@/Landing/Hero';
import HowItWorks from '@/Landing/HowItWorks';
import WhatToAsk from '@/Landing/WhatToAsk';
import PricingSection from '@/Landing/PricingSection';
import CTA from '@/Landing/CTA';
import Footer from '@/Landing/Footer';

export default function Home() {
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
