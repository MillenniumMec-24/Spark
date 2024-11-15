import React, { useState } from "react";
import "./EventPage.css";
import img1 from "../components/image/sdgcampaign.jpg";
import img2 from "../components/image/sdgquiz.jpg";
import img3 from "../components/image/compliment wall (1).jpg";

function EventPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleExplore = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="event-page-container">
      <h1 className="title">PAST EVENTS OF SPARK</h1>
      <div className="events-container">
        <div className="event-card">
          <img src={img1} alt="CAMPAIGN ON SDG" className="event-image" />
          <p className="event-date">6th November 2024</p>
          <h2 className="event-title">SDG Awareness Campaign</h2>
          <p className="event-description" style={{ textAlign: "left" }}>
            (SDGs) and their significance in addressing critical global
            challenges such as poverty, education, and climate change. The
            campaign fea...
          </p>
          <button
            className="explore-button"
            onClick={() =>
              handleExplore({
                date: "6th November 2024",
                title: "SDG Awareness Campaign",
                description: `(SDGs) and their significance in addressing critical global challenges such as poverty, education, and climate change.
                              The campaign featured discussions and real-life examples to help students understand the relevance of SDGs in their everyday lives.
                              This campaign inspired students to take meaningful steps toward a sustainable future, fostering collaboration and heightened awareness across the campus.`,
                image: img1,
              })
            }
          >
            Explore
          </button>
        </div>

        <div className="event-card">
          <img src={img2} alt="SDG QUIZ" className="event-image" />
          <p className="event-date">7th November 2024</p>
          <h2 className="event-title">Impact IQ Challenge</h2>
          <p className="event-description" style={{ textAlign: "left" }}>
            The "Impact IQ Challenge," an engaging on-campus SDG quiz, was a
            huge success! This event brought together students for an
            interactive...
          </p>
          <button
            className="explore-button"
            onClick={() =>
              handleExplore({
                date: "7th November 2024",
                title: "Impact IQ Challenge",
                description: `The "Impact IQ Challenge," an engaging on-campus SDG quiz, was a huge success! This event brought together students for an interactive and exciting session that deepened their understanding of the SDGs and promoted a sense of global responsibility. The quiz was not only fun but also highly informative, especially for those who were less familiar with the SDGs. It also gave us the opportunity to introduce and promote the Millennium Fellowship, inspiring more students to join the global movement toward sustainable development.`,
                image: img2,
              })
            }
          >
            Explore
          </button>
        </div>

        <div className="event-card">
          <img src={img3} alt="Wall of Kindness" className="event-image" />
          <p className="event-date">7th November 2024</p>
          <h2 className="event-title">COMPLIMENT WALL</h2>
          <p className="event-description" style={{ textAlign: "left" }}>
            Our "Wall of Kindness" was a beautiful event that brought warmth and
            positivity to our campus! This interactive compliment wall
            encoura...
          </p>
          <button
            className="explore-button"
            onClick={() =>
              handleExplore({
                date: "7th November 2024",
                title: "Wall of Kindness",
                description: `Our "Wall of Kindness" was a beautiful event that brought warmth and positivity to our campus! This interactive compliment wall encouraged students to share uplifting messages with one another, creating a ripple of kindness and support throughout the college community. It was inspiring to see so many students participate, reminding us all of the importance of compassion as we strive to make a difference together.`,
                image: img3,
              })
            }
          >
            Explore
          </button>
        </div>
      </div>

      {selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <div className="modal-body">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="modal-image"
              />
              <div className="modal-details">
                <p className="modal-date">{selectedEvent.date}</p>
                <h2 className="modal-title">{selectedEvent.title}</h2>
                <p
                  className="modal-description"
                  dangerouslySetInnerHTML={{
                    __html: selectedEvent.description,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventPage;
