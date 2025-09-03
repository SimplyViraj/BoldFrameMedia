// import { useEffect } from 'react';
// import gsap from 'gsap';
// import SplitText from 'gsap/SplitText';
// gsap.registerPlugin(SplitText);

// const MeetTheTeam = () => {
//   useEffect(() => {
//     const profileImageContainer = document.querySelector('.profile-images');
//     const profileImages = profileImageContainer.querySelectorAll('.profile-images .img');
//     const nameElements = document.querySelectorAll('.profile-names .name');
//     const nameHeadings = document.querySelectorAll('.profile-names .name h1');

//     // Split names into letters
//     nameHeadings.forEach((heading) => {
//       const split = new SplitText(heading, { type: 'chars' });
//       split.chars.forEach((char) => {
//         char.classList.add('letter');
//       });
//     });

//     const defaultLetters = nameElements[0].querySelectorAll('.letter');


//     if (window.innerWidth >= 900) {
//       profileImages.forEach((img, index) => {
//         const correspondingName = nameElements[index + 1];
//         const letters = correspondingName.querySelectorAll('.letter');

//         const handleMouseEnter = () => {
//           gsap.to(img, { width: 140, height: 140, duration: 0.5, ease: 'power4.out' });

//           gsap.to(defaultLetters, {
//             y: '100%',
//             duration: 0.75,
//             ease: 'power4.out',
//             stagger: { each: 0.025, from: 'center' }
//           });
//           gsap.to(letters, {
//             y: '-100%',
//             duration: 0.75,
//             ease: 'power4.out',
//             stagger: { each: 0.025, from: 'center' }
//           });
//         };
//         const handleMouseLeave = () => {
        
//           gsap.to(img, { width: 70, height: 70, duration: 0.5, ease: 'power4.out' });

//           gsap.to(letters, {
//             y: '100%',
//             duration: 0.75,
//             ease: 'power4.out',
//             stagger: { each: 0.025, from: 'center' }
//           });

//           // Show default name again
//           gsap.to(defaultLetters, {
//             y: '0%',
//             duration: 0.75,
//             ease: 'power4.out',
//             stagger: { each: 0.025, from: 'center' }
//           });
//         };

//         img.addEventListener('mouseenter', handleMouseEnter);
//         img.addEventListener('mouseleave', handleMouseLeave);

//         // Cleanup listeners on unmount
//         return () => {
//           img.removeEventListener('mouseenter', handleMouseEnter);
//           img.removeEventListener('mouseleave', handleMouseLeave);
//         };
//       });
//     }
//   }, []);

//   return (
//     <div className="margin-0 padding-0 box-sizing border-box">
//       <section className="team relative w-[100vw] h-[100svh] bg-[#0F0F0F] color-[#e3e3db] flex flex-col items-center justify-center gap-[2.5em] overflow-hidden">
//         <div className="profile-images width-[max-content] max-width-[900] flex items-center justify-center">
//           <div className="img"><img className="w-[100%] h-[100%] object-cover rounded-[0.5rem]" src="/images/profile1.jpg" alt="Profile 1" /></div>
//           <div className="img"><img className="w-[100%] h-[100%] object-cover rounded-[0.5rem]" src="/images/profile2.jpg" alt="Profile 2" /></div>
//           <div className="img"><img className="w-[100%] h-[100%] object-cover rounded-[0.5rem]" src="/images/profile3.jpg" alt="Profile 3" /></div>
//           <div className="img"><img className="w-[100%] h-[100%] object-cover rounded-[0.5rem]" src="/images/profile4.jpg" alt="Profile 4" /></div>
//           <div className="img"><img className="w-[100%] h-[100%] object-cover rounded-[0.5rem]" src="/images/profile5.jpg" alt="Profile 5" /></div>
//           <div className="img"><img className="w-[100%] h-[100%] object-cover rounded-[0.5rem]" src="/images/profile6.jpg" alt="Profile 6" /></div>
//           <div className="img"><img className="w-[100%] h-[100%] object-cover rounded-[0.5rem]" src="/images/profile7.jpg" alt="Profile 7" /></div>
//           <div className="img"><img className="w-[100%] h-[100%] object-cover rounded-[0.5rem]" src="/images/profile8.jpg" alt="Profile 8" /></div>
//           <div className="img"><img className="w-[100%] h-[100%] object-cover rounded-[0.5rem]" src="/images/profile9.jpg" alt="Profile 9" /></div>
//         </div>
//         <div className="profile-names relative w-[100%] h-[20rem] clip-path(polygon(0 0, 100% 0, 100% 100%, 0 100%)) inter-tight-black text-[#f93535] overflow-hidden">
//           <div className="name default"><h1>Our Team</h1></div>
//           <div className="name"><h1>Viraj</h1></div>    
//           <div className="name"><h1>Aditi</h1></div>
//           <div className="name"><h1>Ravi</h1></div>
//           <div className="name"><h1>Priya</h1></div>
//           <div className="name"><h1>Rahul</h1></div>
//           <div className="name"><h1>Neha</h1></div>
//           <div className="name"><h1>Tharun</h1></div>
//           <div className="name"><h1>Shreya</h1></div>
//           <div className="name"><h1>Rohan</h1></div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default MeetTheTeam;

import { useEffect } from 'react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const MeetTheTeam = () => {
  useEffect(() => {
    const profileImageContainer = document.querySelector('.profile-images');
    const profileImages = profileImageContainer.querySelectorAll('.profile-images .img');
    const nameElements = document.querySelectorAll('.profile-names .name');
    const nameHeadings = document.querySelectorAll('.profile-names .name h1');

    // Split names into letters
    nameHeadings.forEach((heading) => {
      const split = new SplitText(heading, { type: 'chars' });
      split.chars.forEach((char) => {
        char.classList.add('letter');
      });
    });

    const defaultLetters = nameElements[0].querySelectorAll('.letter');

    const listeners = []; // keep track of all listeners

    if (window.innerWidth >= 900) {
      profileImages.forEach((img, index) => {
        const correspondingName = nameElements[index + 1];
        const letters = correspondingName.querySelectorAll('.letter');

        // Create timelines (paused)
        const enterTl = gsap.timeline({ paused: true });
        enterTl
          .to(img, { width: 140, height: 140, duration: 0.5, ease: 'power4.out' }, 0)
          .to(defaultLetters, {
            y: '100%',
            duration: 0.75,
            ease: 'power4.out',
            stagger: { each: 0.025, from: 'center' },
          }, 0)
          .to(letters, {
            y: '-100%',
            duration: 0.75,
            ease: 'power4.out',
            stagger: { each: 0.025, from: 'center' },
          }, 0);

        const leaveTl = gsap.timeline({ paused: true });
        leaveTl
          .to(img, { width: 70, height: 70, duration: 0.5, ease: 'power4.out' }, 0)
          .to(letters, {
            y: '100%',
            duration: 0.75,
            ease: 'power4.out',
            stagger: { each: 0.025, from: 'center' },
          }, 0)
          .to(defaultLetters, {
            y: '0%',
            duration: 0.75,
            ease: 'power4.out',
            stagger: { each: 0.025, from: 'center' },
          }, 0);

        const handleMouseEnter = () => enterTl.restart();
        const handleMouseLeave = () => leaveTl.restart();

        img.addEventListener('mouseenter', handleMouseEnter);
        img.addEventListener('mouseleave', handleMouseLeave);

        listeners.push({ img, handleMouseEnter, handleMouseLeave });
      });
    }

    // Proper cleanup (React will call this on unmount)
    return () => {
      listeners.forEach(({ img, handleMouseEnter, handleMouseLeave }) => {
        img.removeEventListener('mouseenter', handleMouseEnter);
        img.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="margin-0 padding-0 box-sizing border-box">
      <section className="team relative w-[100vw] h-[100svh] bg-[#0F0F0F] color-[#e3e3db] flex flex-col items-center justify-center gap-[2.5em] overflow-hidden">
        <div className="profile-images width-[max-content] max-width-[900] flex items-center justify-center">
          <div className="img"><img className="w-[100%] h-[100%] object-cover rounded-[0.5rem]" src="/images/profile1.jpg" alt="Profile 1" /></div>
          <div className="img"><img className="w-[100%] h-[100%] object-cover rounded-[0.5rem]" src="/images/profile2.jpg" alt="Profile 2" /></div>
          <div className="img"><img className="w-[100%] h-[100%] object-cover rounded-[0.5rem]" src="/images/profile3.jpg" alt="Profile 3" /></div>
          <div className="img"><img className="w-[100%] h-[100%] object-cover rounded-[0.5rem]" src="/images/profile4.jpg" alt="Profile 4" /></div>
          <div className="img"><img className="w-[100%] h-[100%] object-cover rounded-[0.5rem]" src="/images/profile5.jpg" alt="Profile 5" /></div>
          <div className="img"><img className="w-[100%] h-[100%] object-cover rounded-[0.5rem]" src="/images/profile6.jpg" alt="Profile 6" /></div>
          <div className="img"><img className="w-[100%] h-[100%] object-cover rounded-[0.5rem]" src="/images/profile7.jpg" alt="Profile 7" /></div>
          <div className="img"><img className="w-[100%] h-[100%] object-cover rounded-[0.5rem]" src="/images/profile8.jpg" alt="Profile 8" /></div>
          <div className="img"><img className="w-[100%] h-[100%] object-cover rounded-[0.5rem]" src="/images/profile9.jpg" alt="Profile 9" /></div>
        </div>
        <div className="profile-names relative w-[100%] h-[20rem] inter-tight-black text-[#f93535] overflow-hidden">
          <div className="name default"><h1>Our Team</h1></div>
          <div className="name"><h1>Viraj</h1></div>    
          <div className="name"><h1>Aditi</h1></div>
          <div className="name"><h1>Ravi</h1></div>
          <div className="name"><h1>Priya</h1></div>
          <div className="name"><h1>Rahul</h1></div>
          <div className="name"><h1>Neha</h1></div>
          <div className="name"><h1>Tharun</h1></div>
          <div className="name"><h1>Shreya</h1></div>
          <div className="name"><h1>Rohan</h1></div>
        </div>
      </section>
    </div>
  );
};

export default MeetTheTeam;
