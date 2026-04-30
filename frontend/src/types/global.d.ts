// Global CSS side-effect imports (for Tailwind/globals.css)
declare module '*.css';

// CSS Modules (if you ever use *.module.css)
declare module '*.module.css' {
  const content: { [className: string]: string };
  export default content;
}

// SCSS Modules (optional, if you use SCSS)
declare module '*.module.scss' {
  const content: { [className: string]: string };
  export default content;
}