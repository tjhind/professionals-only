import { useState } from "react";
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
    DOB: null,
    showAge: false,
    interests: [],
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
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

  const handleSubmit = (e: React.FormEvent<SubmitEvent>) => {
    e.preventDefault();
  };

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
            <div className="flex justify-between px-14 md:px-40 lg:px-52 pt-4 pb-2">
              <input
                name="firstName"
                className="w-[120px] font-body text-sm md:text-md rounded-md font-light p-2"
                placeholder="first name"
                onChange={handleChange}
              ></input>
              <input
                name="lastName"
                className="w-[120px] font-body text-sm md:text-md rounded-md font-light p-2"
                placeholder="last name"
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex justify-between">
              <h4 className=" w-[300px] h-[10px] font-body text-xs font-light">
                First name is required
              </h4>
              <h4 className=" w-[300px] h-[10px] font-body text-xs font-light">
                Last name is required
              </h4>
            </div>
            <div className="flex justify-between px-10 md:px-32 lg:px-40 pt-4 pb-2">
              <input
                name="job"
                className="w-[200px] md:w-[210px] font-body text-sm md:text-md rounded-md font-light p-2"
                placeholder="job title"
                onChange={handleChange}
              ></input>
              <CreatableSelect
                name="industry"
                className="font-body text-sm md:text-sm font-light text-slate-700 rounded-md w-[500px]"
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
                Job title is required
              </h4>
              <h4 className=" w-[300px] h-[10px] font-body text-xs font-light">
                Industry is required
              </h4>
            </div>

            <div className="flex justify-center py-3">
              <input
                name="email"
                className="w-[160px] font-body text-sm md:text-md rounded-md font-light p-2"
                placeholder="email"
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex justify-center">
              <h4 className=" w-[300px] h-[10px] font-body text-xs font-light">
                Email is required
              </h4>
            </div>
            <div className="flex justify-center py-3">
              <input
                name="city"
                className="w-[120px] font-body text-sm md:text-md rounded-md font-light p-2"
                placeholder="city"
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex justify-center">
              <h4 className=" w-[300px] h-[10px] font-body text-xs font-light">
                City is required
              </h4>
            </div>
            <div className="flex justify-center py-3 font-body text-sm md:text-md font-light p-3">
              <DatePicker
                className="p-2 rounded-md"
                selected={userInfo["DOB"]}
                placeholderText="birthday (dd/mm/yyy)"
                onChange={(date) =>
                  setUserInfo((curr) => {
                    return { ...curr, ["DOB"]: date };
                  })
                }
                dateFormat={"dd/MM/yyyy"}
                maxDate={new Date()}
                scrollableYearDropdown
                showYearDropdown
                showMonthDropdown
                isClearable
                yearDropdownItemNumber={80}
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
                Sorry, you have to be at least 18 to use ProfessionalsOnly.
              </h4>
            </div>
            <div className="flex justify-center align-center h-fit">
              <div className="flex justify-between flex-wrap w-[400px] h-[90px] md:w-[600px] md:h-[80px] lg:w-[900px] rounded-xl mt-8 md:mt-6 lg:mt-5 mb-1 p-4 text-sm md:text-lg font-body bg-neutral-300">
                <h4 className="text-sm">Interested in...</h4>
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
