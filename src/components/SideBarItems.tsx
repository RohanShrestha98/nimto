export default function SideBarItems({
  item,
  handleActive,
  active,
  hideSidebar,
}) {
  return (
    <div
      key={item?.id}
      onClick={() => handleActive(item)}
      className={`${
        active === item?.link ||
        active === item?.subLink ||
        active === item?.subSubLink
          ? "  bg-primary text-white"
          : "  hover:bg-primary hover:text-white"
      }  text-sm font-medium flex items-center  gap-2 my-1 cursor-pointer mx-1 rounded-[8px] py-1 pt-2`}
    >
      <div className="text-lg flex flex-col w-full items-center justify-center">
        <div className="mb-[-3px]">{item?.icon}</div>
        <p className="line-clamp-1 text-[10px] mb-[-3px]">{item?.name}</p>
      </div>
      {/* <div className="mb-[-3px]">{item?.icon}</div> */}
      {/* {!hideSidebar && <div className="line-clamp-1">{item?.name}</div>} */}
    </div>
  );
}
