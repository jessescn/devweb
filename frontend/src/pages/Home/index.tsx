import "./styles.css";
import Canvas from "../../components/Canvas";
import Logo from "../../assets/logo.png";
import { useEffect } from "react";
import { store, useSelector, actions } from "../../store";

const Home = () => {
  const images = useSelector((state) => state.images.images);

  useEffect(() => {
    store.dispatch(actions.images.loadAll());
  }, []);

  return (
    <div className="page-wrapper">
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
