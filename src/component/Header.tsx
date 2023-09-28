import React from "react";

const Header = (): React.ReactElement => {
  return (
    <header>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <div className="-m-1.5 p-1.5">Address with amount</div>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 ">
            Upload File
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
