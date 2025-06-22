const Navigation = () => {
  return (
    <div>
      <div className="sticky top-0 bg-sky-300 text-sky-950 h-20">
        <li className=" list-none ml-20  cursor-pointer">logo</li>
        <ul className="flex flex-row items-center space-x-4 justify-self-end mr-5 cursor-pointer self-center">
          <li>Home</li>
          <li>Book</li>
          <li>My Account</li>
          <li>Library</li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
