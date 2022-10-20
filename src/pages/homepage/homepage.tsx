import { PostCard } from "../../libs/components/postCard/postCard";
import { PostForm } from "../../libs/components/postForm/postForm";
import { testPost } from "../../libs/constants/constants";
import { Section } from "../../libs/content/section/section";
import { homepageProps } from "./homepage.types";

const Homepage = ({ alerts }: homepageProps) => {
  const posts = testPost;

  const cardedPosts = posts.map((post) => (
    <PostCard
      key={post.id}
      id={post.id}
      message={post.message}
      likes={post.likes}
      date={post.date}
    />
  ));

  return (
    <Section space>
      <Section>
        <PostForm alerts={alerts} />
      </Section>
      <Section posts>{cardedPosts}</Section>
    </Section>
  );
};

export default Homepage;
