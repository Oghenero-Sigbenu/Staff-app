import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="bg-bg-[#f9f9f9] text-center">
                  
      <h1 className="text-[2rem] text-primary">Oops! You seem to be lost.</h1>
                  <p>Here are some helpful links:</p>
                  <Link to="/">Go Back</Link>
                         
    </div>
  );
}
