import { useRouteError } from "react-router-dom";
const Error = () => {
    const err = useRouteError();
    return (
        <div className="error">
      <h1>Aaaah! Something Went Wrong</h1>
      <h3>Brace yourself till we get  the error fixed</h3>
      <h2>{err.status}:{err.statusText}</h2>
      </div>
    )
}
export default Error;