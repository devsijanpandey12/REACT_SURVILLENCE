// import React, { useState } from "react";
// import "../Survillence.css"; // Add CSS for styling
// import { Range } from "react-range";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const Surveillance = () => {
//   const [timeRange, setTimeRange] = useState([2, 15]);
//   const [confirmedRange, setConfirmedRange] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);

//   const STEP = 1;
//   const TIME_MIN = 0;
//   const TIME_MAX = 23;

//   const people = [
//     { id: 1, name: "John Doe", time: 3 },
//     { id: 2, name: "Jane Smith", time: 8 },
//     { id: 3, name: "Alice Johnson", time: 14 },
//     { id: 4, name: "Bob Brown", time: 20 },
//   ];

//   const filteredPeople = confirmedRange
//     ? people.filter(
//         (person) =>
//           person.time >= confirmedRange[0] && person.time <= confirmedRange[1]
//       )
//     : [];

//   const formatTime = (hour) => {
//     const period = hour >= 12 ? "PM" : "AM";
//     const formattedHour = hour % 12 || 12;
//     return `${formattedHour} ${period}`;
//   };

//   const handleConfirm = () => {
//     setConfirmedRange(timeRange);
//   };

//   return (
//     <div className="surveillance-container">
//       {/* Left Section - People List */}
//       <div className="people-list-container">
//         <h2 className="section-title">Surveillance</h2>
//         <div className="people-list">
//           {confirmedRange ? (
//             <>
//               <h3 className="sub-title">
//                 People detected between {formatTime(confirmedRange[0])} - {formatTime(confirmedRange[1])}
//                 on {selectedDate?.toLocaleDateString()}
//               </h3>
//               {filteredPeople.length > 0 ? (
//                 filteredPeople.map((person) => (
//                   <div key={person.id} className="person-card">
//                     <p>
//                       {person.name} - Detected at {formatTime(person.time)}
//                     </p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="no-data">No people detected within this range.</p>
//               )}
//             </>
//           ) : (
//             <p className="no-data">
//               Select a time range and date, then click confirm to view detected people.
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Right Section - Time Range Selector */}
//       <div className="time-range-container">
//         <div className="time-range-content">
//           <h3 className="section-title">Time Range Selection</h3>
//           <div className="slider-section">
//             <label className="slider-label">
//               Selected Range: {formatTime(timeRange[0])} to {formatTime(timeRange[1])}
//             </label>
//             <div className="slider-wrapper">
//               <Range
//                 step={STEP}
//                 min={TIME_MIN}
//                 max={TIME_MAX}
//                 values={timeRange}
//                 onChange={(values) => setTimeRange(values)}
//                 renderTrack={({ props, children }) => (
//                   <div {...props} className="slider-track">
//                     <div
//                       className="slider-highlight"
//                       style={{
//                         left: `${((timeRange[0] - TIME_MIN) / (TIME_MAX - TIME_MIN)) * 100}%`,
//                         right: `${100 - ((timeRange[1] - TIME_MIN) / (TIME_MAX - TIME_MIN)) * 100}%`,
//                       }}
//                     />
//                     {children}
//                   </div>
//                 )}
//                 renderThumb={({ props, index }) => (
//                   <div {...props} className="slider-thumb">
//                     <div className="thumb-label">
//                       {formatTime(timeRange[index])}
//                     </div>
//                   </div>
//                 )}
//               />
//             </div>
//           </div>
//           <div className="date-picker-section">
//             <h3 className="sub-title">Select Date</h3>
//             <DatePicker
//               selected={selectedDate}
//               onChange={(date) => setSelectedDate(date)}
//               dateFormat="MMMM d, yyyy"
//               className="date-picker"
//             />
//           </div>
//           <button
//             onClick={handleConfirm}
//             className="confirm-button"
//             disabled={!selectedDate}
//           >
//             Confirm Selection
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Surveillance;


















import React, { useState } from "react";
import "../Survillence.css"; // Add CSS for styling
import { Range } from "react-range";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Surveillance = () => {
  const [timeRange, setTimeRange] = useState([6, 7]);
  const [confirmedRange, setConfirmedRange] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null); // Modal image state

  const STEP = 1;
  const TIME_MIN = 0;
  const TIME_MAX = 23;

  const today = new Date();
  const todayString = today.toLocaleDateString();

  const people = [{ id: 1, name: "Sijan Pandey", time: 6 }];

  const filteredPeople =
    confirmedRange && selectedDate?.toLocaleDateString() === todayString
      ? people.filter(
          (person) =>
            person.time >= confirmedRange[0] && person.time <= confirmedRange[1]
        )
      : [];

  const formatTime = (hour) => {
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    const minutes = hour % 1 === 0.5 ? ":30" : ":00";
    return `${formattedHour}${minutes} ${period}`;
  };

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setConfirmedRange(timeRange);
      setLoading(false);
    }, 1500); // Simulates a 1.5-second loading time
  };

  const handleGalleryToggle = () => {
    setGalleryLoading(true);
    setTimeout(() => {
      setGalleryLoading(false);
      setGalleryVisible(!galleryVisible);
    }, 1500); // Simulates a 1.5-second loading time for the gallery
  };

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="surveillance-container">
      {/* Left Section - People List */}
      <div className="people-list-container">
        <h2 className="section-title">Surveillance</h2>
        <div className="people-list">
          {loading ? (
            <p className="loading-text">Loading...</p>
          ) : confirmedRange ? (
            <>
              <h3 className="sub-title">
                People detected between {formatTime(confirmedRange[0])} -{" "}
                {formatTime(confirmedRange[1])} on{" "}
                {selectedDate?.toLocaleDateString()}
              </h3>
              {filteredPeople.length > 0 ? (
                filteredPeople.map((person) => (
                  <div key={person.id} className="person-card">
                    <p>
                      {person.name} - Detected at {formatTime(person.time)}
                    </p>
                    {/* Gallery Button Next to the Card */}
                    <button
                      onClick={handleGalleryToggle}
                      className="gallery-button"
                      title="Open Gallery"
                    >
                      <img
                        src="src/assets/gallerys.jpg" // Provide your gallery logo path here
                        alt="Gallery Logo"
                        className="gallery-logo"
                      />
                    </button>
                  </div>
                ))
              ) : (
                <p className="no-data">No people detected within this range.</p>
              )}
            </>
          ) : (
            <p className="no-data">
              Select a time range and date, then click confirm to view detected
              people.
            </p>
          )}
        </div>
      </div>

      {/* Right Section - Time Range Selector */}
      <div className="time-range-container">
        <div className="time-range-content">
          <h3 className="section-title">Time Range Selection</h3>
          <div className="slider-section">
            <label className="slider-label">
              Selected Range: {formatTime(timeRange[0])} to{" "}
              {formatTime(timeRange[1])}
            </label>
            <div className="slider-wrapper">
              <Range
                step={STEP}
                min={TIME_MIN}
                max={TIME_MAX}
                values={timeRange}
                onChange={(values) => setTimeRange(values)}
                renderTrack={({ props, children }) => (
                  <div {...props} className="slider-track">
                    <div
                      className="slider-highlight"
                      style={{
                        left: `${((timeRange[0] - TIME_MIN) /
                          (TIME_MAX - TIME_MIN)) *
                          100}%`,
                        right: `${100 -
                          ((timeRange[1] - TIME_MIN) / (TIME_MAX - TIME_MIN)) *
                            100}%`,
                      }}
                    />
                    {children}
                  </div>
                )}
                renderThumb={({ props, index }) => (
                  <div {...props} className="slider-thumb">
                    <div className="thumb-label">
                      {formatTime(timeRange[index])}
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
          <div className="date-picker-section">
            <h3 className="sub-title">Select Date</h3>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
              className="date-picker"
            />
          </div>
          <button
            onClick={handleConfirm}
            className="confirm-button"
            disabled={!selectedDate}
          >
            Confirm Selection
          </button>
        </div>
      </div>

      {/* Gallery Section */}
      {galleryLoading ? (
        <p className="loading-text">Loading Gallery...</p>
      ) : (
        galleryVisible && (
          <div className="gallery-container">
            <h3 className="section-title">Gallery</h3>
            <div className="gallery-grid">
              {["src/assets/3.jpg", "src/assets/1.jpg", "src/assets/2.jpg",].map((imageSrc, index) => (
                <img
                  key={index}
                  src={imageSrc}
                  alt={`Gallery ${index + 1}`}
                  className="gallery-item"
                  onClick={() => openModal(imageSrc)} // Open modal on click
                />
              ))}
            </div>
          </div>
        )
      )}

      {/* Modal Section */}
      {modalImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <img src={modalImage} alt="Expanded View" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Surveillance;


