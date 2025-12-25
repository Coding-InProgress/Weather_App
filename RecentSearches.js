export default function RecentSearches({ list, setCity }) {
  if (!list.length) return null;

  return (
    <div className="recent-box">
      <h4>Recent Searches:</h4>
      <div className="recent-list">
        {list.map((item, index) => (
          <button key={index} onClick={() => setCity(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
