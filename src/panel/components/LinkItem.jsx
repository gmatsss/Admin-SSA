// LinkItem.js
const LinkItem = ({ link, title, description }) => {
  return (
    <div className="link-item">
      <a href={link} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
      <p>{description}</p>
    </div>
  );
};

export default LinkItem;
