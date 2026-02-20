import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import ProgressStats from "./ProgressStats";
import RadarStats from "./RadarStats";

const SideQuests = () => {
  return (
    <Container className="rounded-xl px-5 pt-20">
      <SectionHeading heading={"Side Quests"} subHeading={"Featured"} />

      <div className="grid grid-cols-1 items-center gap-10 py-10 md:grid-cols-2">
        <RadarStats />
        <ProgressStats />
      </div>
    </Container>
  );
};

export default SideQuests;
