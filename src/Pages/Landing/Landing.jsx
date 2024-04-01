import React, { useState, useEffect } from "react";
import { Image, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import "./landing.css";
const Landing = () => {
  const [data, setData] = useState([]);

  return (
    <>
      <main className="fixed inset-0 w-[100dvw] h-[100dvh]">
        <div id="banner" className="w-full h-full flex flex-col gap-16 ">
          <div className="h-2/4 flex flex-col justify-between p-2">
            <div data-aos="fade-up" className="flex justify-end">
              <Button variant="none">
                <Link
                  to={"home"}
                  className="flex items-center gap-4 text-white "
                >
                  <p className="custom-font-ubuntu font-bold tracking-wider">
                    Get Started
                  </p>
                  <ArrowRightOutlined />
                </Link>
              </Button>
            </div>
            <div data-aos="fade-in" className=" text-white ">
              <p className="text-[3rem] custom-font-ubuntu">
                Welcome To GAMEVERSE
              </p>
              <p className="custom-font-ubuntu text-lg font-thin p-1">
                your free games for PC and WEB.{" "}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-16 w-full p-4">
            <div data-aos="zoom-out" className="relative rounded-lg">
              <Image
                src="https://www.freetogame.com/g/521/thumbnail.jpg"
                removeWrapper
                radius="none"
                className="w-full rounded-[inherit]"
                alt=""
              />
              <div className="absolute top-0 w-full h-full bg-purple-600 bg-opacity-15 z-10 rounded-[inherit]"></div>
            </div>
            <div data-aos="zoom-out" className="relative rounded-lg">
              <Image
                src="https://www.freetogame.com/g/540/thumbnail.jpg"
                removeWrapper
                radius="none"
                className="w-full rounded-[inherit]"
                alt=""
              />
              <div className="absolute top-0 w-full h-full bg-purple-600 bg-opacity-25 z-10 rounded-[inherit]"></div>
            </div>
            <div data-aos="zoom-out" className="relative rounded-lg">
              <Image
                src="https://www.freetogame.com/g/508/thumbnail.jpg"
                removeWrapper
                radius="none"
                className="w-full rounded-[inherit]"
                alt=""
              />
              <div className="absolute top-0 w-full h-full bg-purple-600 bg-opacity-25 z-10 rounded-[inherit]"></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Landing;
