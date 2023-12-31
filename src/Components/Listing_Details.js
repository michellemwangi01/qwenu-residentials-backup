import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { listingsDataContext } from "./FetchAPIData";

const Listing_Details = () => {
  const { externalID } = useParams();
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [count, setCount] = useState(0);
  const [listingData, setListingData] = useState({});
  const { listingsData } = useContext(listingsDataContext);

  // console.log(listingsData);
  // console.log(externalID);
  const currentProperty = listingsData.find(
    (property) => property.externalID === externalID
  );
  console.log(currentProperty);
  useEffect(() => {
    fetch(
      `https://bayut.p.rapidapi.com/properties/detail?externalID=${externalID}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "47f6ed740fmsh71585dcfcf20c8bp1af58fjsnd4a08f796f4f",
          "X-RapidAPI-Host": "bayut.p.rapidapi.com",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setListingData(data);
        const photosArray = data.photos;
        let imgURLArray = [];
        for (const imgItem of photosArray) {
          imgURLArray.push(imgItem.url);
        }
        setImages(imgURLArray);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => (prevCount + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentImage(images[count]);
  }, [count]);

  console.log(`Images Count: ${images.length}`);

  return (
    <div className="listingDetailsContainer">
      <div className="listingDetailsHeader">
        <h1>
          Embark on Your Journey to the perfect Abode. Uncover Every Detail!
        </h1>
      </div>
      <div className="listingDetailsCard">
        <div class="card mb-3">
          {!currentImage ? (
            <div>
              <small> Loading ....</small>
            </div>
          ) : (
            <img src={currentImage} class="card-img-top"></img>
          )}
          <div class="card-body">
            <h5 class="card-title">{currentProperty.title}</h5>
            <p class="card-text">
              <small class="text-muted">{currentProperty.amenities}</small>
            </p>

            {/* <p class="card-text">{description_l2}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing_Details;
