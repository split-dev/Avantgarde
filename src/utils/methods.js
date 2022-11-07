import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const interpolateString = (text = '', tag = 'span', regex = /\*\*/g) => {
  if (!text.length) return '';
  let open = true;
  return text.replace(regex, () => {
    open = !open;
    return `<${open ? '/' : ''}${tag}>`;
  });
};

const safeGetImage = (picture = false) => {
  if (!picture) return null;
  return Object.hasOwn(picture, 'filename') ? picture.filename : picture;
};

const removeSpaces = (str = '', replace = '_') => {
  return (str || '').toLowerCase().replace(/ /g, replace);
};

const goToSection = (link, location = null) => {
  const header = document.querySelector('#app-header header');
  const top = location || document.querySelector(`#${link}`).offsetTop + header.clientHeight;

  gsap.to(window, { duration: 1, scrollTo: { y: top }, ease: "power4.inOut" });
};

const makeZeroNumber = (num) => (num > 9) ? num : `0${num}`;

export {
  interpolateString,
  removeSpaces,
  safeGetImage,
  goToSection,
  makeZeroNumber,
};
