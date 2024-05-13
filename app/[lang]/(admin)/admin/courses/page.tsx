import Navigation from "../components/navigation/Navigation";

export default async function Courses() {
  return (
    <div className="admin-template">
      <div className="container">
        <div className="content-container">
          <Navigation />
          <div className="content">
            <h1>Courses</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
