export default function ProfileForm() {
  return (
    <>
      <section className="flex flex-row justify-center align-center h-fit">
        <div>
          <section className="flex justify-left ml-4">
            <h3 className="font-header text-l md:text-xl mt-2 pt-2 px-6 py-2 bg-blue-200 rounded-t-xl text-slate-700">
              Create your profile
            </h3>
          </section>
          <section className="w-[400px] h-[480px] md:h-[500px] md:w-[600px] lg:w-[700px] rounded-xl mt-0 p-4 bg-neutral-100">
            <div className="flex justify-between px-28 md:px-48 lg:px-60 pt-4 pb-2">
              <h4 className="font-body text-sm md:text-lg font-light">
                first name
              </h4>
              <h4 className="font-body text-sm md:text-lg font-light">
                last name
              </h4>
            </div>
            <div className="flex justify-center">
              <h4 className="font-body text-xs md:text-md font-light">
                Show last name on profile
              </h4>
            </div>
            <div className="flex justify-center py-4">
              <h4 className="font-body text-sm md:text-lg font-light">
                Job Title
              </h4>
            </div>
            <div className="flex justify-center py-4">
              <h4 className="font-body text-sm md:text-lg font-light">
                Industry
              </h4>
            </div>
            <div className="flex justify-center py-4">
              <h4 className="font-body text-sm md:text-lg font-light">Email</h4>
            </div>
            <div className="flex justify-center py-4">
              <h4 className="font-body text-sm md:text-lg font-light">City</h4>
            </div>
            <div className="flex justify-center py-4">
              <h4 className="font-body text-sm md:text-lg font-light">
                Date of Birth
              </h4>
            </div>
            <section className="flex justify-center align-center h-fit">
              <div className="flex justify-between flex-wrap w-[400px] h-[90px] md:w-[600px] md:h-[80px] lg:w-[900px] rounded-xl mt-8 md:mt-6 lg:mt-5 mb-1 p-4 text-sm md:text-lg font-body bg-neutral-300">
                <h4 className="text-sm">Interested in...</h4>
                <h4 className="px-3">Networking</h4>
                <h4 className="px-3">Hiring</h4>
                <h4 className="px-3">Jobs</h4>
              </div>
            </section>
          </section>
        </div>
      </section>

      <section className="flex justify-center align-center mt-5 md:mt-5">
        <section className="bg-neutral-400 w-fit rounded-xl mb-6">
          <h3 className="font-header text-m md:text-l py-2 px-6">Submit</h3>
        </section>
      </section>
    </>
  );
}
