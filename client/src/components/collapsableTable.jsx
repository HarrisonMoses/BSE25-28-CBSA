import { useState } from "react";

const CollapsibleTableRow = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <tr
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <td className="border px-4 py-3 font-medium border-amber-500 flex justify-between">
          {title}
          <span className="text-gray-500 text-right">
            {isOpen ? "▼" : "▶"} 
          </span>
        </td>
      </tr>

      {/* Collapsible Content Row */}
      {isOpen && (
        <tr className="bg-gray-50">
          <td colSpan="2" className="border border-amber-500 px-4 py-3">
            <div className="p-3">{content}</div>
          </td>
        </tr>
      )}
    </>
  );
};

export default CollapsibleTableRow;
