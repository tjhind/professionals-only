import { useState } from "react";
import { Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { errorMsgs, industries, today } from "../utils/data";

type userInfo = {
  firstName: string;
  lastName: string;
  job: string;
  industry: string;
  email: string;
  city: string;
  DOB: Date | null;
  showAge: boolean;
  interests: string[];
};

export default function ProfileForm() {
  const [userInfo, setUserInfo] = useState<userInfo>({
    firstName: "",
    lastName: "",
    job: "",
    industry: "",
    email: "",
    city: "",
    DOB: null,
    showAge: false,
    interests: [],
  });

  const [showErrs, setShowErrs] = useState({
    firstName: false,
    lastName: false,
    job: false,
    DOB: false,
    email: false,
    city: false,
  });

  const [errors, setErrors] = useState(errorMsgs);

  const toggleError = (input: string) => {
    setShowErrs((curr) => {
      return { ...curr, [input]: true };
    });
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setShowErrs((curr) => {
      return { ...curr, [name]: "true" };
    });
    setErrors((curr) => {
      return { ...curr, [name]: "" };
    });
    setUserInfo((curr) => {
      return { ...curr, [name]: value };
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.target as HTMLButtonElement;
    userInfo["interests"].includes(name)
      ? setUserInfo(() => {
          return {
            ...userInfo,
            ["interests"]: userInfo["interests"].filter(
              (interest) => name !== interest
            ),
          };
        })
      : setUserInfo((curr) => {
          return { ...curr, ["interests"]: [...userInfo["interests"], name] };
        });
  };

  // const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  //   const { name } = e.target;
  //   !userInfo[name]
  //     ? setErrors((curr) => {
  //         return { ...curr, [name]: errorMessages[e.target.name] };
  //       })
  //     : // name === "email" ? js : name === "DOB" ? js :
  //       setErrors((curr) => {
  //         return { ...curr, [name]: "" };
  //       });
  // };

  const validateForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowErrs({
      firstName: true,
      lastName: true,
      job: true,
      DOB: true,
      email: true,
      city: true,
    });
  };

  return (
    <>
      <section className="flex flex-row justify-center align-center h-fit">
        <div>
          <section className="flex justify-left ml-4">
            <h3 className="font-header text-l tab text-slate-700">
              Create your profile
            </h3>
          </section>
          <section className="main-section">
            <div className="flex justify-left">
              <h4 className="small-text">*Indicates required fields</h4>
            </div>
            <div className="flex justify-between px-10 md:px-36 lg:px-52 pt-4 pb-2">
              <input
                name="firstName"
                className="basic-input md:text-md"
                placeholder="first name*"
                maxLength={8}
                onChange={handleChange}
                onBlur={(e) => {
                  userInfo["firstName"]
                    ? setErrors((curr) => {
                        return { ...curr, ["firstName"]: "" };
                      })
                    : setErrors((curr) => {
                        return {
                          ...curr,
                          ["firstName"]: errorMsgs["firstName"],
                        };
                      });
                  toggleError("firstName");
                }}
              ></input>
              <input
                name="lastName"
                className="basic-input md:text-md"
                placeholder="last name*"
                maxLength={8}
                onChange={handleChange}
                onBlur={(e) => {
                  userInfo["lastName"]
                    ? setErrors((curr) => {
                        return { ...curr, ["lastName"]: "" };
                      })
                    : setErrors((curr) => {
                        return { ...curr, ["lastName"]: errorMsgs["lastName"] };
                      });
                  toggleError("lastName");
                }}
              ></input>
            </div>
            <div className="flex justify-between md:px-32 lg:px-48">
              <div>
                <h4 className=" ml-3 w-[150px] h-[10px] font-body text-xs font-heavy text-red">
                  {showErrs["firstName"] ? <>{errors.firstName}</> : null}
                </h4>
              </div>
              <div>
                <h4 className=" w-[150px] h-[10px] md:pl-3 font-body text-xs font-heavy lg:pl-0">
                  {showErrs["lastName"] ? <>{errors.lastName}</> : null}
                </h4>
              </div>
            </div>
            <div className="flex justify-between px-6 md:px-28 lg:px-40 pt-4 pb-2">
              <input
                name="job"
                className="w-[130px] md:w-[170px] font-body text-sm md:text-md rounded-md font-light p-2"
                placeholder="job title*"
                maxLength={20}
                onChange={handleChange}
                onBlur={(e) => {
                  userInfo["job"]
                    ? setErrors((curr) => {
                        return {
                          ...curr,
                          ["job"]: "",
                        };
                      })
                    : setErrors((curr) => {
                        return { ...curr, ["job"]: errorMsgs["job"] };
                      });
                  toggleError("job");
                }}
              ></input>
              <CreatableSelect
                name="industry"
                className="font-body text-xs md:text-sm font-light text-slate-700 rounded-md w-[160px]"
                isClearable
                options={industries}
                placeholder="industry"
                formatCreateLabel={(str) => `"${str}"`}
                onChange={(value) => {
                  value !== null
                    ? setUserInfo((curr) => {
                        return { ...curr, ["industry"]: value.value };
                      })
                    : setUserInfo((curr) => {
                        return { ...curr, ["industry"]: "" };
                      });
                }}
              />
            </div>
            <div className="flex justify-center">
              <h4 className=" ml-2 w-[300px] h-[10px] font-body text-xs font-heavy">
                {showErrs["job"] ? <>{errors.job}</> : null}
              </h4>
            </div>

            <div className="flex justify-center py-3">
              <input
                name="email"
                className="w-[160px] font-body text-sm md:text-md rounded-md font-light p-2"
                placeholder="email*"
                maxLength={15}
                onChange={handleChange}
                onBlur={(e) => {
                  !userInfo["email"]
                    ? setErrors((curr) => {
                        return {
                          ...curr,
                          ["email"]: errorMsgs["email"],
                        };
                      })
                    : userInfo["email"].match(
                        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                      )
                    ? setErrors((curr) => {
                        return { ...curr, ["email"]: "" };
                      })
                    : setErrors((curr) => {
                        return {
                          ...curr,
                          ["email"]: "Please enter a valid email",
                        };
                      });
                  toggleError("email");
                }}
              ></input>
            </div>
            <div className="flex justify-center items-center">
              <div>
                <h4 className="ml-48 w-[300px] h-[10px] font-body text-xs font-heavy">
                  {showErrs["email"] ? <>{errors.email}</> : null}
                </h4>
              </div>
            </div>
            <div className="flex justify-center py-3">
              <input
                name="city"
                className="w-[120px] md:w-[160px] font-body text-sm md:text-md rounded-md font-light p-2"
                placeholder="city*"
                onChange={handleChange}
                maxLength={15}
                onBlur={(e) => {
                  userInfo["city"]
                    ? setErrors((curr) => {
                        return {
                          ...curr,
                          ["city"]: "",
                        };
                      })
                    : setErrors((curr) => {
                        return { ...curr, ["city"]: errorMsgs["city"] };
                      });
                  toggleError("city");
                }}
              ></input>
            </div>
            <div className="flex justify-center items-center">
              <div>
                <h4 className="ml-48 w-[300px] h-[10px] font-body text-xs font-heavy">
                  {showErrs["city"] ? <>{errors.city}</> : null}
                </h4>
              </div>
            </div>
            <div className="flex justify-center py-3 font-body text-sm md:text-md font-heavy p-3">
              <DatePicker
                className="p-2 rounded-md ml-13 md:ml-20 mr-4 md:mr-8 w-[178px]"
                selected={userInfo["DOB"]}
                placeholderText="birthday* (dd/mm/yyy)"
                onChange={(date) =>
                  setUserInfo((curr) => {
                    return { ...curr, ["DOB"]: date };
                  })
                }
                dateFormat={"dd/MM/yyyy"}
                maxDate={
                  new Date(
                    today.getFullYear() - 18,
                    today.getMonth(),
                    today.getDate()
                  )
                }
                scrollableYearDropdown
                showYearDropdown
                showMonthDropdown
                isClearable
                yearDropdownItemNumber={80}
                onCalendarClose={() => {
                  userInfo["DOB"]
                    ? setErrors((curr) => {
                        return {
                          ...curr,
                          ["DOB"]: "",
                        };
                      })
                    : setErrors((curr) => {
                        return { ...curr, ["DOB"]: errorMsgs["DOB"] };
                      });
                  toggleError("DOB");
                }}
              />

              <input
                type="checkbox"
                className="md:ml-30 cursor-pointer"
                checked={userInfo["showAge"]}
                onChange={() =>
                  setUserInfo((curr) => {
                    return { ...curr, ["showAge"]: !userInfo["showAge"] };
                  })
                }
              ></input>
              <h4
                className={`md:w-[230px] h-[20px] font-body text-xs md:text-md font-light ml-4 md:ml-2 md:mt-2.5 ${
                  userInfo["showAge"] ? null : "text-slate-500"
                }`}
              >
                show age on profile
              </h4>
            </div>
            <div className="flex justify-center">
              <h4 className=" ml-20 w-[350px] h-[10px] font-body text-xs font-heavy">
                {showErrs["DOB"] ? <>{errors.DOB}</> : null}
              </h4>
            </div>

            <div className="flex justify-center align-center h-fit">
              <div className="flex justify-between interests-box">
                <div className="mt-0">
                  <h4 className="text-xs p-3 mt-3 text-slate-700">
                    Interested in...
                  </h4>
                </div>
                <button
                  className={`px-3 h-[40px] md:h-[50px] mt-6 md:mt-3 rounded-md hover:bg-neutral-400  text-slate-700 ${
                    userInfo["interests"].includes("Networking") &&
                    "bg-neutral-200 shadow-md border-slate-500 border"
                  }`}
                  name="Networking"
                  onClick={handleClick}
                >
                  Networking
                </button>
                <button
                  className={`px-3 h-[40px] md:h-[50px] mt-6 md:mt-3 rounded-md hover:bg-neutral-400  text-slate-700 ${
                    userInfo["interests"].includes("Hiring") &&
                    "bg-neutral-200 shadow-md border-slate-500 border"
                  }`}
                  name="Hiring"
                  onClick={handleClick}
                >
                  Hiring
                </button>
                <button
                  className={`px-3 h-[40px] md:h-[50px] mt-6 md:mt-3 rounded-md hover:bg-neutral-400  text-slate-700 ${
                    userInfo["interests"].includes("Jobs") &&
                    "bg-neutral-200 shadow-md border-slate-500 border"
                  }`}
                  name="Jobs"
                  onClick={handleClick}
                >
                  Jobs
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>

      <div className="flex justify-center align-center mt-5 md:mt-5">
        {Object.values(errors).filter((item) => {
          return item === "";
        }).length === 6 ? (
          <Link to="/profile-card" state={{ userInfo }}>
            <button
              className="submit-button bg-neutral-400"
              onClick={validateForm}
            >
              <h3 className="font-header text-m md:text-l py-2 px-6">Submit</h3>
            </button>
          </Link>
        ) : (
          <button
            onClick={validateForm}
            className="submit-button bg-neutral-200"
          >
            <h3 className="font-header text-m md:text-l py-2 px-6">Submit</h3>
          </button>
        )}
      </div>
    </>
  );
}
