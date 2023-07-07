import { categoryIcons } from "../Icons";

export function PreviewCard({ primaryColor, secondaryColor, category }) {
  return (
    <div className="preview-card">
      <div className="card-header" style={{ backgroundColor: secondaryColor }}>
        Preview
      </div>
      <div className="card-body">
        <h3 className="card-title">Event Name</h3>
        <p className="card-text">Location</p>
        <p className="card-text">Date</p>

        {category && (
          <>
            <img
              src={categoryIcons[category][primaryColor]}
              alt="Category Icon"
            />
            <p>{category}</p>
          </>
        )}
      </div>
    </div>
  );
}
