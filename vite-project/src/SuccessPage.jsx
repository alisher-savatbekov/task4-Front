import { useLocation } from "react-router-dom";

function SuccessPage() {
  const location = useLocation();
  const token = location.state?.token; 

  return (
    <div>
      <h6 className="text-center">
        {token ? `Hello ${token.name}` : "No logged"}
      </h6>
    </div>
  );
}

export default SuccessPage;
