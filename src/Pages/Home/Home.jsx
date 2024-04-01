import React, { useState, useEffect } from "react";
import "./home.css";
import Gp2 from "../../assets/bgless.jpg";
import axios from "axios";
import {
  Image,
  Card,
  CardFooter,
  Spinner,
  Skeleton,
  Link,
  LinkIcon,
  Chip,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { Layout, Menu, ConfigProvider, Empty } from "antd";
import Logo from "../../assets/Untitled.png";
import {
  LinkOutlined,
  WindowsOutlined,
  LinuxOutlined,
  InteractionOutlined,
  HarmonyOSOutlined,
  HeartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import EventEmitter from "EventEmitter";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Home = () => {
  const [data, setData] = useState([]);
  const [grouped, setGrouped] = useState([]);
  const [grouped2, setGrouped2] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [genre, setGenre] = useState("All");
  const [selected, setSelected] = useState("");


  const emitter = new EventEmitter();
  const items = [
    getItem("Platform", "sub1", <HarmonyOSOutlined />, [
      getItem("Windows", "PC (Windows)", <WindowsOutlined />),
      getItem("Linux", "both", <LinuxOutlined />),
      getItem("Web", "Web Browser", <InteractionOutlined />),
    ]),
    // getItem('Wishlist', 'sub2', <HeartOutlined className="text-red-600 " color="red"/>),
  ];

  const filter_by_name = (game_name) => {
    setLoaded(false);
    const match_games = [];
    if (game_name === "") {
      return grouped2;
    }
    grouped2.map((g) => {
      const match = g.games.filter((game) =>
        game.title.toLowerCase().includes(game_name.toLowerCase())
      );
      if (match.length > 0) {
        const get_ref = match_games.filter((g) => g.category === match.genre);
        if (get_ref.length > 0) {
          get_ref[0].games.push(match);
        } else {
          match_games.push({
            category: g.category,
            games: [...match],
          });
        }
      }
    });
    if (match_games.length < 1) {
      setGrouped([
        {
          category: "404",
          message: "No game found",
        },
      ]);
      setLoaded(true);
    } else {
      setGrouped(match_games);
      clearTimeout();
      setTimeout(() => {
        setLoaded(true);
      }, 2000);
    }
  };

  const filter_by_platform = (name) => {
    setLoaded(false);
    const match_games = [];
    if (name === "both") {
      return grouped2;
    }
    grouped2.map((g) => {
      const match = g.games.filter((game) => game.platform.includes(name));
      if (match.length > 0) {
        const get_ref = match_games.filter((g) => g.category === match.genre);
        if (get_ref.length > 0) {
          get_ref[0].games.push(match);
        } else {
          match_games.push({
            category: g.category,
            games: [...match],
          });
        }
      }
    });
    if (match_games.length < 1) {
      setGrouped([
        {
          category: "404",
          message: "No game found",
        },
      ]);
      setLoaded(true);
    } else {
      setGrouped(match_games);
      clearTimeout();
      setTimeout(() => {
        setLoaded(true);
      }, 2000);
    }
  };

  const filter_by_genre = (genre) => {
    setLoaded(false);
    let match_games;
    if (genre === "All") {
      setGrouped(grouped2);
      clearTimeout();
      setTimeout(() => {
        setLoaded(true);
      }, 2000);
    }else{
      match_games = grouped2.filter((g) => g.category === genre);
      if (match_games.length < 1) {
        setGrouped([
          {
            category: "404",
            message: "No game found",
          },
        ]);
        setLoaded(true);
      } else {
        setGrouped(match_games);
        clearTimeout();
        setTimeout(() => {
          setLoaded(true);
        }, 2000);
      }
    }
    }
  

  const debounceSearch = _.debounce(filter_by_name, 300);
  const debounceSearch_Platform = _.debounce(filter_by_platform, 200);
  const debounceSearch_Genre = _.debounce(filter_by_genre, 300);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
      headers: {
        "X-RapidAPI-Key": "ca79c90e39msh0c7416ecb391792p1db789jsn0814d1f72215",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      }

      
    };

   

    const games = [];
    axios
      .request(options)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        response.data.map((game) => {
          const get_ref = games.filter((g) => g.category === game.genre);
          if (get_ref.length === 0) {
            games.push({
              category: game.genre,
              games: [game],
            });
          } else {
            get_ref[0].games.push(game);
          }
        });
        setGrouped(games);
        setGrouped2(games);

        setTimeout(() => {
          setLoaded(true);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
    emitter.on("done", (e) => console.log("done"));
    return () => {
      
      console.log("hello");
    };
  }, []);
  
  document.title = 'GAMEVERSE | Home Free Games for PC and WE'
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              headerColor: "#ba13ed",
              triggerColor: "#ba13ed",
            },
            Menu: {
              itemHoverColor: "#ba13ed",
              itemSelectedColor: "#ba13ed",
              itemColor: "white",
              popupBg: "black",
            },
          },
        }}
      >
        <Layout
          style={{
            height: "100dvh",
            overflowY: "hidden",
            width: "100dvw",
            background:
              "-webkit-linear-gradient(rgb(170, 128, 241),rgb(106, 154, 216))",
          }}
        >
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <Link href={"/"} className="demo-logo-vertical w-full p-2">
              <Image className="onject-corver " src={Logo} alt="logo" />
            </Link>
            <Menu
              theme="dark"
              defaultSelectedKeys={["1"]}
              onSelect={(e) => {
                debounceSearch_Platform(e.key);
              }}
              mode="inline"
              items={items}
            />
          </Sider>

          <Layout className="">
            <Header
              style={{
                padding: 0,
              }}
              className="w-full flex app-bg"
            >
              <div className="demo-logo" />
              <Menu
                className="bg-transparent custom-font-ubuntu"
                mode="horizontal"
                onSelect={(e) => {
                  debounceSearch_Platform(e.key);
                }}
                defaultSelectedKeys={["2"]}
                items={items}
                style={{
                  flex: 1,
                  minWidth: 0,
                }}
              />

              <div className="h-full flex items-center w-2/4 pr-2">
                <Autocomplete
                  onSelectionChange={(e) => {
                    debounceSearch(e || "");
                  }}
                  onInputChange={(e) => {
                    debounceSearch(e || "");
                  }}
                  defaultInputValue={selected}
                  showScrollIndicators
                  classNames={{
                    popoverContent: "rounded-sm ",
                    listbox: "text-gray-600",
                    selectorButton: "text-[#ba13ed] font-bold text-lg",
                  }}
                  endContent={<SearchOutlined />}
                  radius="none"
                  variant="none"
                  fullWidth
                  placeholder="search for games"
                  className="bg-white"
                >
                  {data.length < 1
                    ? ""
                    : data.map((item) => {
                        return (
                          <AutocompleteItem
                            startContent={
                              <img className="w-[60px]" src={item.thumbnail} />
                            }
                            key={item.title}
                            className=""
                          >
                            <p className="text-gray-600 custom-font-ubuntu">
                              {item.title}
                            </p>
                          </AutocompleteItem>
                        );
                      })}
                </Autocomplete>
              </div>
            </Header>

            <Content
              style={
                {
                  // overflow:'hidden',
                }
              }
              className="pb-[82px]"
            >
              <div className="w-full flex flex-wrap gap-2 p-2 z-20 ">
                <Chip
                  color={genre === "All" ? "success" : "default"}
                  variant={genre === "All" ? "dot" : "bordered"}
                  radius="sm"
                  className="border cursor-pointer transition duration-75"
                  onClick={async (e) =>{
                    setGenre('All');
                    filter_by_genre('All')
                  }}
                >
                  <p className="font-extralight tracking-wider custom-font-ubuntu">
                    All
                  </p>
                </Chip>
                {grouped2.length < 1
                  ? ""
                  : grouped2.map((g) => {
                      return (
                        <Chip
                          onClick={async (e) =>{
                            setGenre(g.category);
                            filter_by_genre(g.category)
                          }}
                          color={g.category === genre ? "success" : "default"}
                          endContent={
                            <p className="text-purple-500 custom-font-ubuntu">
                              {g.games.length}
                            </p>
                          }
                          variant={g.category === genre ? "dot" : "bordered"}
                          radius="sm"
                          className="border cursor-pointer transition duration-75"
                        >
                          <p className="font-extralight tracking-wider custom-font-ubuntu">
                            {g.category}
                          </p>
                        </Chip>
                      );
                    })}
              </div>

              <div
                style={{
                  padding: 24,
                  overflowY: "auto",
                }}
                className="h-full pb-[80px]"
              >
                <div
                  className={
                    grouped.length > 0
                      ? "w-full h-full flex flex-col   gap-20"
                      : "w-full h-full flex flex-col justify-center items-center "
                  }
                >
                  {grouped.length < 1 ? (
                    <div className="w-full  flex justify-center ">
                      <Spinner />
                    </div>
                  ) : grouped[0].category === "404" ? (
                    <Empty description="No game found"/>
                  ) : (
                    grouped.map((g) => {
                      return (
                        <div
                          data-aos="fade-up"
                          data-aos-offset="300"
                          data-aos-easing="ease-in-sine"
                          key={g.category}
                          className="w-full flex flex-col gap-4 "
                        >
                          <Skeleton
                            isLoaded={loaded}
                            className={loaded === false ? "rounded-lg" : ""}
                          >
                            <div className="w-full bg-[#ba13ed] text-white rounded-sm">
                              <p className="custom-font-ubuntu text-xl font-bold p-2">
                                {g.category} Games
                              </p>
                            </div>
                          </Skeleton>
                          <div className="w-full grid grid-cols-3 gap-8">
                            {g.games.map((game) => {
                              return (
                                <Card
                                  key={game.id}
                                  radius="sm"
                                  className="pb-0"
                                >
                                  <div className="relative">
                                    <Skeleton isLoaded={loaded}>
                                      <Image
                                        removeWrapper
                                        className="w-full min-h-[182px] max-h-full"
                                        radius="none"
                                        src={game.thumbnail}
                                      />
                                    </Skeleton>
                                    <div className="absolute  bg-black z-10 text-white bg-opacity-50 p-2 w-full h-full top-0 left-0">
                                      <div className="w-full text-large flex flex-col justify-between h-full text-transparent transition duration-75 font-bold hover:text-white">
                                        <Skeleton
                                          isLoaded={loaded}
                                          className={
                                            loaded === false
                                              ? "w-2/4 rounded-full h-[20px] bg-gray-500 custom-font-ubuntu "
                                              : "custom-font-ubuntu"
                                          }
                                        >
                                          <p className="custom-font-ubuntu">
                                            {game.title}
                                          </p>
                                        </Skeleton>
                                        <Link
                                          href={game.freetogame_profile_url}
                                          target="_blank"
                                          className="w-full flex text-lg justify-end text-gray-200 font-bold custom-font-ubuntu"
                                        >
                                          <LinkIcon />
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                  <CardFooter>
                                    <div className="w-full">
                                      <div className="flex flex-col gap-2 w-full">
                                        <Skeleton
                                          isLoaded={loaded}
                                          className={
                                            loaded === false
                                              ? "rounded-full line-clamp-2 h-[20px]"
                                              : ""
                                          }
                                        >
                                          <p className="line-clamp-2 text-gray-500 text-xs tracking-wider custom-font-ubuntu text-pretty font-serif">
                                            {game.short_description}
                                          </p>
                                        </Skeleton>
                                        <div className="flex w-full justify-between custom-font-ubuntu text-gray-500 text-pretty font-serif">
                                          <Skeleton
                                            isLoaded={loaded}
                                            className={
                                              loaded === false
                                                ? "rounded-full"
                                                : ""
                                            }
                                          >
                                            <p className="custom-font-ubuntu">
                                              Platform:
                                            </p>
                                          </Skeleton>
                                          <Skeleton
                                            className={
                                              loaded === false
                                                ? "rounded-full"
                                                : ""
                                            }
                                            isLoaded={loaded}
                                          >
                                            {" "}
                                            <p className="custom-font-ubuntu text-gray-600 font-bold">
                                              {game.platform}
                                            </p>
                                          </Skeleton>
                                        </div>
                                        <div className="w-full">
                                          <Link
                                            href={game.game_url}
                                            target="_blank"
                                            className="w-full flex text-lg justify-end  text-[#ba13ed] hover:text-blue-500 font-bold "
                                          >
                                            <Skeleton
                                              isLoaded={loaded}
                                              className={
                                                loaded === false
                                                  ? "rounded-full"
                                                  : ""
                                              }
                                            >
                                              <p className="text-shadow custom-font-ubuntu">
                                                {game.platform ===
                                                "PC (Windows)"
                                                  ? "Donwload Now"
                                                  : "Play Now"}
                                              </p>
                                            </Skeleton>
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </CardFooter>
                                </Card>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </Content>

            <Footer
              style={{
                textAlign: "center",
              }}
            >
              GAMEVERSE ©{new Date().getFullYear()} by Solomon Williams
            </Footer>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
};

export default Home;
