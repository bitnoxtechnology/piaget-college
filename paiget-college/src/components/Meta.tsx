import { Helmet } from "react-helmet";

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const Meta = ({
  title = "Piaget College",
  description = "Piaget College is a leading institution offering quality education and professional development programs. Join us to advance your career and achieve your academic goals.",
  keywords = "Piaget College, education, professional development, undergraduate programs, diploma in education, courses, admissions",
}: MetaProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default Meta;
