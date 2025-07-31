import ImageTracker from '../components/ImageTracker'
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'

gsap.registerPlugin(SplitText)
const About = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const profileImageContainer = document.querySelector('.profile-images');
        const profileImages = profileImageContainer.querySelectorAll('.profile-images .img');
        const nameElements = document.querySelectorAll('.profile-names .name');
        const nameHeadings = document.querySelectorAll('.profile-names .name h1');

        nameHeadings.forEach((heading) => {
            const split=new SplitText(heading, { type: 'chars' });
            split.chars.forEach((char) => {
                char.classList.add('letter');
            });
        });

        const defaultLetters=nameElements[0].querySelectorAll('.letter');
        gsap.set(defaultLetters, { y: '100%' });

    });
  return (
    <>
    <section className='team margin-0 padding-0 box-sizing border-box relative w-[100vw] h-[100svh] bg-[#0F0F0F] flex flex-col items-center justify-center gap-[2.5em] overflow-hidden'>
        <div className='profile-images width-[max-content] flex items-center justify-center'>
            <div className="img"><img className='w-[100%] h-[100%] object-cover rounded-[0.5rem]' src='/images/profile1.jpg' alt='Profile 1' /></div>
            <div className="img"><img className='w-[100%] h-[100%] object-cover rounded-[0.5rem]' src='/images/profile2.jpg' alt='Profile 2' /></div>
            <div className="img"><img className='w-[100%] h-[100%] object-cover rounded-[0.5rem]' src='/images/profile3.jpg' alt='Profile 3' /></div>
            <div className="img"><img className='w-[100%] h-[100%] object-cover rounded-[0.5rem]' src='/images/profile4.jpg' alt='Profile 4' /></div>
            <div className="img"><img className='w-[100%] h-[100%] object-cover rounded-[0.5rem]' src='/images/profile5.jpg' alt='Profile 5' /></div>
            <div className="img"><img className='w-[100%] h-[100%] object-cover rounded-[0.5rem]' src='/images/profile6.jpg' alt='Profile 6' /></div>
            <div className="img"><img className='w-[100%] h-[100%] object-cover rounded-[0.5rem]' src='/images/profile7.jpg' alt='Profile 7' /></div>
            <div className="img"><img className='w-[100%] h-[100%] object-cover rounded-[0.5rem]' src='/images/profile8.jpg' alt='Profile 8' /></div>
            <div className="img"><img className='w-[100%] h-[100%] object-cover rounded-[0.5rem]' src='/images/profile9.jpg' alt='Profile 9' /></div>
        </div>
        <div className='profile-names w-[100%] h-[20rem] clip-path(polygon(0 0, 100% 0, 100% 100%, 0 100%)) overflow-hidden'>
            <div className="name default"><h1>The Squad</h1></div>
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
    </>
  )
}

export default About