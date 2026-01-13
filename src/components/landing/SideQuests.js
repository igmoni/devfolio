import RadarStats from "./RadarStats";
import ProgressStats from "./ProgressStats";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

const SideQuests = () => {
  return (
    <Container
      className="
        rounded-xl pt-20
      "
    >
      <SectionHeading heading={"Side Quests"} subHeading={"Featured"} />

      <div className="grid grid-cols-1 gap-10 items-center py-10 md:grid-cols-2">
        <RadarStats />
        <ProgressStats />
      </div>
    </Container>
  );
};

export default SideQuests;
