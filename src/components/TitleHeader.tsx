export default function TitleHeader({ title, subTitle }) {
  return (
    <div>
      <h1 className="text-titleText  mb-1 font-extrabold text-[32px] leading-10 tracking-[-0.012em]">
        {title}
      </h1>
      <p className="text-subTitleText font-normal text-sm leading-5 tracking-normal">
        {subTitle}
      </p>
    </div>
  );
}
