'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const GsapWrapper = ({ children }) => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setAnimationDone(true),
      });

  
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 1.5,
        backgroundColor: '#000', 
      });

    
      

     
      tl.from(
        containerRef.current,
        {
          scale: 0.8,
          opacity: 0,
          filter: 'blur(40px)',
          rotate: -2,
          y: 50,
          x: -10,
          duration: 3,
          ease: 'power3.out',
        },
        '-=2' 
      );

     
      tl.from(
        containerRef.current.children,
        {
          opacity: 0,
          y: 20,
          scale: 0.95,
          filter: 'blur(20px)',
          stagger: 0.2,
          duration: 1,
          ease: 'power2.out',
        },
        '-=2.5'
      );

     
      tl.to(
        containerRef.current,
        {
          y: -5,
          x: 5,
          repeat: 1,
          yoyo: true,
          duration: 2,
          ease: 'sine.inOut',
        },
        '-=1.5'
      );

     
      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 1.5,
          ease: 'power2.inOut',
        },
        '-=1'
      );

      
      tl.to(containerRef.current, {
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power1.out',
      }, '-=1');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
     
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#000',
          zIndex: 9999,
          pointerEvents: 'none',
          opacity: 0,
        }}
      ></div>

      <div
        ref={containerRef}
        style={{
          filter: animationDone ? 'none' : 'blur(40px)',
        }}
      >
        {children}
      </div>
    </>
  );
};

export default GsapWrapper;
