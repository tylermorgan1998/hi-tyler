function Group1() {
  return (
    <div className="absolute contents left-[14px] top-0">
      <div className="absolute bg-[peachpuff] left-[14px] size-[71px] top-0" />
      <div className="absolute bg-black left-[30px] size-[14px] top-[35px]" />
      <div className="absolute bg-black left-[56px] size-[14px] top-[35px]" />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[14px] top-[167px]">
      <div className="absolute bg-black h-[60px] left-[25px] top-[167px] w-[50px]" />
      <div className="absolute bg-black h-[12px] left-[14px] top-[227px] w-[72px]" />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 top-[71px]">
      <div className="absolute bg-white h-[73px] left-0 top-[71px] w-[100px]" />
      <div className="absolute bg-white h-[23px] left-[25px] top-[144px] w-[50px]" />
    </div>
  );
}

export default function Group3() {
  return (
    <div className="relative size-full">
      <Group1 />
      <Group2 />
      <Group />
    </div>
  );
}