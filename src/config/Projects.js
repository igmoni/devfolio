import NextJs from "@/components/technologies/NextJs";
import ReactIcon from "@/components/technologies/ReactIcon";
import TailwindCss from "@/components/technologies/TailwindCss";

export const projectDetails = {
    title: 'Projects',
    desc: 'Building unique, high-performance solutions fueled by innovation and technical mastery.'
}








export const projects = [
    {
        id: 1,
        title: 'BALC',
        desc: 'A responsive website showcasing a computer institute’s programs and achievements.',
        image: '/projects/balc.jpg',
        video: '',
        link: 'https://www.balc-cadd-bengaluru.in',
        github: 'https://www.github.com/igmoni/BALC',
        details: true,
        projectsDetailsPageSlug: '/projects/balc',
        isWorking: true,
        technologies: [
            { name: 'Next.js', icon: <NextJs /> },
            { name: 'Tailwind CSS', icon: <TailwindCss /> },
            { name: 'React', icon: <ReactIcon /> }
        ]
    },
    {
        id: 2,
        title: 'E-com',
        desc: 'A responsive website showcasing a computer institute’s programs and achievements.',
        image: '/projects/balc.jpg',
        video: '',
        link: 'https://www.balc-cadd-bengaluru.in',
        github: 'https://www.github.com/igmoni/BALC',
        details: true,
        projectsDetailsPageSlug: '/projects/balc',
        isWorking: false,
        technologies: [
            { name: 'Next.js', icon: <NextJs /> },
            { name: 'Tailwind CSS', icon: <TailwindCss /> },
            { name: 'React', icon: <ReactIcon /> }
        ]
    },

]