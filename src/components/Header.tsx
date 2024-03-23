export default function Header() {
  return (
    <>
      <section className="flex justify-left pt-3 ml-2 md:pt-2 pb-4 bg-white cursor-pointer">
        <img
          className="h-9 w-8 mr-2 pb-1 mt-2 md:h-10 md:w-10 md:mt-5"
          src={"https://cdn-icons-png.flaticon.com/128/639/639394.png"}
          alt="briefcase icon"
        ></img>
        <h1 className="font-header font-extralight text-2xl mt-2 md:text-3xl md:mt-6 cursor-pointer">
          ProfessionalsOnly
        </h1>
      </section>
    </>
  );
}
