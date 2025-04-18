import { useNavigate } from "react-router-dom";

// Navigeer naar de homepagina bij het klikken op de knop
const GoBackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };
  return (
    <>
      <button
        onClick={goBack}
        className="mb-4 mt-22 px-4 py-2 bg-accent text-white rounded-md cursor-pointer "
      >
        Back to Home
      </button>
    </>
  );
};

export default GoBackButton;
