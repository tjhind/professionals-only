import CreatableSelect from "react-select/creatable";
import { industries } from "../../utils/data";
import { SetStateAction } from "react";

type industryProps = {
  setUserInfo: React.Dispatch<
    SetStateAction<{
      firstName: string;
      lastName: string;
      job: string;
      industry: string;
      email: string;
      city: string;
      DOB: Date | null;
      showAge: boolean;
      interests: string[];
    }>
  >;
};

export default function IndustrySelector(props: industryProps) {
  return (
    <CreatableSelect
      name="industry"
      className="font-body text-xs md:text-sm font-light text-slate-700 rounded-md w-[160px]"
      isClearable
      options={industries}
      placeholder="industry"
      formatCreateLabel={(str) => `"${str}"`}
      onChange={(value) => {
        value !== null
          ? props.setUserInfo((curr) => {
              return { ...curr, ["industry"]: value.value };
            })
          : props.setUserInfo((curr) => {
              return { ...curr, ["industry"]: "" };
            });
      }}
    />
  );
}
