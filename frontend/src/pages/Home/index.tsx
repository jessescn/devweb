import Canvas from "../../components/Canvas";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";
import { listAllImages, RemoteImage } from "../../services/image-service";

const Home = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<RemoteImage[]>([]);

  useEffect(() => {
    listAllImages().then((data) => {
      console.log(data);
      setImages(data);
    });
  }, []);

  return (
    <div className="page-wrapper">
      <button className="navigate-btn" onClick={() => navigate("login")}>
        Login
      </button>
      <div className="title">
        <h1 className="main-title">
          Paint 1.5
          <img src={Logo} alt="logo" />
        </h1>
        <p>Draw from your browser</p>
      </div>
      <Canvas />
      <div>
        <h3 style={{ marginBottom: "0.3rem" }}>Imagens salvas</h3>
        {images.map((elm) => (
          <img
            key={elm.$loki}
            width="200px"
            style={{ margin: "20px", border: "1px solid #000" }}
            height="100px"
            src={elm.image}
            alt="ima"
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
