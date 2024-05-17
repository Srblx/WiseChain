export const disableScroll = () => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  };
  export const enableScroll = () => {
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  };