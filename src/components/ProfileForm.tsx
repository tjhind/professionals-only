import { useState } from "react";
import { Link } from "react-router-dom";
import { errorMessages } from "../utils/data";
import IndustrySelector from "./utils/IndustrySelector";
import DateSelector from "./utils/DateSelector";

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

  // to set error messages & toggle their visibility
  const [errorMsgs, setErrorMsgs] = useState(errorMessages);
  const [showErrs, setShowErrs] = useState({
    firstName: false,
    lastName: false,
    job: false,
    DOB: false,
    email: false,
    city: false,
  });
  const showError = (inputBox: string) => {
    setShowErrs((curr) => {
      return { ...curr, [inputBox]: true };
    });
  };
  const showAllErrs = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowErrs({
      firstName: true,
      lastName: true,
      job: true,
      DOB: true,
      email: true,
      city: true,
    });
  };

  // to update error messages & userInfo object on change in input
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setShowErrs((curr) => {
      return { ...curr, [name]: "true" };
    });
    setErrorMsgs((curr) => {
      return { ...curr, [name]: "" };
    });
    setUserInfo((curr) => {
      return { ...curr, [name]: value };
    });
  };

  // to update interest details on button click
  const handleInterestClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.target as HTMLButtonElement;
    userInfo["interests"].includes(name)
      ? setUserInfo(() => {
          return {
            ...userInfo,
            ["interests"]: userInfo["interests"].filter(
              (interest) => name !== interest,
            ),
          };
        })
      : setUserInfo((curr) => {
          return { ...curr, ["interests"]: [...userInfo["interests"], name] };
        });
  };

  return (
    <>
      <section className="flex flex-row justify-center align-center h-fit">
        <div>
          <div className="flex justify-left ml-4">
            <h3 className="font-header text-l tab text-slate-700">
              Create your profile
            </h3>
          </div>
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
                    ? setErrorMsgs((curr) => {
                        return { ...curr, ["firstName"]: "" };
                      })
                    : setErrorMsgs((curr) => {
                        return {
                          ...curr,
                          ["firstName"]: errorMessages["firstName"],
                        };
                      });
                  showError("firstName");
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
                    ? setErrorMsgs((curr) => {
                        return { ...curr, ["lastName"]: "" };
                      })
                    : setErrorMsgs((curr) => {
                        return {
                          ...curr,
                          ["lastName"]: errorMessages["lastName"],
                        };
                      });
                  showError("lastName");
                }}
              ></input>
            </div>
            <div className="flex justify-between md:px-32 lg:px-48">
              <div>
                <h4 className="error-text font-heavy">
                  {showErrs["firstName"] && <>{errorMsgs.firstName}</>}
                </h4>
              </div>
              <div>
                <h4 className="error-text font-heavy md:pl-3 lg:pl-0">
                  {showErrs["lastName"] && <>{errorMsgs.lastName}</>}
                </h4>
              </div>
            </div>
            <div className="flex justify-between px-6 md:px-28 lg:px-40 pt-4 pb-2">
              <input
                name="job"
                className="job-input md:text-md"
                placeholder="job title*"
                maxLength={20}
                onChange={handleChange}
                onBlur={(e) => {
                  userInfo["job"]
                    ? setErrorMsgs((curr) => {
                        return {
                          ...curr,
                          ["job"]: "",
                        };
                      })
                    : setErrorMsgs((curr) => {
                        return { ...curr, ["job"]: errorMessages["job"] };
                      });
                  showError("job");
                }}
              ></input>
              <IndustrySelector setUserInfo={setUserInfo} />
            </div>
            <div className="flex justify-center">
              <h4 className="job-error-text font-heavy">
                {showErrs["job"] && <>{errorMsgs.job}</>}
              </h4>
            </div>

            <div className="flex justify-center py-3">
              <input
                name="email"
                className="email-input md:text-md"
                placeholder="email*"
                maxLength={15}
                onChange={handleChange}
                onBlur={(e) => {
                  !userInfo["email"]
                    ? setErrorMsgs((curr) => {
                        return {
                          ...curr,
                          ["email"]: errorMessages["email"],
                        };
                      })
                    : userInfo["email"].match(
                          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        )
                      ? setErrorMsgs((curr) => {
                          return { ...curr, ["email"]: "" };
                        })
                      : setErrorMsgs((curr) => {
                          return {
                            ...curr,
                            ["email"]: "Please enter a valid email",
                          };
                        });
                  showError("email");
                }}
              ></input>
            </div>
            <div className="flex justify-center items-center">
              <div>
                <h4 className="email-error-text font-heavy">
                  {showErrs["email"] && <>{errorMsgs.email}</>}
                </h4>
              </div>
            </div>
            <div className="flex justify-center py-3">
              <input
                name="city"
                className="basic-input md:w-[160px]"
                placeholder="city*"
                onChange={handleChange}
                maxLength={15}
                onBlur={(e) => {
                  userInfo["city"]
                    ? setErrorMsgs((curr) => {
                        return {
                          ...curr,
                          ["city"]: "",
                        };
                      })
                    : setErrorMsgs((curr) => {
                        return { ...curr, ["city"]: errorMessages["city"] };
                      });
                  showError("city");
                }}
              ></input>
            </div>
            <div className="flex justify-center items-center">
              <div>
                <h4 className="city-error-text font-heavy">
                  {showErrs["city"] && <>{errorMsgs.city}</>}
                </h4>
              </div>
            </div>
            <div className="flex justify-center py-3 f p-3">
              <DateSelector
                selected={userInfo["DOB"]}
                onChange={(date) =>
                  setUserInfo((curr) => {
                    return { ...curr, ["DOB"]: date };
                  })
                }
                onCalendarClose={() => {
                  userInfo["DOB"]
                    ? setErrorMsgs((curr) => {
                        return {
                          ...curr,
                          ["DOB"]: "",
                        };
                      })
                    : setErrorMsgs((curr) => {
                        return { ...curr, ["DOB"]: errorMessages["DOB"] };
                      });
                  showError("DOB");
                }}
              />
              <input
                type="checkbox"
                name="showAge"
                className="md:ml-30 cursor-pointer"
                checked={userInfo["showAge"]}
                onChange={() =>
                  setUserInfo((curr) => {
                    return { ...curr, ["showAge"]: !userInfo["showAge"] };
                  })
                }
              ></input>
              <h4
                className={`md:text-md show-age-txt ${
                  userInfo["showAge"] ? null : "text-slate-500"
                }`}
              >
                show age on profile
              </h4>
            </div>
            <div className="flex justify-center">
              <h4 className="date-error-text font-heavy">
                {showErrs["DOB"] && <>{errorMsgs.DOB}</>}
              </h4>
            </div>

            <div className="flex justify-center align-center h-fit">
              <div className="flex justify-between interests-box">
                <div className="mt-0">
                  <h4 className="interested-text">Interested in...</h4>
                </div>
                <button
                  className={`interest-button ${
                    userInfo["interests"].includes("Networking") &&
                    "interest-clicked"
                  }`}
                  name="Networking"
                  onClick={handleInterestClick}
                >
                  Networking
                </button>

                <button
                  className={`interest-button ${
                    userInfo["interests"].includes("Hiring") &&
                    "interest-clicked"
                  }`}
                  name="Hiring"
                  onClick={handleInterestClick}
                >
                  Hiring
                </button>
                <button
                  className={`interest-button ${
                    userInfo["interests"].includes("Jobs") && "interest-clicked"
                  }`}
                  name="Jobs"
                  onClick={handleInterestClick}
                >
                  Jobs
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>

      <div className="flex justify-center align-center mt-5 md:mt-5">
        {Object.values(errorMsgs).filter((item) => {
          return item === "";
        }).length === 6 ? (
          <Link to="/profile-card" state={{ userInfo }}>
            <button
              className="submit-button font-header text-m md:text-l"
              onClick={showAllErrs}
            >
              Submit
            </button>
          </Link>
        ) : (
          <button
            onClick={showAllErrs}
            className="submit-greyed font-header text-m md:text-l "
          >
            Submit
          </button>
        )}
      </div>
    </>
  );
}
