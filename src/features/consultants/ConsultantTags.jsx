const ConsultantTags = ({ tags }) => {
    if (!tags?.length) return null;
  
    return (
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full border border-blue-200 shadow-sm hover:bg-blue-200 transition-all"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  };

  export default ConsultantTags;