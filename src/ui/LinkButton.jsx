import { Link, useNavigate } from "react-router-dom";

/**
 * Renders a button or a react-router Link that acts as a link to another page.
 *
 * @param {object} props - The properties passed to the component.
 * @param {ReactNode} props.children - The content of the button.
 * @param {string} props.to - The URL or relative path to navigate to.
 * @return {ReactNode} The rendered button or Link component.
 */
function LinkButton({ children, to }) {
  const navigate = useNavigate();

  const className =
    "text-sm text-blue-500 transition-all duration-300 hover:text-blue-600 hover:underline md:text-base";

  // If `to` is "-1", render a button that navigates back one page.
  if (to === "-1")
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  // If `to` is a relative path, render a Link component.
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
