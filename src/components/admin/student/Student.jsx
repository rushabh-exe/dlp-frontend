import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentAttendance from "./StudentAttendance";
import Timetable from "./Timetable";

function Student() {
  const [Year, setYear] = useState(null);
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleButtonClick = (selectedYear) => {
    setYear(selectedYear);
    navigate(`/admin/student/${selectedYear}`);
  };

  const handleNavLinkClick = ({ link, component }) => {
    // Update URL with both year and component
    navigate(`/admin/student/${Year}/${link}`);
    setSelectedComponent(component);
  };

  return (
    <div className="flex">
      {!Year && (
        <div className="flex flex-col h-96 w-40 justify-start items-start">
          <button
            className="bg-white w-full h-fit shadow-md p-2 text-lg hover:bg-red-400"
            onClick={() => handleButtonClick("sy")}
          >
            Extc 2nd Year
          </button>
          <button
            className="bg-white w-full h-fit shadow-md p-2 text-lg hover:bg-red-400"
            onClick={() => handleButtonClick("ty")}
          >
            Extc 3rd Year
          </button>
          <button
            className="bg-white w-full h-fit shadow-md p-2 text-lg hover:bg-red-400"
            onClick={() => handleButtonClick("ly")}
          >
            Extc 4th Year
          </button>
        </div>
      )}
      {Year && (
        <div className="w-full flex gap-5">
          <div className="flex flex-col gap-2 w-52">
            <button
              className="bg-red-700 text-white p-2 w-full"
              onClick={() => setYear(null)}
            >
              Back
            </button>
            <div className="bg-white flex w-full flex-col">
              <button
                className="hover:border-2 border-2 border-white hover:border-gray-400 p-1"
                onClick={() =>
                  handleNavLinkClick({
                    link: "Attendance",
                    component: "StudentAttendance",
                  })
                }
              >
                Attendance
              </button>
              <button
                className="hover:border-2 border-2 border-white hover:border-gray-400 p-1"
                onClick={() =>
                  handleNavLinkClick({
                    link: "Timetable",
                    component: "Timetable",
                  })
                }
              >
                Timetable
              </button>
              
            </div>
          </div>
          <div className="component-render">
            {selectedComponent === "StudentAttendance" && (
              <StudentAttendance year={Year} />
            )}
            {selectedComponent === "Timetable" && <Timetable year={Year} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default Student;
