import { Link } from 'react-router-dom';

/**
 * Renders a button or a react-router Link
 * @param {object} props - The properties passed to the component.
 * @param {ReactNode} props.children - The content of the button.
 * @param {string} props.to - The URL or relative path to navigate to.
 * @param {string} props.type - The type of button to render. One of "primary", "secondary" or "small".
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @return {ReactNode} The rendered button or Link component.
 */
function Button({ disabled = false, children, to, type, onClick = null }) {
  const base =
    'inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:text-stone-500 disabled:bg-stone-300 md:text-base';

  const styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-3',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    round: base + ' h-8 w-8 md:h-10 md:w-10',
    secondary:
      'inline-block text-sm rounded-full border-2 border-stone-300 px-4 py-2.5 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300  hover:text-stone-800 focus:bg-stone-300  focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-300 md:px-6 md:py-2.5 md:text-base',
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} onClick={onClick} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
