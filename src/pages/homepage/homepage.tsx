import { PostCard } from "../../libs/components/postCard/postCard";
import { PostForm } from "../../libs/components/postForm/postForm";
import { testPost } from "../../libs/constants/constants";
import { Section } from "../../libs/content/section/section";

const Homepage = () => {
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
        <PostForm />
      </Section>
      <Section posts>{cardedPosts}</Section>
    </Section>
  );
};

export default Homepage;
