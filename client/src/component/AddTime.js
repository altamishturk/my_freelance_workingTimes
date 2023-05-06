import React, { useState } from "react";
import { DOMAIN_NAME } from "../constant";
import axios from "axios";

function AddTime({ setTimes, setIsAddingTime }) {
  const [timeData, setTimeData] = useState({
    file: "",
    startTime: "",
    endTime: "",
    description: "",
    type: "raw",
  });
  const [file, setFile] = useState(null);
  const [type, setType] = useState("raw");

  const handleChange = (e) => {
    if (e.target.name === "file") {
      loadFile(e);
    }

    setTimeData((prev) => {

      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  function loadFile(event) {
    let reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setFile(reader.result);
      }
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  const handleSubmit = async () => {

    const myForm = new FormData();

    myForm.set("startTime", new Date(timeData.startTime).getTime());
    myForm.set("endTime", new Date(timeData.endTime).getTime());
    myForm.set("description", timeData.description);
    myForm.set("image", file);

    if(type === "raw"){
        const description = timeData.description.split(" (")[1].replace(")","");
        const rawDateTime = timeData.description.split(" (")[0];
        const startTime = rawDateTime.split(" ")[0];
        const startTimeAm = rawDateTime.split(" ")[1];
        const endTime = rawDateTime.split(" ")[2];
        const endTimeAm = rawDateTime.split(" ")[3];
        const temp = rawDateTime.split(" ")[4];
        const day = Number(temp.split(":")[0]);
        const month = Number(temp.split(":")[1]);
        const year = Number(temp.split(":")[2]);
        const startTimeHoursTemp = startTime.split(":")[0];
        const startTimeHours = startTimeAm === "pm"? Number(startTimeHoursTemp)+12:Number(startTimeHoursTemp);
        const startTimeMinutes = Number(startTime.split(":")[1]);
        const endTimeHoursTemp = endTime.split(":")[0];
        const endTimeHours = endTimeAm === "pm"? Number(endTimeHoursTemp)+12:Number(endTimeHoursTemp);
        const endTimeMinutes = Number(endTime.split(":")[1]);

        if(isNaN(year) || isNaN(month) || isNaN(startTimeHours) || isNaN(startTimeMinutes) || isNaN(endTimeHours) || isNaN(endTimeMinutes)){
          alert("Incorrect Formet");
          return;
        }

        const startDate = new Date(year+2000, month-1, day, startTimeHours, startTimeMinutes);
        const endDate = new Date(year+2000, month-1, day, endTimeHours, endTimeMinutes);

        myForm.set("startTime", startDate.getTime());
        myForm.set("endTime", endDate.getTime());
        myForm.set("description", description);
        // return;
    }

    const token = localStorage.getItem("token");

    let options = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `${DOMAIN_NAME}/api/v1/time`,
      myForm,
      options
    );

    if (data.success) {
      setTimes((prev) => {
        if (!prev) {
          return [data.time];
        }
        return [...prev, data.time].sort((a,b) => b.startTime - a.startTime);
      });
      setIsAddingTime(false);
    } 
    else {
      alert("something went wrong");
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                i
              </div>
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Create Time</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">Type</label>
                  <div className="flex">
                    <div onClick={()=>setType("raw")} className={`${type === "raw"? "bg-blue-700":"bg-blue-700/50"} cursor-pointer text-white font-bold flex items-center justify-center w-[50%] py-2`}>
                        Raw
                    </div>
                    <div onClick={()=>setType("formated")} className={`${type === "formated"? "bg-blue-700":"bg-blue-700/50"} cursor-pointer text-white font-bold flex items-center justify-center w-[50%] py-2`}>
                          Formated
                    </div>
                  </div>
                </div>
                {
                    type === "formated" && <>
                    
                <div className="flex flex-col">
                  <label className="leading-loose">Event Subtitle</label>
                  <input
                    value={timeData.file}
                    onChange={handleChange}
                    type="file"
                    name="file"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Optional"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <label className="leading-loose">Start</label>
                    <div className="relative focus-within:text-gray-600 text-gray-400">
                      <input
                        value={timeData.startTime}
                        onChange={handleChange}
                        type="datetime-local"
                        name="startTime"
                        className="px-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="25/02/2020"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">End</label>
                    <div className="relative focus-within:text-gray-600 text-gray-400">
                      <input
                        value={timeData.endTime}
                        onChange={handleChange}
                        type="datetime-local"
                        name="endTime"
                        className="px-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="26/02/2020"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Description</label>
                  <input
                    value={timeData.description}
                    onChange={handleChange}
                    type="text"
                    name="description"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Optional"
                  />
                </div>

                    </>
                }
                {
                    type === "raw" &&  <>
                    
                        <div className="flex flex-col">
                        <label className="leading-loose">Raw Text</label>
                        <input
                            value={timeData.description}
                            onChange={handleChange}
                            type="text"
                            name="description"
                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                            placeholder="typing..."
                        />
                        </div>
                    </>
                }
                
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <button
                  onClick={() => setIsAddingTime(false)}
                  className="flex bg-red-700 justify-center items-center w-full text-white  px-4 py-3 rounded-md focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTime;
