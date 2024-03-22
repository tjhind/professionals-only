import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

type errors = {
  firstName: string;
  lastName: string;
  job: string;
  industry: string;
  DOB: string;
  email: string;
  city: string;
  interests: string;
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

  const [errors, setErrors] = useState<errors>({
    firstName: "",
    lastName: "",
    job: "",
    industry: "",
    DOB: "",
    email: "",
    city: "",
    interests: "You must select at least one",
  });

  // const errorMessages = {
  //   firstName: "First name is required",
  //   lastName: "Last name is required",
  // };
  const today = new Date();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
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
    console.log(userInfo["interests"]);
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

  // {
  //   !userInfo["firstName"]
  //     ? setErrors((curr) => {
  //         return {
  //           ...curr,
  //           ["firstName"]: "First name is required",
  //         };
  //       })
  //     : setErrors((curr) => {
  //         return { ...curr, ["firstName"]: "" };
  //       });
  // }}

  // const handleSubmit = (e: React.FormEvent<SubmitEvent>) => {
  //   e.preventDefault();
  //   validateForm();
  // };

  const industries = [
    { value: "Technology", label: "Technology" },
    { value: "Finance", label: "Finance" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Hospitality", label: "Hospitality" },
    {
      value: "Other",
      label: "Other: type to select",
      isDisabled: true,
    },
  ];

  return (
    <>
      <section className="flex flex-row justify-center align-center h-fit">
        <div>
          <section className="flex justify-left ml-4">
            <h3 className="font-header text-l md:text-xl mt-2 pt-2 px-6 py-2 bg-blue-200 rounded-t-xl text-slate-700">
              Create your profile
            </h3>
          </section>
          <section className="w-[400px] h-[480px] md:h-[500px] md:w-[600px] lg:w-[700px] rounded-md mt-0 p-4 bg-neutral-100">
            <div className="flex justify-left">
              <h4 className=" w-[350px] h-[10px] pl-3 font-body text-xs font-light text-slate-400">
                *Indicates required fields
              </h4>
            </div>
            <div className="flex justify-between px-14 md:px-40 lg:px-52 pt-4 pb-2">
              <input
                name="firstName"
                className="w-[120px] font-body text-sm md:text-md rounded-md font-light p-2"
                placeholder="first name*"
                onChange={handleChange}
                onBlur={(e) => {
                  !userInfo["firstName"]
                    ? setErrors((curr) => {
                        return {
                          ...curr,
                          ["firstName"]: "First name is required",
                        };
                      })
                    : setErrors((curr) => {
                        return { ...curr, ["firstName"]: "" };
                      });
                }}
              ></input>
              <input
                name="lastName"
                className="w-[120px] font-body text-sm md:text-md rounded-md font-light p-2"
                placeholder="last name*"
                onChange={handleChange}
                onBlur={(e) => {
                  !userInfo["lastName"]
                    ? setErrors((curr) => {
                        return {
                          ...curr,
                          ["lastName"]: "Last name is required",
                        };
                      })
                    : setErrors((curr) => {
                        return { ...curr, ["lastName"]: "" };
                      });
                }}
              ></input>
            </div>
            <div className="flex justify-between">
              <h4 className=" w-[300px] h-[10px] font-body text-xs font-light">
                {errors.firstName}
              </h4>
              <h4 className=" w-[300px] h-[10px] font-body text-xs font-light">
                {errors.lastName}
              </h4>
            </div>
            <div className="flex justify-between px-10 md:px-32 lg:px-40 pt-4 pb-2">
              <input
                name="job"
                className="w-[200px] md:w-[210px] font-body text-sm md:text-md rounded-md font-light p-2"
                placeholder="job title*"
                onChange={handleChange}
                onBlur={(e) => {
                  !userInfo["job"]
                    ? setErrors((curr) => {
                        return {
                          ...curr,
                          ["job"]: "Job title is required",
                        };
                      })
                    : setErrors((curr) => {
                        return { ...curr, ["job"]: "" };
                      });
                }}
              ></input>
              <CreatableSelect
                name="industry"
                className="font-body text-xs md:text-sm font-light text-slate-700 rounded-md w-[500px]"
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
            <div className="flex justify-between">
              <h4 className=" w-[300px] h-[10px] font-body text-xs font-light">
                {errors.job}
              </h4>
            </div>

            <div className="flex justify-center py-3">
              <input
                name="email"
                className="w-[160px] font-body text-sm md:text-md rounded-md font-light p-2"
                placeholder="email*"
                onChange={handleChange}
                onBlur={(e) => {
                  !userInfo["email"]
                    ? setErrors((curr) => {
                        return {
                          ...curr,
                          ["email"]: "Email is required",
                        };
                      })
                    : setErrors((curr) => {
                        return { ...curr, ["email"]: "" };
                      });
                }}
              ></input>
            </div>
            <div className="flex justify-center">
              <h4 className=" w-[300px] h-[10px] font-body text-xs font-light">
                {errors.email}
              </h4>
            </div>
            <div className="flex justify-center py-3">
              <input
                name="city"
                className="w-[120px] font-body text-sm md:text-md rounded-md font-light p-2"
                placeholder="city*"
                onChange={handleChange}
                onBlur={(e) => {
                  !userInfo["city"]
                    ? setErrors((curr) => {
                        return {
                          ...curr,
                          ["city"]: "City is required",
                        };
                      })
                    : setErrors((curr) => {
                        return { ...curr, ["city"]: "" };
                      });
                }}
              ></input>
            </div>
            <div className="flex justify-center">
              <h4 className=" w-[300px] h-[10px] font-body text-xs font-light">
                {errors.city}
              </h4>
            </div>
            <div className="flex justify-center py-3 font-body text-sm md:text-md font-light p-3">
              <DatePicker
                className="p-2 rounded-md"
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
                  !userInfo["DOB"]
                    ? setErrors((curr) => {
                        return {
                          ...curr,
                          ["DOB"]: "Birthday is required",
                        };
                      })
                    : setErrors((curr) => {
                        return { ...curr, ["DOB"]: "" };
                      });
                }}
              />
              <div className="flex justify-center items-center">
                <input
                  type="checkbox"
                  className="ml-3"
                  checked={userInfo["showAge"]}
                  onChange={() =>
                    setUserInfo((curr) => {
                      return { ...curr, ["showAge"]: !userInfo["showAge"] };
                    })
                  }
                ></input>
                <h4 className="w-[200px] h-[20px] font-body text-xs md:text-md font-light ml-3">
                  show age on profile
                </h4>
              </div>
            </div>
            <div className="flex justify-center">
              <h4 className=" w-[350px] h-[10px] font-body text-xs font-light">
                {errors.DOB}
              </h4>
            </div>

            <div className="flex justify-center align-center h-fit">
              <div className="flex justify-between flex-wrap w-[400px] h-[90px] md:w-[600px] md:h-[80px] lg:w-[900px] rounded-xl mt-8 md:mt-6 lg:mt-5 mb-1 p-4 text-sm md:text-lg font-body bg-neutral-300">
                <h4 className="text-sm">
                  Interested in*...
                  <h4 className="text-xs">
                    {!userInfo["interests"].length ? errors.interests : null}
                  </h4>
                </h4>

                <button
                  className="px-3"
                  name="Networking"
                  onClick={handleClick}
                >
                  Networking
                </button>
                <button className="px-3" name="Hiring" onClick={handleClick}>
                  Hiring
                </button>
                <button className="px-3" name="Jobs" onClick={handleClick}>
                  Jobs
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>

      <div className="flex justify-center align-center mt-5 md:mt-5">
        <Link to="ProfileCard">
          <button className="bg-neutral-400 w-fit rounded-xl mb-6">
            <h3 className="font-header text-m md:text-l py-2 px-6">Submit</h3>
          </button>
        </Link>
      </div>
    </>
  );
}
