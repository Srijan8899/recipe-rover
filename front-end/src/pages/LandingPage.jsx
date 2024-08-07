import React from 'react'
import Hero from '../components/LandinPage/Hero';
import Marquee from '../components/LandinPage/Marquee';
import Explore from '../components/LandinPage/Explore';
import Dining from '../components/LandinPage/Dining';
import JoinUs from '../components/LandinPage/JoinUs';
import LocomotiveScroll from 'locomotive-scroll'

function LandingPage() {
  const locomotiveScroll = new LocomotiveScroll();
  return (
  <div className="min-h-screen bg-black">
    <Hero/>
    <Marquee/>
    <Explore/>
    <Dining/>
    <JoinUs/>
    </div>
  );
}

export default LandingPage