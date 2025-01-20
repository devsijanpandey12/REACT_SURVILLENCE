import React, { useState } from "react";
import "../Survillence.css"; // Add CSS for styling
import { Range } from "react-range";

const Surveillance = () => {
  const [timeRange, setTimeRange] = useState([2, 15]);
  const [confirmedRange, setConfirmedRange] = useState(null);

  const STEP = 1;
  const TIME_MIN = 0;
  const TIME_MAX = 23;

  const people = [
    { id: 1, name: "John Doe", time: 3 },
    { id: 2, name: "Jane Smith", time: 8 },
    { id: 3, name: "Alice Johnson", time: 14 },
    { id: 4, name: "Bob Brown", time: 20 },
  ];

  const filteredPeople = confirmedRange
    ? people.filter(
        (person) =>
          person.time >= confirmedRange[0] && person.time <= confirmedRange[1]
      )
    : [];

  const formatTime = (hour) => {
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour} ${period}`;
  };

  const handleConfirm = () => {
    setConfirmedRange(timeRange);
  };

  return (
    <div className="surveillance-container">
      {/* Left Section - People List */}
      <div className="people-list-container">
        <h2 className="section-title">Surveillance</h2>
        <div className="people-list">
          {confirmedRange ? (
            <>
              <h3 className="sub-title">
                People detected between {formatTime(confirmedRange[0])} - {formatTime(confirmedRange[1])}
              </h3>
              {filteredPeople.length > 0 ? (
                filteredPeople.map((person) => (
                  <div key={person.id} className="person-card">
                    <p>
                      {person.name} - Detected at {formatTime(person.time)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="no-data">No people detected within this range.</p>
              )}
            </>
          ) : (
            <p className="no-data">
              Select a time range and click confirm to view detected people.
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
              Selected Range: {formatTime(timeRange[0])} to {formatTime(timeRange[1])}
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
                        left: `${((timeRange[0] - TIME_MIN) / (TIME_MAX - TIME_MIN)) * 100}%`,
                        right: `${100 - ((timeRange[1] - TIME_MIN) / (TIME_MAX - TIME_MIN)) * 100}%`,
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
            <button onClick={handleConfirm} className="confirm-button">
              Confirm Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Surveillance;

