//to pass prop to app.jsx for sending to employer/talents link

export default function UserCategory() {
  return (
    <>
      <div className="cat-container">
        <h1 className="cat-title"> Are you an employer or talent?</h1>

        <button className="cat-button">
          <h4>I am an employer. </h4>
          <img
            src="employer.png"
            style={{
              width: "65%",
              height: "auto",
            }}
          />
        </button>

        <br />
        <br />
        <button className="cat-button">
          <h4>I am a talent. </h4>
          <img
            src="talent.png"
            style={{
              width: "65%",
              height: "auto",
            }}
          />
        </button>
        <p className="cat-tnc">
          Your selection is final and cannot be altered after this stage. Thank
          you.
        </p>
      </div>
    </>
  );
}
