// Right Side of DIV through which we will add Testcases.

import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import RefreshToken from "@/utils/RefreshToken";

export default function Tform() {
  const formik = useFormik({
    initialValues: {
      expectedOutput: "",
      input: "",
      number: 0,
      hidden: true,
      time: 0,
      memory: 0,
      explanation: "",
      question: "",
    },

    onSubmit: async (values) => {
      await RefreshToken();
      try {
        const access_token = localStorage.getItem("access_token");
        const qid = localStorage.getItem("question_id");
        values.question = qid;
        console.log("Test:", test);
        console.log("Values:", values);
        axios
          .post(
            "https://api-cookoff-prod.codechefvit.com/testcases/create",
            values,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          )
          .then((response) => {
            console.log("Testcase Posted");
            // router.push("/choice");
          });
      } catch {
        (error) => {
          console.log("Question Post failed: " + error.response.data);
        };
      }
    },
  });

  const [test, setTest] = useState([""]);
  const handleClick = () => {
    const temp = [...test, []];
    setTest(temp);
  };

  const entryDict = {eo: "", in: "", num: 0, hid:true, tim:0, mem:0, exp:""}
  
  const handleChange = (onChangeValue, i) => {
    formik.handleChange;
    entryDict[i] = onChangeValue.target.value;
    setTest(entryDict);
  };

  const handleDelete = (i) => {
    const deleteVal = [...test];
    deleteVal.splice(i, 1);
    setTest(deleteVal);
  };

  return (
    <>
      <div className="flex bg-[#1F1F1F] w-[47vw] h-auto py-[10px] px-[25px] items-center justify-between content-center text-[22px] text-white mt-[30px] mb-0 ">
        <div className="">Add Testcase</div>
        {/* Add Button */}
        <button
          className="text-[30px] pr-[25px]"
          onClick={() => handleClick()}
          type="button"
        >
          <AiFillPlusSquare />
        </button>
      </div>
      <div className="p-[25px] overflow-y-auto overflow-x-hidden h-[70vh] bg-[#161616]">
        <div className="">
          <div>

            <form onSubmit={formik.handleSubmit}>
              {test.map((data, i) => {
                return (
                  <div key={i}>
                    <div className="flex bg-[#1F1F1F] w-full px-5 h-auto py-[10px] items-center content-center text-[22px] text-white mt-[30px] mb-0 justify-between">
                      <div className=" ">Test Case {i + 1}</div>
                      <button onClick={() => handleDelete(i)} type="button">
                        <div className="text-white text-[25px]">
                          <AiFillDelete />
                        </div>
                      </button>
                    </div>
                    <div key={i} className="bg-[#0d0d0d] p-5">
                      {/* Expected Output */}
                      <div>
                        <div className="text-[#FFFFFF] text-[22px]">
                          Expected Output
                        </div>
                        <input
                          className="w-[97%] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold break-words overflow-auto resize-none"
                          id="expectedOutput"
                          onChange={formik.handleChange}
                          value={formik.values.expectedOutput}
                        />
                      </div>

                      {/* Input */}
                      <div>
                        <div className="text-[#FFFFFF] text-[22px]">Input</div>
                        <textarea
                          className="w-[97%] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold break-words overflow-auto resize-none"
                          id="input"
                          onChange={formik.handleChange}
                          value={formik.values.input}
                          rows={2}
                        />
                        {formik.errors.input ? (
                          <div className="text-[#D9D9D999] mt-1 ml-2">
                            {formik.errors.input}
                          </div>
                        ) : null}
                      </div>

                      {/* Row 1 */}
                      <div>
                        <div className="flex flex-row">
                          {/* Number */}
                          <div>
                            <div className="text-[#FFFFFF] text-[22px]">
                              Number
                            </div>
                            <div className="mb-[40px]">
                              <input
                                className="w-full py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold"
                                id="number"
                                type="number"
                                onChange={formik.handleChange}
                                value={formik.values.number}
                              />
                              {formik.errors.number ? (
                                <div className="text-[#D9D9D999] mt-1 ml-2">
                                  {formik.errors.number}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          {/* Hidden */}
                          <div className="ml-[5vw]">
                            <div className="text-[#FFFFFF] text-[22px]">
                              Hidden
                            </div>
                            <div className="mb-[40px] w-[14vw]">
                              <select
                                className="w-full py-[15px] px-[20px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold"
                                id="hidden"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.text}
                              >
                                <option value={true}>True</option>
                                <option value={false}>False</option>
                              </select>
                              {formik.errors.hidden ? (
                                <div className="text-[#D9D9D999] mt-1 ml-2">
                                  {formik.errors.hidden}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Row 2 */}
                      <div>
                        <div className="flex flex-row ">
                          {/* Time */}
                          <div>
                            <div className="text-[#FFFFFF] text-[22px]">
                              Time
                            </div>
                            <div className="mb-[40px]">
                              <input
                                className="w-[47%px] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold"
                                id="time"
                                type="number"
                                onChange={formik.handleChange}
                                value={formik.values.time}
                              />
                              {formik.errors.time ? (
                                <div className="text-[#D9D9D999] mt-1 ml-2">
                                  {formik.errors.time}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          {/* Memory */}
                          <div className="mx-[10px]">
                            <div className="text-[#FFFFFF] text-[22px]">
                              Memory
                            </div>
                            <div className="mb-[40px]">
                              <input
                                className="w-[99%] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold"
                                id="memory"
                                type="number"
                                onChange={formik.handleChange}
                                value={formik.values.memory}
                              />
                              {formik.errors.memory ? (
                                <div className="text-[#D9D9D999] mt-1 ml-2">
                                  {formik.errors.memory}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Explanation */}
                      <div>
                        <div className="text-[#FFFFFF] text-[22px]">
                          Explanation
                        </div>
                        <textarea
                          className="w-[97%] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold break-words overflow-auto resize-none"
                          id="explanation"
                          onChange={formik.handleChange}
                          value={formik.values.explanation}
                          rows={4}
                        />
                        {formik.errors.explanation ? (
                          <div className="text-[#D9D9D999] mt-1 ml-2">
                            {formik.errors.explanation}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Save Changes */}
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center">
                  <button
                    className=" text-[#D9D9D9] font-semibold py-[8px] px-[26px] text-[22px] border-[2px] border-[#EB5939] bg-[#EB5939] rounded-[6px] hover:bg-[#D9D9D9] hover:text-black mt-3"
                    type="submit"
                    onClick={() => {
                      console.log("Clicked!");
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  );
}