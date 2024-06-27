import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { MyImage } from "../../type";

const ImageGallery = () => {
  const [images, setImages] = useState<MyImage[]>([]);
  const [qText, setQText] = useState<string>("");
  const [qTextMain, setQTextMain] = useState<string>("");
  const [pageState, setPageState] = useState(1);

  const onChangeQText = (e: ChangeEvent<HTMLInputElement>) => {
    setQText(e.target.value);
  };

  const getGimages = async () => {
    const apiData = await axios.get("https://pixabay.com/api/", {
      params: {
        key: "44613279-24281651bbe46b1036c3c5fcd",
        page: pageState,
        q: qTextMain,
      },
    });

    console.dir(apiData);
    setImages(apiData.data.hits);
  };

  useEffect(() => {
    getGimages();
  }, [qTextMain, pageState]);

  const submitButtonFrom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQTextMain(qText);
  };

  const nextPage = () => {
    setPageState(pageState + 1);
  };

  return (
    <>
      <header className="Searchbar">
        <form onSubmit={submitButtonFrom} className="SearchForm">
          <button type="submit" className="Button">
            <span className="Button-label">Search</span>
          </button>
          <input
            className="Input"
            type="text"
            placeholder="Search images and photos"
            value={qText}
            onChange={onChangeQText}
          />
        </form>
      </header>
      <ul className="ImagesUl">
        {images.map((element) => {
          return (
            <li key={element.id}>
              <img src={element.imageURL} width={200} height={200} />
            </li>
          );
        })}
      </ul>
      <button onClick={nextPage}>Next</button>
    </>
  );
};

export default ImageGallery;
