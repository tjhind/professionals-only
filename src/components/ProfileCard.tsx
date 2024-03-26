import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function UserCard() {
  const location = useLocation();
  const { userInfo } = location.state;

  // format DOB to years old for display:
  const birthYear = userInfo["DOB"].getFullYear();
  let age = new Date().getFullYear() - birthYear;
  const month = new Date().getMonth() - userInfo["DOB"].getMonth();
  if (
    month < 0 ||
    (month === 0 && new Date().getDate() < userInfo["DOB"].getDate())
  ) {
    age--;
  }

  return (
    <>
      <section className="flex flex-row justify-center align-center h-fit">
        <div>
          <section className="flex justify-left ml-4">
            <Link to={"/"}>
              <h3 className="font-header text-l tab text-slate-400">
                Create your profile
              </h3>
            </Link>
            <section className="flex justify-left ml-4">
              <h3 className="font-header text-l tab">Your profile</h3>
            </section>
          </section>
          <section className="main-section">
            <div className="flex flex-row justify-center">
              <div className="inner-box cursor-pointer">
                <div className="flex justify-center font-header font-heavy text-3xl mt-16">
                  <h2 className="pr-1.5">{`${userInfo["firstName"]} `}</h2>
                  <h2>{userInfo["lastName"]} </h2>
                  {userInfo["showAge"] && (
                    <div className="flex justify-center">
                      <h2 className="mt-3 font-extralight text-sm pl-3">{`Age: ${age}`}</h2>
                    </div>
                  )}
                </div>
                <div className="flex justify-center flex-wrap font-header font-light text-xl ml-6">
                  <h2>{userInfo["job"]}</h2>
                  {userInfo["industry"] && (
                    <h2 className="pl-2">{`(${userInfo["industry"]})`}</h2>
                  )}
                </div>

                <div className="flex justify-center mt-6">
                  <h2>{`Contact: ${userInfo["email"]}`}</h2>
                </div>
                <div className="flex justify-center mt-2 font-extralight">
                  <img
                    src="https://www.svgrepo.com/show/127575/location-sign.svg"
                    alt="location pin"
                    className="h-3 md:h-4 inline-block mt-1 mr-1"
                  />
                  <h2>{userInfo["city"]}</h2>
                </div>
              </div>
            </div>
            {userInfo["interests"].length && (
              <div className="flex justify-center">
                <div className="interests-box-2">
                  <h4 className="text-xs p-3">Interested in </h4>
                  <div className="flex flex-row px-10 md:px-32">
                    {userInfo["interests"].map((interest: string) => {
                      return (
                        <div
                          key={interest}
                          className="interested flex items-center align-center border"
                        >
                          <h4 className="text-sm">{`#${interest}`}</h4>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </section>
    </>
  );
}
