import React from "react";

function Navbar(props) {
  return (
    <>
      <div className="modal fade" id="aboutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">About</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" style={{ fontWeight: 600}}>
            <p>The app is built for the take-home assignment by <a href="https://www.fylehq.com/">fyle</a>. The data in the app may be old hence please do not use it for actual reference.</p>
                  <p>Important learnings:</p>
                  <ol>
                    <li>🔢 Pagination: Extremely large pagination values are generated when the page size is reduced significantly (an inversely proportional relationship. Therefore, to mitigate that I came up with an intuitive jump-to numerical input box that does the job and gives a fluid experience. Of course, to make it more intuitive, I added a previous and next button.</li>
                      <li>💾 Database migrations: Until now although I&apos;ve been building applications with three-tier architecture, most of the time the database was on the same server hence didn&apos;t require any extra parameters for the host resolution also, I built an ETL route to move the data from the CSV to the database. (Commented out the route but it is still there in the backend).</li>
                      <li>🍥 Design: Although there was a fun requirement to build a separate view for the bank details, I felt that would be overkill since the information to be displayed was limited. Hence I used the card-like structure to make it look not only better but also reduced an extra effort to get the bank information.</li>
                      <li>🔖 Storing and marking favourite banks: Used the localstorage API for the first time which I think solved a lot of problem for in document storage.</li>
                  </ol>
                  <p>I hope you liked the application.</p>
                  <p>Regards,</p>
                  <p><a href="https://www.unkitkr.xyz">Ankit Kumar</a></p>
            </div>
          </div>
        </div>
    </div>
    <div className="modal fade" id="techModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Technology Stack</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" style={{ fontWeight: 600}}>
            <p>🛠️ The technology stack used:</p>
              <ol>
                  <li>Flask (Backend business logic): Although I was familiar with Django, however in the interest of time, I choose to do the assignment in flask since I&apos;ve used this multiple times.</li>
                  <li>React (Frontend): React and Vue were the only frontend frameworks known to me. Also since I&apos;ve completed a couple of projects using react during my internship, I preferred React. However I explored Angular too but due to the time constraint, I went with what I already knew.</li>
                  <li>Database: PostgreSQL (I&apos;ve used Postgres as my primary database most of the time.</li>
                  <li>Design: For the design principles I used Material design specifications by google (which I use every time by default).</li>
              </ol>
            </div>
          </div>
        </div>
    </div>
    <nav className="navbar container navbar-expand-lg">
      <a className="navbar-brand" href="#">
        <b className = "logo-col">fyle</b><span className = "logo-bank">Bank</span>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#" data-toggle="modal" data-target="#aboutModal">
              About <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" data-toggle="modal" data-target="#techModal">
              Technology
            </a>
          </li>
        </ul>
      </div>
    </nav>
    </>
  );
}

export default Navbar;
