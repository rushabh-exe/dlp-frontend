import React from "react";

function PrintButton({ contentId }) {
  const printTable = () => {
    const printContent = document.getElementById(contentId).innerHTML;
    const fullContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    const style = document.createElement("style");
    style.type = "text/css";
    style.media = "print";
    style.appendChild(
      document.createTextNode(`
            .${contentId}, .${contentId} * {
                visibility: visible;
            }
            .transcripts{
                display: flex;
                margin-bottom: 10px;
            }
            .pntbtn {
                display: none;
            }
        `)
    );
    document.head.appendChild(style);
    window.print();
    location.reload();
    document.head.removeChild(style);
    document.body.innerHTML = fullContent;
  };

  return (
    <button className="pntbtn bg-red-800 text-white w-fit p-2" onClick={printTable}>
      Print Sheet
    </button>
  );
}

export default PrintButton;
