import { Link } from "next-view-transitions";
import SectionHeading from "../common/SectionHeading";
import { Button } from "../ui/button";
import Container from "../common/Container";
import ProjectList from "../projects/ProjectList";
import { getAllProjects } from "@/lib/projects";

const Projects = () => {
  const projects = getAllProjects()

  return (
    <Container className={"mt-20 px-5"}>
      <SectionHeading subHeading={"Featured"} heading={"Projects"} />

      <ProjectList className="mt-8" projects={projects.slice(0, 4)} />
      <div className="mt-8 flex justify-center">
        <Button variant={"outline"}>
          <Link href={"/projects"}>Show all projects</Link>
        </Button>
      </div>
    </Container>
  );
};

export default Projects;
