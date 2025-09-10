function Contact() {
  return (
    <>
      <div className="container mt-5 pt-5 d-flex justify-content-center">
        <div className="card shadow-lg border-0 mt-5 rounded-4 p-4 text-center" style={{ maxWidth: "500px" }}>
          <div className="card-body">
            <h2 className="text-primary mb-4 fw-bold">📞 Contact Us</h2>

            <div className="mb-4">
              <h5 className="text-secondary">Phone</h5>
              <p className="fs-5 fw-semibold">0325-1412225</p>
            </div>

            <hr />

            <div className="mb-4">
              <h5 className="text-secondary">Email</h5>
              <p className="fs-5 fw-semibold">alihamza141250@gmail.com</p>
            </div>

            
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
