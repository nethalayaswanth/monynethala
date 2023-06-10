import Bars from "../bars";
import Landing from "../landing";
import Stack from "../stacks";
import GridWrapper from "../wrapper/gridWrapper";
const fillers = { mobile: 1, tablet: 9, desktop: 15 };

const Images = () => {


  return (
    <div className="flex flex-grow flex-shrink flex-col ">
     { /* @ts-expect-error Async Server Component */}
      <Landing />
      <GridWrapper fillers={fillers}>
        <div
          style={{
            gridColumn: `2/7`,
            gridRow: `1/span 3`,
          }}
          className={` grid-card flex justify-stretch  text-noto text-base tracking-wide    line`}
        >
          <Bars />
        </div>
      </GridWrapper>
    </div>
  );
};

export default Images;
