import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './Landing_.css';

export function Landing() {
  return (
    <>
      <nav>
        <Link to="/about">About</Link>
      </nav>
      <main>
        <section id="intro">
          <div className="content">
            <h2>Rill. The Ultimate Gaming Platform</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam maximus lacus justo, in fringilla purus tristique et.</p>
            <a href="/" className="button">Get Started</a>
          </div>
        </section>
        
        <section id="badges">
          <h2>Earn badges</h2>
          <p>Earn special badges by completing in-game missions! Win the Assassin badge by silently taking out your opponents with melee weapons, earn the Marksman badge by getting the most sniper kills, and many more!</p>
        </section>
        
        <section id="bounties">
          <div className="content">
            <h2>Place and collect bounties</h2>
            <p>Watching a game and want to see someone killed? Killed in a previous game and want to take revenge? Or just can’t stand someone? Set a bounty on their head!</p>
            <a href="/" className="button">See more</a>
          </div>
        </section>
{/*         
        <section id="upcoming">
          <h2>CS:GO Summer Finale</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam maximus lacus justo, in fringilla purus tristique et.</p>
        </section>
        
        <section id="scheduled">
          <h2>Scheduled matches</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam maximus lacus justo, in fringilla purus tristique et.</p>
        </section>
*/}
        <section id="games">
          <h2>Supported games</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam maximus lacus justo, in fringilla purus tristique et.</p>
        </section>
        
        <section id="faq">
          <h2>Frequently Asked Questions</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam maximus lacus justo, in fringilla purus tristique et.</p>
        </section>
        
        <footer>

        </footer>
      </main>
    </>
  );
}
