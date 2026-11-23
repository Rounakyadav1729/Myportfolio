import CrudPage from "./CrudPage";

const SKILL_CATEGORIES = [
  "Programming Languages",
  "Web Development",
  "Backend Development",
  "Database",
  "Tools & Technologies",
  "Networking & Linux",
  "Embedded Systems",
];

export function SkillsPage() {
  return (
    <CrudPage
      title="Skills"
      endpoint="/skills"
      empty={{ name: "", category: SKILL_CATEGORIES[0], proficiency: 70, icon: "Code2", order: 0 }}
      fields={[
        { key: "name", label: "Name" },
        { key: "category", label: "Category", type: "select", options: SKILL_CATEGORIES },
        { key: "proficiency", label: "Proficiency", type: "number" },
        { key: "icon", label: "Lucide icon name" },
        { key: "order", label: "Order", type: "number" },
      ]}
    />
  );
}

export function ProjectsPage() {
  return (
    <CrudPage
      title="Projects"
      endpoint="/projects"
      empty={{
        title: "",
        description: "",
        details: "",
        image: "",
        technologies: [],
        githubUrl: "",
        liveUrl: "",
        featured: false,
        order: 0,
      }}
      fields={[
        { key: "title", label: "Title" },
        { key: "description", label: "Short description", type: "textarea" },
        { key: "details", label: "Details", type: "textarea" },
        { key: "image", label: "Thumbnail", type: "file", accept: "image/*" },
        { key: "technologies", label: "Technologies (comma separated)", type: "list" },
        { key: "githubUrl", label: "GitHub URL" },
        { key: "liveUrl", label: "Live demo URL" },
        { key: "featured", label: "Featured", type: "checkbox" },
        { key: "order", label: "Order", type: "number" },
      ]}
    />
  );
}

export function EducationPage() {
  return (
    <CrudPage
      title="Education"
      endpoint="/education"
      empty={{ institution: "", degree: "", field: "", startYear: "", endYear: "", description: "", order: 0 }}
      fields={[
        { key: "institution", label: "Institution" },
        { key: "degree", label: "Degree" },
        { key: "field", label: "Field" },
        { key: "startYear", label: "Start year" },
        { key: "endYear", label: "End year" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "order", label: "Order", type: "number" },
      ]}
    />
  );
}

export function ExperiencePage() {
  return (
    <CrudPage
      title="Experience"
      endpoint="/experience"
      empty={{
        role: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        type: "Internship",
        order: 0,
      }}
      fields={[
        { key: "role", label: "Role" },
        { key: "company", label: "Company" },
        { key: "location", label: "Location" },
        { key: "startDate", label: "Start date" },
        { key: "endDate", label: "End date" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "type", label: "Type", type: "select", options: ["Internship", "Full-time", "Freelance", "Other"] },
        { key: "order", label: "Order", type: "number" },
      ]}
    />
  );
}

export function CertificationsPage() {
  return (
    <CrudPage
      title="Certifications"
      endpoint="/certifications"
      empty={{ title: "", issuer: "", year: "", credentialUrl: "", type: "Certification", order: 0 }}
      fields={[
        { key: "title", label: "Title" },
        { key: "issuer", label: "Issuer" },
        { key: "year", label: "Year" },
        { key: "credentialUrl", label: "Credential URL" },
        { key: "type", label: "Type", type: "select", options: ["Certification", "Achievement"] },
        { key: "order", label: "Order", type: "number" },
      ]}
    />
  );
}
