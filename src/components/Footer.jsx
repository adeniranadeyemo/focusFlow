import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Footer() {
  const mode = useSelector((state) => state?.timer?.mode);

  const quotes = [
    'Focus on being productive instead of busy.',
    'The way to get started is to quit talking and begin doing.',
    'Your future is created by what you do today.',
    'Small progress is still progress.',
    'Small consistent steps beat short bursts of intensity.',
    'Ija wa, ija o si, always guiding',
    'Focus on God',
  ];

  function useRotatingQuote(mode) {
    const [quote, setQuote] = useState('');

    useEffect(() => {
      const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(newQuote);
    }, [mode]); // change quote on mode change

    return quote;
  }

  const text = useRotatingQuote(mode);

  return (
    <footer className="system-color2 text-color text-xs font-medium text-center p-md border-radius-md mt-lg shadow-card dark:shadow-none">
      <p className="mb-xs text-color-muted italic">"{text}"</p>
      <p className="tracking-normal">
        &copy; {new Date().getFullYear()} FocusFlow. Built by Niran with
        intention and zero distractions. ✨
      </p>
    </footer>
  );
}

export default Footer;
