import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentAttendance from "./StudentAttendance";
import Timetable from "./Timetable";
import GetTimeTable from "./sAllocation/GetTimeTable";

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
    <div>
      {!Year && (
        <div className="flex h-96 w-full justify-center gap-8 items-center">
          <button
            className="bg-white w-fit h-fit rounded-2xl shadow-md p-16 text-4xl hover:bg-red-400"
            onClick={() => handleButtonClick("sy")}
          >
            sy
          </button>
          <button
            className="bg-white w-fit h-fit rounded-2xl shadow-md p-16 text-4xl hover:bg-red-400"
            onClick={() => handleButtonClick("ty")}
          >
            ty
          </button>
          <button
            className="bg-white w-fit h-fit rounded-2xl shadow-md p-16 text-4xl hover:bg-red-400"
            onClick={() => handleButtonClick("ly")}
          >
            ly
          </button>
        </div>
      )}
      {Year && (
        <>
          <div className="w-full flex flex-col gap-5">
            <button
              className="bg-red-700 text-white p-2 mr-3 w-fit"
              onClick={() => setYear(null)}
            >
              Back
            </button>
            <div className="bg-white flex flex-wrap w-fit">
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
              <button
                className="hover:border-2 border-2 border-white hover:border-gray-400 p-1"
                onClick={() =>
                  handleNavLinkClick({
                    link: "GetTimeTable",
                    component: "GetTimeTable",
                  })
                }
              >
                GETimetable
              </button>
            </div>
            <div className="component-render">
              {selectedComponent === "StudentAttendance" && (
                <StudentAttendance year={Year} />
              )}
              {selectedComponent === "Timetable" && <Timetable year={Year} />}
              {selectedComponent === "GetTimeTable" && <GetTimeTable year={Year} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Student;
