
import Loader from "../loader";
import GridWrapper from "../wrapper/gridWrapper";
export default  function Bio() {


  return (
    <GridWrapper>
      <div
        style={{
          gridColumn: `2/7`,
          gridRow: `1/span 3`,
        }}
        className={` grid-card flex  `}
      >
       
        <div
          className={` flex justify-center items-center   text-noto text-base tracking-wide  `}
        >
            Hi,I am mony nethala
        </div>
     
      </div>
    </GridWrapper>
  );
}
