import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

interface CardProps {
  title: string;
  description: string;
  coverImage: string;
}

interface CardTitleProps {
  title: string;
}

interface CardCoverImageProps {
  coverImage: string;
}

interface CardDescriptionProps {
  description: string;
}

const Card = ({ title, description, coverImage }: CardProps) => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("Must be used within a ThemeProvider");
  }

  const { isDark } = themeContext;

  const maxSentences = 2;
  const truncatedDescription = description
    ? `${description.split(".").slice(0, maxSentences).join(".")}...`
    : "No description";

  return (
    <>
      <div
        className={`card list-card ${
          isDark ? "bg-black text-light" : "bg-light text-dark"
        }`}
      >
        <CardCoverImage coverImage={coverImage} />
        <div className="card-body">
          <CardTitle title={title} />
          <CardDescription description={truncatedDescription} />
        </div>
      </div>
    </>
  );
};

const CardTitle = ({ title }: CardTitleProps) => {
  return <h4 className="card-title">{title}</h4>;
};

const CardCoverImage = ({ coverImage }: CardCoverImageProps) => {
  return <img src={coverImage} className="card-img-top" />;
};

const CardDescription = ({ description }: CardDescriptionProps) => {
  return (
    <p
      className="card-text"
      dangerouslySetInnerHTML={{ __html: description }}
    ></p>
  );
};

export default Card;
