export default function About() {
  return (
    <div className="container mt-5 mb-5 pt-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold">About Us</h1>
        <p className="text-muted">Learn more about our story and mission</p>
      </div>

      <div className="row align-items-center mb-5 ">
        <div className="col-md-6">
          <img
            src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg"
            alt="Our store"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h3 className="fw-semibold">Who We Are</h3>
          <p>
            Welcome to <strong>ShopEase</strong> – your one-stop online store for the best products at unbeatable prices. 
            Founded in 2025, we're a passionate team driven by innovation, customer service, and a love for everything e-commerce.
          </p>
        </div>
      </div>

      <div className="row align-items-center flex-md-row-reverse mb-5">
        <div className="col-md-6">
          <img
            src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620"
            alt="Our mission"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h3 className="fw-semibold">Our Mission</h3>
          <p>
            Our mission is to make online shopping simple, secure, and satisfying. 
            We strive to bring you the latest products, amazing deals, and top-notch support. 
            Whether you're a tech lover, fashion fan, or just looking for something new — we’ve got you covered.
          </p>
        </div>
      </div>

      <div className="text-center">
        <h4 className="mb-3">Got questions or feedback?</h4>
        <p>
          <a href="/contact" className="btn btn-outline-primary">
            Contact Us
          </a>
        </p>
      </div>
    </div>
  );
}
