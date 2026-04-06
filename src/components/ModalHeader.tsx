export default function ModalHeader({ title, subTitle }) {
  return (
    <div>
      <h1 className="text-titleText font-inter font-semibold text-[20px] leading-[24px] tracking-[-0.5%] ">
        {title}
      </h1>
      <p className="text-subTitleText font-normal text-sm leading-5 tracking-normal">
        {subTitle}
      </p>
    </div>
  );
}
